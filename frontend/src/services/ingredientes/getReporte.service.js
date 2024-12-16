import axios from "../root.service.js";

export async function getReporteService() {
  try {
    const { data } = await axios.get("/ingredientes/reporte");
    return data; // Retorna la respuesta del servidor
  } catch (error) {
    console.error("Error al obtener el reporte:", error);
    throw error;
  }
}
