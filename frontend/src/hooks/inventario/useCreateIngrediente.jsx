import { createIngredienteService } from "@services/ingredientes/createIngrediente.service.js";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert.js";

const useCreateIngrediente = () => {
  const handleCreate = async (data) => {
    try {
      const { success, message } = await createIngredienteService(data);
      if (success) {
        showSuccessAlert("¡Ingrediente creado!", "El ingrediente se creó correctamente.");
        return true;
      } else {
        showErrorAlert("Error al crear ingrediente", message || "Ocurrió un problema.");
        return false;
      }
    } catch (error) {
      console.error("Error en handleCreate:", error);
      showErrorAlert("Error", "Hubo un problema inesperado.");
      return false;
    }
  };

  return { handleCreate };
};

export default useCreateIngrediente;
