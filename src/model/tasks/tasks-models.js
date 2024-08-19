import { queryExecutor } from "../../core/database/database-handler.js";

export async function getTasksByUserId(table, userId) {
  const query = `SELECT * FROM ${table} WHERE user_id=$1`;
  let databaseResponse = await queryExecutor(query, [userId]);
  let tasksInfoResultAsArray = databaseResponse.rows;

  return tasksInfoResultAsArray;
}

export async function createTask(table, userId, title, description) {
  const createdAt = new Date();
  const query = `
      INSERT INTO ${table}
       (user_id,title,description,status,created_at)
      VALUES 
       ($1,$2,$3,$4,$5)
       RETURNING *`;
  let databaseResponse = await queryExecutor(query, [
    userId,
    title,
    description,
    false,
    createdAt,
  ]);
  let CreatedTaskResultAsArray = databaseResponse.rows;

  return CreatedTaskResultAsArray;
}

export async function updateTask(
  table,
  taskId,
  newTitle,
  newDescription,
  newStatus,
  userId
) {
  const query = `
      UPDATE ${table} SET 
      title=$1,description=$2,status=$3 WHERE task_id = $4 AND user_id=$5
      RETURNING *`;
  let databaseResponse = await queryExecutor(query, [
    newTitle,
    newDescription,
    newStatus,
    taskId,
    userId,
  ]);
  let updatedTaskResultAsArray = databaseResponse.rows;
  console.log(updatedTaskResultAsArray);

  return updatedTaskResultAsArray;
}

export async function deleteTask(table, taskId, userId) {
  const query = `DELETE FROM ${table} WHERE task_id =$1 AND user_id=$2 RETURNING *`;
  let databaseResponse = await queryExecutor(query, [taskId, userId]);
  let DeletedTaskResultAsArray = databaseResponse.rows;

  return DeletedTaskResultAsArray;
}
