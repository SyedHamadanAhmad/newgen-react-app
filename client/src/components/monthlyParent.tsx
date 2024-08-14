import React, { useEffect, useState } from 'react';
import {MonthlyDataChart} from './monthlyDataTable';

const MonthlyParent: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/monthly')
      .then((res) => res.json())
      .then((data) => setMonthlyData(data))
     
      .catch((error) => console.error('Error fetching monthly data:', error));
  }, []);
  
  return (
    <div>
      <MonthlyDataChart monthlyData={monthlyData} />
    </div>
  );
};

export default MonthlyParent;
