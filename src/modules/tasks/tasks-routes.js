import express from "express";

import {
  tasksInfoByUserIdValidator,
  createTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
} from "./tasks-validations.js";

import {
  tasksInfoByUserIdController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} from "./tasks-controllers.js";

const router = express.Router();

router.get("/:userId", tasksInfoByUserIdValidator, tasksInfoByUserIdController);
router.post(createTaskValidator, createTaskController);
router.put(updateTaskValidator, updateTaskController);
router.delete("/:taskId", deleteTaskValidator, deleteTaskController);

export { router };
