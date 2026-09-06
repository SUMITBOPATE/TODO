



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

const getAllTasks = (req, res) => {
    res.status(200).json(tasks);
};

const getTaskById = (req, res) => {
    const taskId = Number(req.params.id);
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
};

const  createTask=(req,res)=>{
    const title=req.body.title;
    const completed=req.body.completed  ?? false;
if (!title) {
  return res.status(400).json({
    message: "Tittle is required ",
  });
}
    const id =tasks.length+1;
    const newtask={
      id : id ,
      title: title,
      completed: completed
    }
 tasks.push (newtask);
 res.status(201).json(newtask);
}

const deleteTask =(req,res)=>{
    const taskId  = Number(req.params.id)
    const task=tasks.find((task)=>task.id==taskId);
   if(!task){
    return res.status(404).json({
        message:    "task not found ",
    })
   }
   tasks = tasks.filter((task) => task.id !== taskId);
  res.status(200).json({ message: "Task deleted successfully" });

}



module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    deleteTask,
};
