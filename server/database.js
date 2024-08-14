import mysql from 'mysql2/promise'

const pool = await mysql.createConnection({
    host:"127.0.0.1",
    port:'3306',
    user:"root",
    password:"NewGenAssignment",
    database:"sys"
})

export async function getHalfYearly(){
    const [rows]=await pool.query("SELECT * FROM avalbudgetsummary WHERE monthly=\"H1\" || monthly=\"H2\"")
    return rows
}

export async function getMonthly(){
    const [rows]=await pool.query("SELECT * FROM avalbudgetsummary WHERE ( ( monthly = 'January' ) Or ( monthly = 'February' ) Or ( monthly = 'March' ) Or ( monthly = 'April' ) Or ( monthly = 'May' ) Or ( monthly = 'June' ) Or ( monthly = 'July' ) Or ( monthly = 'August' ) Or ( monthly = 'September' ) Or ( monthly = 'October' ) Or ( monthly = 'November' ) Or ( monthly = 'December' ) )")
    return rows
}

export async function getQuarterly(){
    const [rows]=await pool.query("SELECT * FROM avalbudgetsummary WHERE ( ( monthly = 'Q1' ) Or ( monthly = 'Q2' ) Or ( monthly = 'Q3' ) Or ( avalbudgetsummary.monthly = 'Q4' ) )")
    return rows
}


export async function getYearly(){
    const [rows]=await pool.query("SELECT * FROM avalbudgetsummary WHERE ( ( avalbudgetsummary.monthly = N'Year' ) )")
    return rows
}


export async function getBTH_TeamA(){
    const [rows]=await pool.query("SELECT * FROM budget_transfer_history")
    return rows;
}

export async function getBTH_TeamB(){
    const [rows]=await pool.query("SELECT * FROM budget_transfer_history_team_b")
    return rows;
}

export async function getBTH_TeamC(){
    const [rows]=await pool.query("SELECT * FROM budget_transfer_history_team_c")
    return rows;
}

export async function  getYearlyBudget(){
    const [rows]= await pool.query("SELECT * FROM yearlybudget")
    return rows;
}

export async function getDepartmentDetails(department) {
    try {
      const [rows] = await pool.query(
        'SELECT * FROM department_spending WHERE department = ?',
        [department]
      );
      return rows;
    } catch (error) {
      console.error('Error fetching department details:', error);
      throw error;
    }
  }