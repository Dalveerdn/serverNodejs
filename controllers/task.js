const taskSchema = require("../schema/task");
const { v4: uuidv4 } = require("uuid");
const { tasks } = require("../database");

function validateTask(data) {
  const { error } = taskSchema.validate(data, { abortEarly: false });
  if (error) {
    return error.details.map((err) => err.message);
  }
  return null;
}

async function getAllTask(req, res) {
  try {
    res.status(200).json({ Task: tasks, message: "All Task Found" });
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong! Please try again later.",
      message: error.message,
    });
  }
}

async function getTaskById(req, res) {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(400).send("taskId is missing please provide it");
    }

    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
      return res.status(404).send("Task not found");
    }

    res.status(200).json({ Task: task, message: "Task Found by id" });
  } catch (error) {
    res.status(500).send({
      error:
        "Something went wrong while finding task ! Please try again later.",
      message: error.message,
    });
  }
}

async function creatNewTask(req, res) {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title || !description || !status || !dueDate) {
      return res
        .status(400)
        .send(
          "title, description, status, dueDate are  missing please provide all",
        );
    }

    const validationErrors = validateTask({
      title,
      description,
      status,
      dueDate,
    });

    if (validationErrors) {
      return res.status(400).json({
        errors: validationErrors,
        message: "please provide valid data",
      });
    }

    const newTask = { id: uuidv4(), title, description, status, dueDate };
    tasks.push(newTask);
    res.status(200).json({ Task: newTask, message: "Task created" });
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong while creating new task ! Please try again",
      message: error.message,
    });
  }
}

async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;

    if (!taskId) {
      return res.status(400).send("taskId is missing please provide it");
    }
    console.log(tasks);
    const initialLength = tasks.length;
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).send("Task not found");
    }
    tasks.splice(taskIndex, 1);
    res
      .status(200)
      .json({ Task: taskIndex, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong while deleting task ! Please try again",
      message: error.message,
    });
  }
}

async function updateTask(req, res) {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(400).send("taskId is missing please provide it");
    }

    const { title, description, status, dueDate } = req.body;
    if (!title || !description || !status || !dueDate) {
      return res
        .status(400)
        .send(
          "title, description, status, dueDate are  missing please provide all",
        );
    }

    const validationErrors = validateTask({
      title,
      description,
      status,
      dueDate,
    });

    if (validationErrors) {
      return res.status(400).json({
        errors: validationErrors,
        message: "please provide valid data",
      });
    }

    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      return res.status(404).send("Task not found");
    }

    task.title = title;
    task.description = description;
    task.status = status;
    task.dueDate = dueDate;

    res.status(200).json({ Task: task, message: "Task updated successfully" });
  } catch (error) {
    res.status(500).send({
      error: "Something went wrong while updating task ! Please try again",
      message: error.message,
    });
  }
}

module.exports = {
  getAllTask,
  getTaskById,
  creatNewTask,
  deleteTask,
  updateTask,
};
