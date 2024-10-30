
"use strict";
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import ingredienteRoutes from "./ingrediente.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();
router.use("/api/auth", authRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/ingredientes", ingredienteRoutes);

export default router;
