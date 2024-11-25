import { useState } from 'react';
import { editIngredienteService } from '@services/ingredientes/editIngrediente.service.js';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert.js';

const useEditIngrediente = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEditIngrediente = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const { success, message } = await editIngredienteService(id, data);
      if (success) {
        showSuccessAlert('Ingrediente Editado', 'El ingrediente ha sido actualizado correctamente.');
        return true;
      } else {
        showErrorAlert('Error', message);
        return false;
      }
    } catch (error) {
      console.error('Error al editar el ingrediente:', error);
      setError('Error al editar el ingrediente.');
      showErrorAlert('Error', 'Ocurrió un error al editar el ingrediente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleEditIngrediente, loading, error };
};

export default useEditIngrediente;
