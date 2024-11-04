// src/routes/index.routes.js
"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import ingredienteRoutes from "./ingrediente.routes.js";
import userRoutes from "./user.routes.js";
import menuRoutes from "./menu.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/ingredientes", ingredienteRoutes);
router.use("/menu", menuRoutes);

export default router;
