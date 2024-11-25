import { useState } from 'react';
import { deleteWorker } from '@services/worker.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useDeleteWorker = () => {
  const [loading, setLoading] = useState(false);

  const handleDeleteWorker = async (id) => {
    setLoading(true);
    try {
      await deleteWorker(id);
      showSuccessAlert('¡Eliminado!', 'El trabajador ha sido eliminado correctamente.');
    } catch (error) {
      showErrorAlert('Error', 'Ocurrió un error al eliminar el trabajador.');
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteWorker, loading };
};

export default useDeleteWorker;