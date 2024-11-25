"use-strict"

import { Router } from "express";
import { createPlato, 
    createPlatoIngrediente, 
    deletePlato, 
    getPlato, 
    getPlatoById, 
    updatePlato, } from "../controllers/menu.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";

const router = Router();
router.get("/", getPlato);
router.get("/:id", getPlatoById);
router.post("/relacion", createPlatoIngrediente);
router.use(authenticateJwt, isAdmin);
router.post("/crear", createPlato);
router.patch("/update/:id", updatePlato);
router.delete("/borrar/:id", deletePlato);

export default router;