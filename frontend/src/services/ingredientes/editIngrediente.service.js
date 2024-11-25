import axios from '@services/root.service.js';

export const editIngredienteService = async (id, data) => {
  try {
    const response = await axios.put(`/ingredientes/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error al editar el ingrediente:', error);
    return { success: false, message: error.response?.data?.message || 'Error al editar el ingrediente' };
  }
};
