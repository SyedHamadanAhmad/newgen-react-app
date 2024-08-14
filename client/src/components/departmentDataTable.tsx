import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { yearlydata } from './content';
import DepartmentDetails from './department'; // Import the DepartmentDetails component

export function DepartmentDataTable() {
  const [deptData, setDeptData] = useState<yearlydata[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/yb')
      .then((res) => res.json())
      .then((data) => setDeptData(data));
  }, []);

  const aggregateDepartmentSpending = () => {
    const spendingMap = new Map<string, number>();

    deptData.forEach(item => {
      const currentSpending = spendingMap.get(item.department) || 0;
      spendingMap.set(item.department, currentSpending + item.budget);
    });

    return Array.from(spendingMap.entries()).map(([department, totalBudget]) => ({
      department,
      totalBudget,
    }));
  };

  const aggregatedData = aggregateDepartmentSpending();
  const departmentNames = aggregatedData.map(item => item.department);
  const budgetData = aggregatedData.map(item => item.totalBudget);

  const handleDepartmentClick = (department: string) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center text-black bg-white border rounded shadow-sm p-4">
      <h2 className="text-lg font-bold mb-4">Department Data</h2>
      <div className="overflow-y-auto max-h-96 w-full text-black">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-2 py-1 text-xs">Year</th>
              <th className="px-2 py-1 text-xs">Dept.</th> {/* Changed header */}
              <th className="px-2 py-1 text-xs">Budget</th>
            </tr>
          </thead>
          <tbody>
            {deptData.map((item) => (
              <tr key={item.sno} onClick={() => handleDepartmentClick(item.department)} className="cursor-pointer hover:bg-gray-100">
                <td className="px-2 py-1 text-xs truncate" title={item.year.toString()}>{item.year}</td>
                <td className="px-2 py-1 text-xs truncate" title={item.department}>{item.department}</td>
                <td className="px-2 py-1 text-xs truncate" title={item.budget.toString()}>{item.budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Visualise Data
      </button>

      {/* Pie chart modal */}
      {isModalOpen && !selectedDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Department Budget Distribution</h3>
            </div>
            <div className="overflow-auto flex-grow p-4 flex justify-center items-center">
              <ReactApexChart
                options={{
                  chart: {
                    type: 'pie',
                  },
                  labels: departmentNames,
                  tooltip: {
                    enabled: true,
                  },
                  legend: {
                    position: 'bottom',
                    horizontalAlign: 'center',
                    floating: false,
                  },
                  plotOptions: {
                    pie: {
                      donut: {
                        size: '70%', // Adjust size as needed
                      },
                    },
                  },
                }}
                series={budgetData}
                type="pie"
                height={500} // Adjust height
                width={500}  // Adjust width
              />
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

      {/* Department details modal */}
      {selectedDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Department Details: {selectedDepartment}</h3>
            </div>
            <div className="overflow-auto flex-grow p-4">
              <DepartmentDetails name={selectedDepartment} url={`http://localhost:8000/dept/${selectedDepartment}`} />
            </div>
            <div className="p-4 border-t">
              <button
                onClick={() => {
                  setSelectedDepartment(null);
                  setIsModalOpen(false);
                }}
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
