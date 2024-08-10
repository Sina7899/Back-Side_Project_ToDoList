import "dotenv/config";

const POSTGRES_CREDENTIALS = {
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: true,
};

export { POSTGRES_CREDENTIALS };
