import { deleteIngredienteService } from '@services/ingredientes/deleteIngrediente.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteIngrediente = (fetchIngredientes, setDataIngrediente) => {
  const handleDelete = async (ingredientesToDelete) => {
    const confirmDelete = await showErrorAlert();
    if (confirmDelete.isConfirmed) {
      try {
        const idsToDelete = ingredientesToDelete.map(
          (ingrediente) => ingrediente.id
        );
        await Promise.all(
          idsToDelete.map((id) => deleteIngredienteService(id))
        );
        showSuccessAlert(
          '¡Eliminado!',
          'Los ingredientes seleccionados han sido eliminados correctamente.'
        );
        fetchIngredientes();
        setDataIngrediente([]);
      } catch (error) {
        console.error('Error al eliminar ingredientes:', error);
        showErrorAlert('Cancelado', 'Ocurrió un error al eliminar ingredientes.');
      }
    }
  };

  return { handleDelete };
};

export default useDeleteIngrediente;
