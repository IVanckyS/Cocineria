import { deleteIngredienteService } from "@services/ingredientes/deleteIngrediente.service.js";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

const useDeleteIngrediente = (fetchIngredientes) => {
  const handleDelete = async (id) => {
    try {
      const success = await deleteIngredienteService(id);
      if (success) {
        showSuccessAlert("¡Eliminado!", "El ingrediente fue eliminado correctamente.");
        if (fetchIngredientes) {
          fetchIngredientes(); // Refresca la lista de ingredientes
        }
        return true;
      } else {
        showErrorAlert("Error", "No se pudo eliminar el ingrediente.");
        return false;
      }
    } catch {
      showErrorAlert("Error", "Ocurrió un error al eliminar el ingrediente.");
      return false;
    }
  };

  return { handleDelete };
};

export default useDeleteIngrediente;
