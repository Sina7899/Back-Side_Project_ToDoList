import {
  getTasksByUserId,
  createTask,
  updateTask,
  deleteTask,
} from "../../model/tasks/tasks-models.js";

async function tasksInfoByUserIdService(table, userId) {
  const tasks = await getTasksByUserId(table, userId);
  if (tasks === null || tasks === undefined || tasks.length === 0) {
    return null;
  }
  return tasks;
}

async function createTaskService(table, userId, title, description) {
  const createdTask = await createTask(table, userId, title, description);
  if (
    createdTask === null ||
    createdTask === undefined ||
    createdTask.length === 0
  ) {
    return false;
  }
  return createdTask;
}

async function updateTaskService(
  table,
  taskId,
  newTitle,
  newDescription,
  newStatus,
  userId
) {
  const updatedTask = await updateTask(
    table,
    taskId,
    newTitle,
    newDescription,
    newStatus,
    userId
  );
  if (
    updatedTask === null ||
    updatedTask === undefined ||
    updatedTask.length === 0
  ) {
    return false;
  }
  return true;
}

async function deleteTaskService(table, taskId, userId) {
  const deletedTask = await deleteTask(table, taskId, userId);
  if (
    deletedTask === null ||
    deletedTask === undefined ||
    deletedTask.length === 0
  ) {
    return false;
  }
  return true;
}

export {
  tasksInfoByUserIdService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
