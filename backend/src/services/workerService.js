"use strict";
import Worker from '../entity/Worker.js';
import { AppDataSource } from "../config/configDb.js";

export const getAllWorkers = async () => {
  const workerRepository = AppDataSource.getRepository(Worker);
  return await workerRepository.find();
};

export const createWorker = async (data) => {
  const workerRepository = AppDataSource.getRepository(Worker);
  const worker = workerRepository.create(data);
  return await workerRepository.save(worker);
};