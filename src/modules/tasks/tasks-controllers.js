import {
  tasksInfoByUserIdService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "../../services/tasks/tasks-services.js";

import "dotenv/config";

const TABLE = process.env.TABLE_1;

const tasksInfoByUserIdController = async (req, res, next) => {
  try {
    const userId = req.userTokenData.userId;
    const tasks = await tasksInfoByUserIdService(TABLE, userId);
    if (tasks === null) {
      res.status(404).json({
        message: `No Task with this User_id=${userId} is found!`,
      });
    } else {
      res.status(200).json({ tasks: tasks, userInfo: req.userTokenData });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const createTaskController = async (req, res, next) => {
  try {
    const { title, description } = req.validatedBody;
    const userId = req.userTokenData.userId;
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
        massage: "Task added successfully.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTaskController = async (req, res, next) => {
  try {
    const userId = req.userTokenData.userId;
    const { taskId, title, description, status } = req.validatedBody;
    const updatedTask = await updateTaskService(
      TABLE,
      taskId,
      title,
      description,
      status,
      userId
    );
    if (updatedTask === false) {
      res.status(500).json({
        massage: "Task Update Failed!",
      });
    } else {
      res.status(201).json({
        massage: "Task updated successfully.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTaskController = async (req, res, next) => {
  try {
    const taskId = req.validatedParams.taskId;
    const userId = req.userTokenData.userId;
    const deletedTask = await deleteTaskService(TABLE, taskId, userId);
    if (deletedTask === false) {
      res.status(404).json({
        message: "Task Delete Failed!",
      });
    } else {
      res.status(200).json({
        massage: "Task deleted successfully.",
      });
    }
  } catch (error) {
    console.error(error);
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
