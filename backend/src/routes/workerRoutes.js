"use strict";
import { Router } from "express";
import * as workerController from "../controllers/workerController.js";
import { deleteWorker } from "../controllers/workerController.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { isAdmin } from "../middlewares/authorization.middleware.js";
const router = Router();

router.use(authenticateJwt);

router
.get("/", workerController.getWorkers)
.get("/:id", workerController.getWorkerById)
.post("/", workerController.createWorker)
.patch("/:id", authenticateJwt, isAdmin, workerController.updateWorker)
.delete("/:id", authenticateJwt, isAdmin, workerController.deleteWorker);
export default router;