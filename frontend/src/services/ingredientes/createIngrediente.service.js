import axios from "@services/root.service.js";

export const createIngredienteService = async (data) => {
  try {
    const response = await axios.post("/ingredientes", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error al crear ingrediente:", error);
    return { success: false, message: error.response?.data?.message || "Error desconocido." };
  }
};
