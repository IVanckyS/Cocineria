import axios from '@services/root.service.js';

export async function deleteIngredienteService(id) {
  try {
    const response = await axios.delete(`/ingredientes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el ingrediente:', error);
    throw error;
  }
}
