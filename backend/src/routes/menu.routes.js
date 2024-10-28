"use-strict"

import { Router } from "express";
import { getPlato } from "../controllers/menu.controller.js";


const router = Router();
router.get("/", getPlato);

export default router;