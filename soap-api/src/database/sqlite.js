import sqlite3 from "sqlite3";
import { DB_FILE } from "../config/config.js";

const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error("Error opening SQLite database:", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Crear tabla para autos si no existe
db.run(
  `CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    model INTEGER NOT NULL,
    price REAL NOT NULL
  )`
);

export default db;
