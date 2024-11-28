import { getSoapClient } from "../infrastructure/soap/soap.client.js";
import { redisClient } from "../infrastructure/cache/redis.client.js";
import { pool } from "../database/postgres.js";

// Obtener todos los coches
export const getCars = async (req, res) => {
  try {
    const cachedCars = await redisClient.get("cars");

    if (cachedCars) {
      console.log("Cache hit for cars");
      return res.status(200).json(JSON.parse(cachedCars));
    }

    console.log("Cache miss, querying database");
    const { rows } = await pool.query("SELECT * FROM cars");

    await redisClient.set("cars", JSON.stringify(rows), {
      EX: 600,
    });

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Crear un coche a través de la API SOAP
export const createCar = async (req, res) => {
  const { name, brand, model, price } = req.body;

  if (!name || !brand || isNaN(model) || isNaN(price)) {
    return res.status(400).json({ error: "Invalid car data" });
  }

  try {
    const soapClient = await getSoapClient();
    const response = await soapClient.createCarAsync({
      car: {
        name,
        brand,
        model: parseInt(model),
        price: parseFloat(price),
      },
    });

    if (response[0]?.success) {
      console.log("Car created successfully via SOAP:", response[0]);
      return res.status(201).json({ message: "Car created", id: response[0].id });
    } else {
      console.error("SOAP response error:", response[0]);
      return res.status(500).json({ error: "Failed to create car" });
    }
  } catch (error) {
    console.error("Error creating car:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Obtener un coche por ID a través de la API SOAP
export const getCarById = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const soapClient = await getSoapClient();
    const response = await soapClient.getCarByIdAsync({ id: parseInt(id) });

    const car = response[0]?.car || null;
    if (car) {
      console.log(`Car with ID ${id} fetched successfully via SOAP`);
      return res.status(200).json(car);
    } else {
      console.warn(`Car with ID ${id} not found via SOAP`);
      return res.status(404).json({ error: "Car not found" });
    }
  } catch (error) {
    console.error("Error fetching car by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
