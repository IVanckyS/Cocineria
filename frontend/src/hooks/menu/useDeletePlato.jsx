import { useState } from "react";
import { deletePlato } from "@services/menu.service.js";
import { showSuccessAlert, showErrorAlert} from "@helpers/sweetAlert.js";



export const useDeletePlato = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleDeletePlato = async (id) => {
      if (!id) {
        showErrorAlert("Error", "El ID del plato es necesario para eliminarlo.");
        return false;
      }
  
      setLoading(true);
      try {
        const { success, message } = await deletePlato(id);
  
        if (success) {
          showSuccessAlert(
            "¡Plato Eliminado!",
            "El plato se eliminó correctamente del sistema."
          );
          return true;
        } else {
          showErrorAlert(
            "Error al Eliminar Plato",
            message || "Ocurrió un problema durante la eliminación."
          );
          return false;
        }
      } catch (error) {
        console.error("Error en handleDeletePlato:", error);
        showErrorAlert(
          "Error",
          "Hubo un problema inesperado al intentar eliminar el plato."
        );
        setError(error);
        return false;
      } finally {
        setLoading(false);
      }
    };
  
    return { loading, error, handleDeletePlato };
  };
