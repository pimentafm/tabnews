import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT || 5432,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB || "tabnews",
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();

  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
  } finally {
    await client.end();
  }

  return result;
}

export default {
  query: query,
};
