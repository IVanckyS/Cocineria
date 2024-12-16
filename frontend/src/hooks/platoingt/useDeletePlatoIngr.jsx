import { useState } from "react";
import { deletePlatoIngr } from "@services/platoingr.service.js";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert.js";

export const useDeletePlatoIngr = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleDeletePlatoIngr = async (platoId, ingredienteId) => {
      if (!platoId || !ingredienteId) {
        showErrorAlert("Error", "Los IDs de plato e ingrediente son necesarios para eliminar la asignación.");
        return false;
      }
  
      setLoading(true);
      try {
        const { success, message } = await deletePlatoIngr(platoId, ingredienteId);
  
        if (success) {
          showSuccessAlert(
            "¡Asignación Eliminada!",
            "La asignación del ingrediente al plato se eliminó correctamente."
          );
          return true;
        } else {
          showErrorAlert(
            "Error al Eliminar Asignación",
            message || "Ocurrió un problema durante la eliminación."
          );
          return false;
        }
      } catch (error) {
        console.error("Error en handleDeletePlatoIngr:", error);
        showErrorAlert(
          "Error",
          "Hubo un problema inesperado al intentar eliminar la asignación."
        );
        setError(error);
        return false;
      } finally {
        setLoading(false);
      }
    };
  
    return { loading, error, handleDeletePlatoIngr };
  };