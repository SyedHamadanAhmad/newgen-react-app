import { useState, useEffect } from "react";
import { HalfYearlyDataTable } from './halfYearlyDataTable';
import { QuarterlyDataTable } from './quarterlyDataTable';
import { YearlyDataTable } from './yearlyDataTable';
import { TeamDataTable } from './teamDataTable';
import { DepartmentDataTable } from './departmentDataTable';
import MonthlyParent from "./monthlyParent";
import HalfYearlyParent from "./halfYearlyParent";
export type monthlydata = {
  mapid: number,
  frequency: string,
  year: string,
  monthly: string,
  team_a: number,
  team_b: number,
  team_c: number
};

export type yearlydata = {
  sno: number,
  year: number,
  department: string,
  budget: number
}

export type teamdata = {
  sno: number,
  frequency: string,
  financial_year: string,
  freq: string,
  destination: string,
  amount: number
}








const Dashboard = () => {
  return (
    <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <MonthlyParent />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <HalfYearlyParent />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <QuarterlyDataTable />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <YearlyDataTable />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <TeamDataTable team="Team A" url="http://localhost:8000/btha" />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <TeamDataTable team="Team B" url="http://localhost:8000/bthb" />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <TeamDataTable team="Team C" url="http://localhost:8000/bthc" />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <DepartmentDataTable />
      </div>
    </div>
  );
};

export default Dashboard;