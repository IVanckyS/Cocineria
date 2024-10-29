
"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import {
  createIngrediente,
  deleteIngrediente,
  getIngrediente,
  getIngredientes,
  updateIngrediente,
} from "../controllers/ingrediente.controller.js";
import { generarReporteInventario } from "../controllers/reportes.controller.js";

const router = Router();

// Middleware de autenticación y autorización
router.use(authenticateJwt, isAdmin);

// Rutas CRUD para Ingredientes
router.get("/", getIngredientes); // Obtener todos los ingredientes
router.post("/", createIngrediente); // Crear un nuevo ingrediente
router.get("/:id", getIngrediente); // Obtener un ingrediente por ID
router.patch("/:id", updateIngrediente); // Actualizar un ingrediente por ID
router.delete("/:id", deleteIngrediente); // Eliminar un ingrediente por ID

// Ruta para generar el reporte de inventario
router.get("/reporte", generarReporteInventario);

export default router;
