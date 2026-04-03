const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// 1. Enable CORS so the React frontend (on port 3000) can talk to us
app.use(cors());
app.use(express.json());

// 2. Configure the Database Connection
// Inside Docker, 'db' is the hostname defined in docker-compose.yml
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password123@db:5432/taskdb'
});

// 3. Define the API Route
app.get('/', async (req, res) => {
  try {
    // This query asks the database for its current system time
    const result = await pool.query('SELECT NOW() as current_time');
    
    res.json({
      message: "Success! The Architect layers are connected.",
      backend_status: "Online",
      db_time: result.rows[0].current_time,
      architecture: "Frontend (React) -> Backend (Node) -> Database (Postgres)"
    });
  } catch (err) {
    console.error("Database connection error:", err.message);
    res.status(500).json({ 
      message: "Backend is running, but could not connect to the Database.",
      error: err.message 
    });
  }
});
// Add a new task
app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
      [title]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 4. Start the Server
app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});
