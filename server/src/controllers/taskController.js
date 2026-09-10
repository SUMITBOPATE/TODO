
const pool = require("../db")


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

const getAllTasks = async (req, res) => {
    const result = await pool.query("SELECT * FROM Tasks ORDER BY id ASC");
    res.status(200).json(result.rows);
};

const getTaskById = async (req, res) => {
    const taskId = Number(req.params.id);
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
};

const  createTask= async (req,res)=>{
    const title=req.body.title;
    const completed=req.body.completed  ?? false;
if (!title) {
  return res.status(400).json({
    message: "Tittle is required ",
  });
}
    // const id =tasks.length+1;
    // const newtask={
    //   id : id ,
    //   title: title,
    //   completed: completed
    // }


  const result = await  pool.query(
    "INSERT INTO tasks (title,completed)  VALUES ($1,$2) RETURNING *",
     [title,completed])
 
 res.status(201).json(result.rows[0]);
}

const deleteTask = async (req, res) => {
 

  const result = await pool.query(
    "DELETE FROM tasks WHERE id = $1 RETURNING *",
    [req.params.id]
  )

  if (result.rows.length === 0) {
    return res.status(404).json({
      message: "Task not found",
    })
  }

  res.status(200).json({
    message: "Task deleted successfully",
  })
}
const updateTask = async (req, res) => {
const {completed }= req.body;
const result =await pool.query (
  "UPDATE tasks SET completed =$1 WHERE id= $2  RETURNING * ",
  [completed ,req.params.id]
)
;
if (result.rowCount ===0 ) {
  return res.status(404).json({
    message: "Task not found",
  });
}

return res.status(200).json(result.rows[0]);
}


module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask ,
};
