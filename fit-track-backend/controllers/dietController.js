import pool from "../config/db.js";

export const getDietEntries = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM diet_entries WHERE user_id = ? ORDER BY date DESC",
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error("Get diet entries error", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createDietEntry = async (req, res) => {
  const { date, meal_type, food_name, calories, protein, carbs, fats } =
    req.body;
  if (!date || !meal_type || !food_name) {
    return res.status(400).json({
      message: "Please provide date, meal_type and food_name",
    });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO diet_entries (user_id, date, meal_type, food_name, calories, protein, carbs, fats) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        req.user.id,
        date,
        meal_type,
        food_name,
        calories || 0,
        protein || 0,
        carbs || 0,
        fats || 0,
      ]
    );
    const [rows] = await pool.query(
      "SELECT * FROM diet_entries WHERE id = ?",
      [result.insertId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Create diet entry error", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateDietEntry = async (req, res) => {
  const { id } = req.params;
  const { date, meal_type, food_name, calories, protein, carbs, fats } =
    req.body;

  try {
    const [result] = await pool.query(
      "UPDATE diet_entries SET date = ?, meal_type = ?, food_name = ?, calories = ?, protein = ?, carbs = ?, fats = ? WHERE id = ? AND user_id = ?",
      [
        date,
        meal_type,
        food_name,
        calories || 0,
        protein || 0,
        carbs || 0,
        fats || 0,
        id,
        req.user.id,
      ]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Diet entry not found" });
    }
    const [rows] = await pool.query(
      "SELECT * FROM diet_entries WHERE id = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error("Update diet entry error", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteDietEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM diet_entries WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Diet entry not found" });
    }
    res.json({ message: "Diet entry deleted" });
  } catch (err) {
    console.error("Delete diet entry error", err);
    res.status(500).json({ message: "Server error" });
  }
};
