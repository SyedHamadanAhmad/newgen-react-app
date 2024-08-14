import React, { useEffect, useState } from 'react';
import { HalfYearlyDataTable } from './halfYearlyDataTable';

const HalfYearlyParent: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/halfyearly')
      .then((res) => res.json())
      .then((data) => setMonthlyData(data))
     
      .catch((error) => console.error('Error fetching half-yearly data:', error));
  }, []);
  
  return (
    <div>
      <HalfYearlyDataTable halfYearlyData={monthlyData} />
    </div>
  );
};

export default HalfYearlyParent;
