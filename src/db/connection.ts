import pg from "pg";
import { dbConfig } from "./config.js";

const { Pool } = pg;
const pool = new Pool(dbConfig);

// Test database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Error connecting to the database:", err);
  } else {
    console.log("✅ Database connected successfully");
  }
});

export default {
  query: (text: string, params: any[]) => pool.query(text, params),
};
