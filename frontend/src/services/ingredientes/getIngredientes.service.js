import axios from '../root.service.js';

export async function getIngredientesService() {
  try {
    const { data } = await axios.get('/ingredientes/');
    return data.data; // Retornamos los datos sin errores ni formateo adicional
  } catch (error) {
    console.error('Error al obtener los ingredientes:', error);
    throw error; // Lanzamos el error para que el hook lo maneje
  }
}
