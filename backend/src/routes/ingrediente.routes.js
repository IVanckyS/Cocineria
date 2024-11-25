// src/routes/ingrediente.routes.js
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

// Aplicar middlewares de autenticación y autorización
router.use(authenticateJwt, isAdmin);

// Ruta para generar el reporte de inventario (DEFINIDA PRIMERO para evitar conflicto)
router.get("/reporte", generarReporteInventario);

// Rutas CRUD para Ingredientes
router.get("/", getIngredientes);
router.post("/", createIngrediente);
router.get("/:id", getIngrediente);
router.patch("/:id", updateIngrediente);
router.delete("/:id", deleteIngrediente);

export default router;
