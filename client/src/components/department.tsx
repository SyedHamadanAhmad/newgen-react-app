
// types.ts or a similar file
export interface DepartmentDetailsData {
    year: number;
    department: string;
    operation: string;
    amount: number;
  }
  
import React from 'react';
import DepartmentGraphs from './departmentGraphs';

interface Props {
  name: string;
  url: string;
}

const DepartmentDetails = ({ name, url }: Props) => {
  const [data, setData] = React.useState<DepartmentDetailsData[]>([]);

  React.useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data));
  }, [url]);

  return (
    <div className="bg-white border rounded text-black shadow-sm p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Department Details: {name}</h2>
      <DepartmentGraphs data={data} />
    </div>
  );
};

export default DepartmentDetails;
