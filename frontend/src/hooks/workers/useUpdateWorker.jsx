import { useState } from 'react';
import { updateWorker } from '@services/worker.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useUpdateWorker = () => {
  const [loading, setLoading] = useState(false);

  const handleUpdateWorker = async (id, workerData) => {
    setLoading(true);
    try {
      await updateWorker(id, workerData);
      showSuccessAlert('¡Actualizado!', 'El trabajador ha sido actualizado correctamente.');
    } catch (error) {
      showErrorAlert('Error', 'Ocurrió un error al actualizar el trabajador.');
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateWorker, loading };
};

export default useUpdateWorker;