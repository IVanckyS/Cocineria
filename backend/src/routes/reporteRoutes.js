"use strict";
import { Router } from "express";
import { getReporteRendimiento } from "../controllers/reporteController.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();

router.get("/rendimiento", authenticateJwt, isAdmin, getReporteRendimiento);

export default router;