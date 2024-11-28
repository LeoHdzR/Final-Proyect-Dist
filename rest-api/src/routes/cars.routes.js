import express from "express";
import { createCar, getCarById, getCars } from "../controllers/cars.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - name
 *         - brand
 *         - model
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID automático del coche
 *         name:
 *           type: string
 *           description: El nombre del coche
 *         brand:
 *           type: string
 *           description: La marca del coche
 *         model:
 *           type: integer
 *           description: El modelo del coche
 *         price:
 *           type: number
 *           description: El precio del coche
 *       example:
 *         id: 1
 *         name: Corolla
 *         brand: Toyota
 *         model: 2020
 *         price: 20000
 */

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Retorna una lista de coches
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Lista de coches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 */
router.get("/", getCars);

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Crea un nuevo coche
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: Coche creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Datos inválidos
 */
router.post("/", createCar);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Retorna un coche por ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del coche
 *     responses:
 *       200:
 *         description: Un coche
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: El coche no fue encontrado
 */
router.get("/:id", getCarById);

export default router;
