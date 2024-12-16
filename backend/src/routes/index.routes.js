
// src/routes/index.routes.js
"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import ingredienteRoutes from "./ingrediente.routes.js";
import userRoutes from "./user.routes.js";
import menuRoutes from "./menu.routes.js";
import platoingrRoutes from "./platoingr.routes.js";
import workerRoutes from "./workerRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/ingredientes", ingredienteRoutes);
router.use("/menu", menuRoutes);
router.use("/asignar", platoingrRoutes);
router.use("/workers", workerRoutes);

export default router;