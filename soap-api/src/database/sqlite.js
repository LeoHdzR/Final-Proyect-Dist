import sqlite3 from "sqlite3";
import { DB_FILE } from "../config/config.js";
import path from "path";

// Asegurar ruta absoluta para DB_FILE
const dbPath = path.resolve(DB_FILE);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening SQLite database:", err);
  } else {
    console.log(`Connected to SQLite database at ${dbPath}`);
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
