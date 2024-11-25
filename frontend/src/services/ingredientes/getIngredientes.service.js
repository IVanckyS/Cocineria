import axios from '../root.service.js';

export async function getIngredientesService() {
  try {
    const response = await axios.get('/ingredientes');
    return { success: true, data: response.data };
  } catch (err) {
    console.error('Error al obtener los ingredientes:', err);
    return { success: false, message: err.message || 'Error al obtener los ingredientes.' };
  }
}
