// src/services/worker.service.js
import axios from 'axios';

export const getAllWorkers = async () => {
  try {
    const response = await api.get('/worker');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createWorker = async (data) => {
  const workerRepository = AppDataSource.getRepository(Worker);
  const worker = workerRepository.create(data);
  return await workerRepository.save(worker);
};

export const getWorkerById = async (id) => {
  try {
    const response = await api.get(`/worker/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateWorker = async (id, data) => {
  try {
    const response = await api.put(`/worker/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteWorker = async (id) => {
  try {
    await api.delete(`/worker/${id}`);
  } catch (error) {
    throw error.response.data;
  }
};