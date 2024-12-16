import { useState } from "react";
import { createPlato } from "@services/menu.service.js";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert.js";

const useCreatePlato = () => {
    const [loading, setLoading] = useState(false);
  
    const handleCreatePlato = async (data) => {
      setLoading(true);
      try {
        const { success, message } = await createPlato(data);
  
        if (success) {
          showSuccessAlert(
            "¡Plato Creado!",
            "El plato se creó correctamente en el sistema."
          );
          return true;
        } else {
          showErrorAlert(
            "Error al Crear Plato",
            message || "Ocurrió un problema durante la creación."
          );
          return false;
        }
      } catch (error) {
        console.error("Error en handleCreatePlato:", error);
        showErrorAlert(
          "Error",
          "Hubo un problema inesperado al intentar crear el plato."
        );
        return false;
      } finally {
        setLoading(false);
      }
    };
  
    return { handleCreatePlato, loading };
  };
  
  export default useCreatePlato;