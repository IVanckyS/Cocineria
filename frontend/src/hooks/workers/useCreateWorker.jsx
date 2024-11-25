import { useState } from 'react';
import { createWorker } from '@services/worker.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const useCreateWorker = () => {
  const [loading, setLoading] = useState(false);

  const handleCreateWorker = async (workerData) => {
    setLoading(true);
    try {
      await createWorker(workerData);
      showSuccessAlert('¡Creado!', 'El trabajador ha sido creado correctamente.');
    } catch (error) {
      showErrorAlert('Error', 'Ocurrió un error al crear el trabajador.');
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateWorker, loading };
};

export default useCreateWorker;