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
  .post("/", workerController.createWorker)
  .delete("/:id", authenticateJwt, isAdmin, deleteWorker);
export default router;