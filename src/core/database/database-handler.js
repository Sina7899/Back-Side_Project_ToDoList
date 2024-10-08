import { POSTGRES_CREDENTIALS } from "../secrets/secrets.js";
import pg from "pg";

const { Client } = pg;

async function queryExecutor(query, variables) {
  let client;
  try {
    client = new Client(POSTGRES_CREDENTIALS);
    await client.connect();
    const queryResult = await client.query(query, variables);
    return queryResult;
  } catch (err) {
    throw err;
  } finally {
    if (client) {
      try {
        await client.end();
      } catch (endErr) {
        throw endErr;
      }
    }
  }
}

export { queryExecutor };
