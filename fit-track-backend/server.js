import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import dietRoutes from "./routes/dietRoutes.js";
import pool from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple health check
app.get("/", (req, res) => {
  res.json({ message: "FitTrack backend is running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/diet", dietRoutes);

// Verify DB connection on startup
(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("MySQL connection established");
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
  }
})();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
