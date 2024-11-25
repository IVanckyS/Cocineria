import axios from '@services/root.service.js';

export async function getIngredienteByIdService(id) {
  try {
    const response = await axios.get(`/ingredientes/${id}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error al obtener ingrediente por ID:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Error al obtener ingrediente.',
    };
  }
}
