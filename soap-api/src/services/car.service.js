import db from "../database/sqlite.js";

export const createCar = (car) => {
  return new Promise((resolve, reject) => {
    const { name, brand, model, price } = car;
    const query = `INSERT INTO cars (name, brand, model, price) VALUES (?, ?, ?, ?)`;
    db.run(query, [name, brand, model, price], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
};

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
