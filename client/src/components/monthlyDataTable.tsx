import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface MonthlyData {
  mapid: string;
  frequency: string;
  year: number;
  monthly: string;
  team_a: number;
  team_b: number;
  team_c: number;
}

interface MonthlyDataTableProps {
  monthlyData: MonthlyData[];
}

export function MonthlyDataChart({ monthlyData }: MonthlyDataTableProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate total expenditure for Team A, Team B, and Team C across all months
  const totalExpenditureTeamA = monthlyData.reduce((total, data) => total + data.team_a, 0);
  const totalExpenditureTeamB = monthlyData.reduce((total, data) => total + data.team_b, 0);
  const totalExpenditureTeamC = monthlyData.reduce((total, data) => total + data.team_c, 0);

  const chartOptions = {
    chart: {
      width: '100%',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ['Total Expenditure'],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    yaxis: {
      title: {
        text: '$ (thousands)',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return "$ " + val + " thousands";
        },
      },
    },
  };

  const series = [
    {
      name: 'Team A',
      data: [totalExpenditureTeamA],
    },
    {
      name: 'Team B',
      data: [totalExpenditureTeamB],
    },
    {
      name: 'Team C',
      data: [totalExpenditureTeamC],
    },
  ];

  return (
    <div className="bg-white border rounded text-black shadow-sm p-4">
      <h1 className="text-xl text-black font-bold mb-4">Monthly Consumption</h1>
      <h2 className="text-lg font-bold text-black mb-4">Total Expenditure Chart</h2>
      <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="bar"
          height={400}
        />
      </div>
      
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Table
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-lg text-black font-semibold">Monthly Consumption Data</h3>
            </div>
            <div className="overflow-auto flex-grow p-4">
              <table className="w-full table-auto text-black">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Frequency</th>
                    <th className="px-4 py-2 text-left">Year</th>
                    <th className="px-4 py-2 text-left">Monthly</th>
                    <th className="px-4 py-2 text-left">Team A</th>
                    <th className="px-4 py-2 text-left">Team B</th>
                    <th className="px-4 py-2 text-left">Team C</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map(({ mapid, frequency, year, monthly, team_a, team_b, team_c }) => (
                    <tr key={mapid}>
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
                onClick={() => setIsOpen(false)}
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
