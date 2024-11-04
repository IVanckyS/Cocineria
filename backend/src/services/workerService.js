"use strict";
import Worker from "../entity/Worker.js";
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


export const deleteWorker = async (id) => {
  try {
    const workerRepository = AppDataSource.getRepository(Worker);
    
    const worker = await workerRepository.findOne({
      where: { id: parseInt(id) }
    });

    if (!worker) {
      return null;
    }

    return await workerRepository.remove(worker);
  } catch (error) {
    console.error("Error al eliminar el worker:", error);
    throw new Error("Error al eliminar el worker");
  }
};
