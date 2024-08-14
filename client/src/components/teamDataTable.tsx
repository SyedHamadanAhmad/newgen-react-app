import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { teamdata } from './content';

interface TeamDataTableProps {
  team: string;
  url: string;
}

export function TeamDataTable({ team, url }: TeamDataTableProps) {
  const [data, setData] = useState<teamdata[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  const aggregateData = () => {
    const spendingMap = new Map<string, { [key: string]: number }>();

    data.forEach((item) => {
      if (!spendingMap.has(item.freq)) {
        spendingMap.set(item.freq, {});
      }
      const freqData = spendingMap.get(item.freq)!;
      freqData[item.destination] = (freqData[item.destination] || 0) + item.amount;
    });

    return Array.from(spendingMap.entries()).map(([freq, destinations]) => ({
      freq,
      ...destinations
    }));
  };

  const aggregatedData: { [key: string]: any }[] = aggregateData();
  const categories = aggregatedData.map((item) => item.freq);
  const series = Array.from(new Set(data.map(item => item.destination))).map(destination => ({
    name: destination,
    data: aggregatedData.map(item => item[destination] || 0)
  }));

  return (
    <div className="bg-white text-black border rounded shadow-sm p-4 w-full">
      <h2 className="text-lg font-bold mb-4">{team} Data</h2>
      <div className="w-full">
        <ReactApexChart
          options={{
            chart: {
              type: 'bar',
              stacked: true,
            },
            xaxis: {
              categories: categories,
            },
            yaxis: {
              title: {
                text: 'Amount'
              }
            },
            legend: {
              position: 'top',
              horizontalAlign: 'left',
            },
            plotOptions: {
              bar: {
                horizontal: false,
              },
            },
          }}
          series={series}
          type="bar"
          height={350}
        />
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Table
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">{team} Data Table</h3>
            </div>
            <div className="overflow-y-auto flex-grow p-4">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-xs">Frequency</th>
                    <th className="px-2 py-1 text-xs">Financial Year</th>
                    <th className="px-2 py-1 text-xs">Freq</th>
                    <th className="px-2 py-1 text-xs">Destination</th>
                    <th className="px-2 py-1 text-xs">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.sno}>
                      <td className="px-2 py-1 text-xs">{item.frequency}</td>
                      <td className="px-2 py-1 text-xs">{item.financial_year}</td>
                      <td className="px-2 py-1 text-xs">{item.freq}</td>
                      <td className="px-2 py-1 text-xs">{item.destination}</td>
                      <td className="px-2 py-1 text-xs">{item.amount.toString()}</td>
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