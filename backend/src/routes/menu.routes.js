"use-strict"

import { Router } from "express";
import { createPlato, getPlato } from "../controllers/menu.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();
router.use(authenticateJwt, isAdmin);
router.get("/", getPlato);
router.post("/crear", createPlato);

export default router;