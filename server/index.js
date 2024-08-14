import express from 'express';
import cors from 'cors';
const app = express();
import { getBTH_TeamA, getBTH_TeamB, getBTH_TeamC, getHalfYearly, getMonthly, getQuarterly, getYearly, getYearlyBudget, getDepartmentDetails } from "./database.js";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.get('/halfyearly', async (req, res)=>{
    const data=await getHalfYearly()
    res.json(data);

})
app.get('/monthly', async (req, res)=>{
    const data=await getMonthly()
    res.json(data);

})

app.get('/quarterly', async (req, res)=>{
    const data=await getQuarterly()
    res.json(data);

})

app.get('/yearly', async (req, res)=>{
    const data=await getYearly()
    res.json(data);

})

app.get('/btha', async(req, res)=>{
  const data=await getBTH_TeamA()
  res.json(data);
})

app.get('/bthb', async(req, res)=>{
  const data=await getBTH_TeamB()
  res.json(data);
})

app.get('/bthc', async(req, res)=>{
  const data=await getBTH_TeamC()
  res.json(data);
})

app.get('/yb', async(req, res)=>{
  const data=await getYearlyBudget()
  res.json(data);
})

app.get('/dept/:department', async (req, res) => {
  const { department } = req.params;

  try {
    // Call the function to get department details
    const details = await getDepartmentDetails(department);

    // Check if details were found
    if (details.length === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Send the department details as a response
    res.json(details);
  } catch (error) {
    console.error('Error fetching department details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

