import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { monthlydata } from './content';

interface HalfYearlyDataTableProps {
  halfYearlyData: monthlydata[];
}

export function HalfYearlyDataTable({ halfYearlyData }: HalfYearlyDataTableProps) {
  const [showChart, setShowChart] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [h1Data, setH1Data] = useState<monthlydata[]>([]);
  const [h2Data, setH2Data] = useState<monthlydata[]>([]);

  useEffect(() => {
    // Separate H1 and H2 data
    const h1 = halfYearlyData.filter(item => item.monthly === 'H1');
    const h2 = halfYearlyData.filter(item => item.monthly === 'H2');
    setH1Data(h1);
    setH2Data(h2);
  }, [halfYearlyData]);

  const toggleView = () => {
    setShowChart(!showChart);
  };

  if (!halfYearlyData || halfYearlyData.length === 0) {
    return (
      <div className="flex bg-white border rounded shadow-sm p-4 justify-center">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="flex bg-white border rounded shadow-sm p-4 justify-center">
      <div className="overflow-scroll w-full text-black">
        {showChart ? (
          <>
            <h2 className="text-lg font-bold">Half Yearly Expenditure Chart</h2>
            <div className="w-full">
              <ReactApexChart
                options={{
                  chart: {
                    width: '100%',
                    toolbar: {
                      show: false,
                    },
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: '60%',
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  xaxis: {
                    categories: h1Data.map(item => `H1 ${item.year}`).concat(h2Data.map(item => `H2 ${item.year}`)),
                  },
                }}
                series={[
                  {
                    name: 'Team A',
                    data: h1Data.map(item => item.team_a).concat(h2Data.map(item => item.team_a)),
                  },
                  {
                    name: 'Team B',
                    data: h1Data.map(item => item.team_b).concat(h2Data.map(item => item.team_b)),
                  },
                  {
                    name: 'Team C',
                    data: h1Data.map(item => item.team_c).concat(h2Data.map(item => item.team_c)),
                  },
                ]}
                type="bar"
                height={500}
              />
            </div>
            <div className="mt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Table
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold">Half Yearly Expenditure Table</h2>
            <table className="w-full table-auto mt-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">Frequency</th>
                  <th className="px-4 py-2">Year</th>
                  <th className="px-4 py-2">Monthly</th>
                  <th className="px-4 py-2">Team A</th>
                  <th className="px-4 py-2">Team B</th>
                  <th className="px-4 py-2">Team C</th>
                </tr>
              </thead>
              <tbody>
                {halfYearlyData.map(({ frequency, year, monthly, team_a, team_b, team_c }, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{frequency}</td>
                    <td className="px-4 py-2">{year}</td>
                    <td className="px-4 py-2">{monthly}</td>
                    <td className="px-4 py-2">{team_a}</td>
                    <td className="px-4 py-2">{team_b}</td>
                    <td className="px-4 py-2">{team_c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b">
              <h3 className="text-lg text-black font-semibold">Half Yearly Expenditure Table</h3>
            </div>
            <div className="overflow-auto text-black flex-grow p-4">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Frequency</th>
                    <th className="px-4 py-2">Year</th>
                    <th className="px-4 py-2">Monthly</th>
                    <th className="px-4 py-2">Team A</th>
                    <th className="px-4 py-2">Team B</th>
                    <th className="px-4 py-2">Team C</th>
                  </tr>
                </thead>
                <tbody>
                  {halfYearlyData.map(({ frequency, year, monthly, team_a, team_b, team_c }, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{frequency}</td>
                      <td className="px-4 py-2">{year}</td>
                      <td className="px-4 py-2">{monthly}</td>
                      <td className="px-4 py-2">{team_a}</td>
                      <td className="px-4 py-2">{team_b}</td>
                      <td className="px-4 py-2">{team_c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Function to calculate total expenditure for a specific team across all months
function calculateTotalExpenditure(data: monthlydata[], team: 'team_a' | 'team_b' | 'team_c'): number {
  return data.reduce((total, item) => total + item[team], 0);
}
