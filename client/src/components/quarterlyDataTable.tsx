import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { monthlydata } from './content';

export function QuarterlyDataTable() {
  const [quarterlyData, setQuarterlyData] = useState<monthlydata[]>([]);
  const [showChart, setShowChart] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/quarterly')
      .then((res) => res.json())
      .then((data) => {
        setQuarterlyData(data);
      });
  }, []);

  const toggleView = () => {
    setShowChart(!showChart);
  };

  if (!quarterlyData || quarterlyData.length === 0) {
    return (
      <div className="flex bg-white border rounded shadow-sm p-4 justify-center">
        <p>No data available</p>
      </div>
    );
  }

  const getQuarterData = () => {
    return quarterlyData.map((item) => ({
      year: parseInt(item.year, 10),
      quarter: item.monthly,
      team_a: item.team_a,
      team_b: item.team_b,
      team_c: item.team_c,
    }));
  };

  const quarterData = getQuarterData();
  const categories = quarterData.map(item => `${item.quarter} ${item.year}`);

  return (
    <div className="flex bg-white border text-black rounded shadow-sm p-4 justify-center">
      <div className="overflow-scroll w-full text-black">
        {showChart ? (
          <>
            <h2 className="text-lg font-bold">Quarterly Expenditure Chart</h2>
            <div className="w-full">
              <ReactApexChart
                options={{
                  chart: {
                    width: '100%',
                    height: 600,
                    toolbar: {
                      show: false,
                    },
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      columnWidth: '55%',
                    },
                  },
                  xaxis: {
                    categories: categories, // Categories for chart
                  },
                  dataLabels: {
                    enabled: false, // Disable data labels on the bar
                  },
                  tooltip: {
                    enabled: true,
                  },
                }}
                series={[
                  {
                    name: 'Team A',
                    data: quarterData.map(item => item.team_a),
                  },
                  {
                    name: 'Team B',
                    data: quarterData.map(item => item.team_b),
                  },
                  {
                    name: 'Team C',
                    data: quarterData.map(item => item.team_c),
                  },
                ]}
                type="bar"
                height={600}
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
            <h2 className="text-lg font-bold">Quarterly Data Table</h2>
            <table className="w-full table-auto mt-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">Year</th>
                  <th className="px-4 py-2">Quarter</th>
                  <th className="px-4 py-2">Team A</th>
                  <th className="px-4 py-2">Team B</th>
                  <th className="px-4 py-2">Team C</th>
                </tr>
              </thead>
              <tbody>
                {quarterData.map((data, index) => (
                  <tr key={`${data.quarter}-${data.year}-${index}`}>
                    <td className="px-4 py-2">{data.year}</td>
                    <td className="px-4 py-2">{data.quarter}</td>
                    <td className="px-4 py-2">{data.team_a}</td>
                    <td className="px-4 py-2">{data.team_b}</td>
                    <td className="px-4 py-2">{data.team_c}</td>
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
              <h3 className="text-lg font-semibold">Quarterly Data Table</h3>
            </div>
            <div className="overflow-auto flex-grow p-4">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Year</th>
                    <th className="px-4 py-2">Quarter</th>
                    <th className="px-4 py-2">Team A</th>
                    <th className="px-4 py-2">Team B</th>
                    <th className="px-4 py-2">Team C</th>
                  </tr>
                </thead>
                <tbody>
                  {quarterData.map((data, index) => (
                    <tr key={`${data.quarter}-${data.year}-${index}`}>
                      <td className="px-4 py-2">{data.year}</td>
                      <td className="px-4 py-2">{data.quarter}</td>
                      <td className="px-4 py-2">{data.team_a}</td>
                      <td className="px-4 py-2">{data.team_b}</td>
                      <td className="px-4 py-2">{data.team_c}</td>
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
function calculateTotalExpenditure(data: { year: number; quarter: string; team_a: number; team_b: number; team_c: number }[], team: 'team_a' | 'team_b' | 'team_c'): number {
  return data.reduce((total, item) => total + item[team], 0);
}
