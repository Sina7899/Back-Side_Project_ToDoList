import {
  tasksInfoByUserIdService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "../../services/tasks/tasks-services.js";

import "dotenv/config";

const TABLE = process.env.MAIN_TABLE;

const tasksInfoByUserIdController = async (req, res, next) => {
  try {
    const userId = req.validatedParams.userId;
    const tasks = await tasksInfoByUserIdService(TABLE, userId);
    if (tasks === null) {
      res.status(404).json({
        message: `No Task with this User_id=${userId} is found!`,
      });
    } else {
      res.json(tasks);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const createTaskController = async (req, res, next) => {
  try {
    const { userId, title, description } = req.validatedParams;
    const createdTask = await createTaskService(
      TABLE,
      userId,
      title,
      description
    );
    if (createdTask === false) {
      res.status(500).json({
        massage: "Task Create Failed!",
      });
    } else {
      res.status(201).json({
        massage: "The Task added successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTaskController = async (req, res, next) => {
  try {
    const id = req.validatedParams.id;
    const { taskId, title, description, status } = req.validatedParams;
    const createdTask = await updateTaskService(
      TABLE,
      taskId,
      title,
      description,
      status
    );
    if (createdTask === false) {
      res.status(500).json({
        massage: "Task Update Failed!",
      });
    } else {
      res.status(201).json({
        massage: "The Task updated successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTaskController = async (req, res, next) => {
  try {
    const taskId = req.validatedParams.taskId;
    const deletedTask = await deleteTaskService(TABLE, taskId);
    if (deletedTask === false) {
      res.status(404).json({
        message: `The task with id=${taskId} is not exists`,
      });
    } else {
      res.status(200).json({
        massage: "The Task deleted successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  tasksInfoByUserIdController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
};
