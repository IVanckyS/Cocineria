// src/pages/CreateWorkerPage.jsx
import React from 'react';
import CreateWorker from '../components/CreateWorker';
import { showSuccessAlert } from '@helpers/sweetAlert.js';
import useCreateWorker from '@hooks/workers/useCreateWorker';

const CreateWorkerPage = () => {
  const { handleCreateWorker } = useCreateWorker();

  const handleWorkerCreated = async (workerData) => {
    await handleCreateWorker(workerData);
    showSuccessAlert('¡Creado!', 'El trabajador ha sido creado correctamente.');
  };

  return (
    <div>
      <h1>Crear Trabajador</h1>
      <CreateWorker onCreate={handleWorkerCreated} />
    </div>
  );
};

export default CreateWorkerPage;