import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT || 5432,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB || "tabnews",
    password: String(process.env.POSTGRES_PASSWORD),
    pool_mode: process.env.POSTGRES_POOL_MODE || "session",
    ssl: getSSLValues(),
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};

function getSSLValues() {
  if (process.env.NODE_ENV === "production") {
    return {
      ca: process.env.POSTGRES_CA,
      rejectUnauthorized: false,
    };
  }

  return process.env.NODE_ENV === "development" ? false : true;
}
