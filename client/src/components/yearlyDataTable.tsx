import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { monthlydata } from './content';

export function YearlyDataTable() {
  const [yearly, setYearly] = useState<monthlydata[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/yearly')
      .then((res) => res.json())
      .then((data) => setYearly(data));
  }, []);

  if (!yearly || yearly.length === 0) {
    return (
      <div className="flex bg-white border rounded shadow-sm p-4 justify-center">
        <p>No data available</p>
      </div>
    );
  }

  const categories = yearly.map(item => item.year);

  return (
    <div className="flex bg-white border text-black rounded shadow-sm p-4 justify-center">
      <div className="overflow-scroll w-full text-black">
        <h2 className="text-lg font-bold">Yearly Data Chart</h2>
        <div className="w-full">
          <ReactApexChart
            options={{
              chart: {
                type: 'line',
                toolbar: {
                  show: false,
                },
              },
              xaxis: {
                categories: categories, // Categories for chart
              },
              dataLabels: {
                enabled: false, // Disable data labels on the line
              },
              tooltip: {
                enabled: true,
              },
            }}
            series={[
              {
                name: 'Team A',
                data: yearly.map(item => item.team_a),
              },
              {
                name: 'Team B',
                data: yearly.map(item => item.team_b),
              },
              {
                name: 'Team C',
                data: yearly.map(item => item.team_c),
              },
            ]}
            type="line"
            height={400}
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
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Yearly Data Table</h3>
            </div>
            <div className="overflow-auto flex-grow p-4">
              <table className="min-w-full table-auto">
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
                  {yearly.map((item) => (
                    <tr key={item.mapid}>
                      <td className="px-4 py-2">{item.frequency}</td>
                      <td className="px-4 py-2">{item.year}</td>
                      <td className="px-4 py-2">{item.monthly}</td>
                      <td className="px-4 py-2">{item.team_a}</td>
                      <td className="px-4 py-2">{item.team_b}</td>
                      <td className="px-4 py-2">{item.team_c}</td>
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
