// src/routes/ingrediente.routes.js
"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import {
  createIngrediente,
  deleteIngrediente,
  getIngredientes,
  updateIngrediente,
} from "../controllers/ingrediente.controller.js";
import { generarReporteInventario } from "../controllers/reportes.controller.js";

const router = Router();

router.use(authenticateJwt, isAdmin);

router.get("/", getIngredientes);
router.post("/", createIngrediente);
router.patch("/:id", updateIngrediente);
router.delete("/:id", deleteIngrediente);
router.get("/reporte", generarReporteInventario); // Nueva ruta para reporte de inventario

export default router;
