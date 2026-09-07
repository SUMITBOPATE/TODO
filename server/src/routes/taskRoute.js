const express = require("express");
const router = express.Router();


  let tasks = [
  {
    id: 1,
    title: "Learn Express 404",
    completed: false,
  },
  {
    id: 2,
    title: "Build Todo API",
    completed: false,
  },
];

const { getAllTasks,getTaskById,createTask,deleteTask,updateTask } = require("../controllers/taskController");
 
//router 
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/",createTask)
router.delete("/:id",deleteTask)
router.patch("/:id",updateTask)


module.exports = router;
