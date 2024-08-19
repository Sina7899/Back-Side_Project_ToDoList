import { queryExecutor } from "../../core/database/database-handler.js";

async function createUser(table, firstName, lastName, username, password) {
  const query = `
    INSERT INTO ${table} 
      (first_Name,last_Name,username, password_hash) 
    VALUES 
      ($1, $2, $3,$4);
    RETURNING *`;
  const databaseResponse = await queryExecutor(query, [
    firstName,
    lastName,
    username,
    password,
  ]);

  let CreatedUserResult = databaseResponse.rows[0];
  return CreatedUserResult;
}

async function getUserInfoByUsername(table, username) {
  const query = `
    SELECT * FROM ${table} 
    WHERE username = $1 ;
  `;
  const databaseResponse = await queryExecutor(query, [username]);
  const userInfo = databaseResponse.rows[0];
  return userInfo;
}

export { createUser, getUserInfoByUsername };
