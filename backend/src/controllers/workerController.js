"use strict";
import * as workerService from "../services/workerService.js";
import {  handleErrorClient , handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

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


export const getWorkerById = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await workerService.getWorkerById(id);
    
    if (!worker) {
      return handleErrorClient(res, 404, "Worker no encontrado");
    }
    
    handleSuccess(res, 200, "Worker encontrado exitosamente", worker);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
};

export const updateWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await workerService.updateWorker(id, req.body);
    
    if (!worker) {
      return handleErrorClient(res, 404, "Worker no encontrado");
    }
    
    handleSuccess(res, 200, "Worker actualizado exitosamente", worker);
  } catch (error) {
    handleErrorClient(res, 400, error.message);
  }
};



export const deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await workerService.deleteWorker(id);
    if (!worker) {
      return handleErrorClient(res, 404, "Worker no encontrado");
    }
    handleSuccess(res, 200, "Worker eliminado exitosamente", worker);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
};