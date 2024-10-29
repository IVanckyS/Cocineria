"use-strict"

import { Router } from "express";
import { createPlato, deletePlato, getPlato, getPlatoById, updatePlato, } from "../controllers/menu.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();
router.use(authenticateJwt, isAdmin);
router.get("/", getPlato);
router.get("/:id", getPlatoById);
router.post("/crear", createPlato);
router.patch("/:id", updatePlato);
router.delete("/:id", deletePlato);

export default router;