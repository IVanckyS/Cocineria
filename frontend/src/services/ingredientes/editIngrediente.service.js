import axios from "../root.service.js";

export async function editIngrediente(id, data) {
  try {
    const response = await axios.put(`/ingredientes/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error en editIngrediente:", error);
    throw new Error("Error al actualizar el ingrediente.");
  }
}
