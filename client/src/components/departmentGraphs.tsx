import React, { useState, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DepartmentDetailsData } from './types'; // Adjust the import path

interface Props {
  data: DepartmentDetailsData[];
}

const DepartmentGraphs: React.FC<Props> = ({ data }) => {
  const [showOperations, setShowOperations] = useState(true);

  const aggregatedOperationData = useMemo(() => {
    return data.reduce((acc, curr) => {
      acc[curr.operation] = (acc[curr.operation] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);
  }, [data]);

  const getOperationChartOptions = () => ({
    chart: {
      type: 'bar' as 'bar',
      height: 400,
    },
    title: {
      text: 'Spending on Operations',
      align: 'left' as 'left',
    },
    xaxis: {
      categories: Object.keys(aggregatedOperationData),
      labels: {
        rotate: -45,
        rotateAlways: true,
        trim: false,
        maxHeight: 120,
      },
    },
    yaxis: {
      title: {
        text: 'Amount',
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
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
    fill: {
      opacity: 1,
    },
  });

  const getYearChartOptions = () => {
    const sortedYears = Array.from(new Set(data.map(item => item.year)))
      .sort((a, b) => a - b)
      .map(year => year.toString());

    return {
      chart: {
        type: 'bar' as 'bar',
        height: 400,
      },
      title: {
        text: 'Spending by Year',
        align: 'left' as 'left',
      },
      xaxis: {
        categories: sortedYears,
      },
      yaxis: {
        title: {
          text: 'Amount',
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
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
      fill: {
        opacity: 1,
      },
    };
  };

  const getOperationSeries = (): ApexAxisChartSeries => [{
    name: 'Spending',
    data: Object.values(aggregatedOperationData),
  }];

  const getYearSeries = (): ApexAxisChartSeries => {
    const spendingByYear = data.reduce((acc: { [key: number]: number }, curr: DepartmentDetailsData) => {
      acc[curr.year] = (acc[curr.year] || 0) + curr.amount;
      return acc;
    }, {});

    const sortedYears = Object.keys(spendingByYear).sort((a, b) => parseInt(a) - parseInt(b));

    const sortedData = sortedYears.map(year => spendingByYear[parseInt(year)]);

    return [{
      name: 'Spending',
      data: sortedData,
    }];
  };

  return (
    <div>
      <ReactApexChart
        options={showOperations ? getOperationChartOptions() : getYearChartOptions()}
        series={showOperations ? getOperationSeries() : getYearSeries()}
        type="bar"
        height={400}
      />
      <button
        onClick={() => setShowOperations(!showOperations)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Toggle Graph
      </button>
    </div>
  );
};

export default DepartmentGraphs;
