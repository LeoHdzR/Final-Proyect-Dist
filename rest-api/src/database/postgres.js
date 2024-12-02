import pkg from 'pg';
import { DB_CONFIG } from '../config/config.js';
const { Pool } = pkg;

// Configurar el pool de conexiones a PostgreSQL
const pool = new Pool(DB_CONFIG);

// Crear la tabla 'cars' si no existe
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
  );
`;

// Ejecutar la consulta para crear la tabla
const createTable = async () => {
  try {
    await pool.query(createTableQuery);
    console.log('Table "cars" is ready');
  } catch (err) {
    console.error('Error creating table:', err);
  }
};

createTable();

export { pool };
