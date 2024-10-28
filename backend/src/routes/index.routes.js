"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import workerRoutes from './workerRoutes.js';
const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use('/workers', workerRoutes);
export default router;