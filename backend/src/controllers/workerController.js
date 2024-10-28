"use strict";
import * as workerService from '../services/workerService.js';
import { handleSuccess, handleErrorClient, handleErrorServer } from '../handlers/responseHandlers.js';

export const getWorkers = async (req, res) => {
  try {
    const workers = await workerService.getAllWorkers();
    handleSuccess(res, 200, "Workers encontrados exitosamente", workers);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
};

export const createWorker = async (req, res) => {
  try {
    const worker = await workerService.createWorker(req.body);
    handleSuccess(res, 201, "Worker creado exitosamente", worker);
  } catch (error) {
    handleErrorClient(res, 400, error.message);
  }
};