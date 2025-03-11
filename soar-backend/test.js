const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432, // Default PostgreSQL port
});

async function testDBConnection() {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to the database successfully!");
    client.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

testDBConnection();
