// src/pages/CreateWorkerPage.jsx
import React from 'react';
import CreateWorker from '../components/CreateWorker';
import { showSuccessAlert } from '@helpers/sweetAlert.js';

const CreateWorkerPage = () => {
  const handleWorkerCreated = () => {
    showSuccessAlert('¡Creado!', 'El trabajador ha sido creado correctamente.');
    
  };

  return (
    <div>
      <h1>Crear Trabajador</h1>
      <CreateWorker onWorkerCreated={handleWorkerCreated} />
    </div>
  );
};

export default CreateWorkerPage;