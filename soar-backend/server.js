const express = require("express");
const cors = require("cors"); // Import CORS

const { Pool } = require("pg");

const app = express();
const port = 5002;  // Changed from 3000 to 5002
// ✅ Enable CORS
app.use(cors());


// PostgreSQL Connection
const pool = new Pool({
  user: "rajat",
  host: "localhost",
  database: "soar_db",
  password: "crlgad@123",
  port: 5432,  // Keep this as 5432 (default for PostgreSQL)
});
app.get("/", (req, res) => {
    res.send("SOAR Backend is Running!");
  });
  
// API Route to Fetch Data
app.get("/incidents", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM incidents;");
    const incidents = result.rows.map(incident => ({
        ...incident,
        time: new Date(incident.time).toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) 
      }));
    res.json(incidents);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Server error");
  }
});
app.get("/playbooks", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM playbooks;");
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching playbooks:", error);
      res.status(500).send("Server error");
    }
  });
  


// Start the Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
