import sqlite3 from 'sqlite3';
import { DB_FILE } from "../config/config.js";

// Conectar a la base de datos SQLite
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

// Función para obtener un coche por ID desde SQLite
export const getCarById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM cars WHERE id = ?`;
    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Función para crear un coche
export const createCar = ({ name, brand, model, price }) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO cars (name, brand, model, price) VALUES (?, ?, ?, ?)`;
    db.run(query, [name, brand, model, price], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, name, brand, model, price });
      }
    });
  });
};
