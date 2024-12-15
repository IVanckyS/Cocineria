"use-strict";
import { Router } from "express";
import { createPlatoIngrediente, 
        deletePlatoIngrediente, 
        getPlatoIngrediente, 
        updatePlatoIngrediente } from "../controllers/menu.controller.js";

const router = Router();
router.get("/", getPlatoIngrediente);
router.post("/", createPlatoIngrediente);
router.patch("/:platoId/:ingredienteId", updatePlatoIngrediente);
router.delete("/:platoId/:ingredienteId", deletePlatoIngrediente);

export default router;
