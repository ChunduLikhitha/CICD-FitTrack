import pool from "../config/db.js";

export const getActivities = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM activities WHERE user_id = ? ORDER BY date DESC",
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error("Get activities error", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createActivity = async (req, res) => {
  const { date, type, duration_minutes, calories, notes } = req.body;
  if (!date || !type || !duration_minutes) {
    return res
      .status(400)
      .json({ message: "Please provide date, type and duration" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO activities (user_id, date, type, duration_minutes, calories, notes) VALUES (?, ?, ?, ?, ?, ?)",
      [req.user.id, date, type, duration_minutes, calories || 0, notes || null]
    );
    const [rows] = await pool.query(
      "SELECT * FROM activities WHERE id = ?",
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Create activity error", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateActivity = async (req, res) => {
  const { id } = req.params;
  const { date, type, duration_minutes, calories, notes } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE activities SET date = ?, type = ?, duration_minutes = ?, calories = ?, notes = ? WHERE id = ? AND user_id = ?",
      [date, type, duration_minutes, calories || 0, notes || null, id, req.user.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Activity not found" });
    }
    const [rows] = await pool.query("SELECT * FROM activities WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    console.error("Update activity error", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM activities WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.json({ message: "Activity deleted" });
  } catch (err) {
    console.error("Delete activity error", err);
    res.status(500).json({ message: "Server error" });
  }
};
