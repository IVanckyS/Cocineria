// src/services/worker.service.js
import axios from 'axios';

const API_URL = '/workers';

export const getAllWorkers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener trabajadores:', error);
    throw error.response.data;
  }
};

export const createWorker = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data; 
  } catch (error) {
    console.error('Error al crear trabajador:', error);
    throw error.response.data;
  }
};

export const getWorkerById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener trabajador por ID:', error);
    throw error.response.data;
  }
};

export const updateWorker = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, data);
    return response.data; 
  } catch (error) {
    console.error('Error al actualizar trabajador:', error);
    throw error.response.data;
  }
};

export const deleteWorker = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al eliminar trabajador:', error);
    throw error.response.data;
  }
};