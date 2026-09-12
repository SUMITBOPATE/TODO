 const express = require( "express");
  const app  = express ();
const cors = require("cors");
  const PORT  = process.env.PORT || 3000;               
  const pool= require("./db")



  async function connectToDatabase() {
  try {
    await pool.query("SELECT 1");
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

connectToDatabase();

  app.use(express.json());
  app.use(cors());





const taskRoute = require("./routes/taskRoute");

//middleware
app.use("/api/tasks", taskRoute);

app.get("/api/db-test", async (req, res) => {
  const result = await pool.query("SELECT NOW()")
  res.json(result.rows[0])
})

console.log("DATABASE_URL exists:", Boolean(process.env.DATABASE_URL))

 



 








app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


