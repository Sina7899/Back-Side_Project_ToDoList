import { POSTGRES_CREDENTIALS } from "../secrets/secrets.js";
import pg from "pg";

const { Client } = pg;

async function queryExecutor(query, variables) {
  let client = undefined;
  try {
    client = new Client(POSTGRES_CREDENTIALS);
    await client.connect();
    const queryResult = await client.query(query, variables);
    return queryResult;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    await client.end();
  }
}

export { queryExecutor };
