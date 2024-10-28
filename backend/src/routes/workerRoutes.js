"use strict";
import { Router } from "express";
import * as workerController from '../controllers/workerController.js';
import { authenticateJwt } from '../middlewares/authentication.middleware.js';

const router = Router();

router.use(authenticateJwt);

router
  .get('/', workerController.getWorkers)
  .post('/', workerController.createWorker);

export default router;