import dotenv from "dotenv";
import express from "express";
import carRoutes from "./routes/cars.routes.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Rutas
app.use("/api/cars", carRoutes);

// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cars API',
      version: '1.0.0',
      description: 'API para gestionar coches',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/routes/cars.routes.js'],  // Asegúrate de que esta ruta es correcta
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`REST API running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/swagger`);
  console.log('Database Host:', process.env.DB_HOST);

});
