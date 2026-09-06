 const express = require( "express");
  const app  = express ();
const cors = require("cors");
  const PORT  = process.env.PORT || 3000;               
  
  app.use(express.json());
  app.use(cors());





const taskRoute = require("./routes/taskRoute");

//middleware
app.use("/api/tasks", taskRoute);





 



 








app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


