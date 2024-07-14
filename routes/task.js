const express = require("express");
const router = express.Router();
const taskControllers = require("../controllers/task");

router.get("/tasks", taskControllers.getAllTask);
router.get("/tasks/:id", taskControllers.getTaskById);
router.post("/tasks", taskControllers.creatNewTask);
router.delete("/tasks/:id", taskControllers.deleteTask);
router.put("/tasks/:id", taskControllers.updateTask);


module.exports = router;
