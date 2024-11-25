import axios from '@services/root.service.js';

export const deleteIngredienteService = async (id) => {
  try {
    const response = await axios.delete(`/ingredientes/${id}`);
    return {
      success: response.status === 200,
      message: 'Ingrediente eliminado con éxito.',
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Error al eliminar el ingrediente.',
    };
  }
};
