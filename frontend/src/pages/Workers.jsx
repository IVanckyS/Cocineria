// src/pages/Workers.jsx
import React, { useState } from 'react';
import WorkerList from '../components/WorkerList';
import CreateWorker from '../components/CreateWorker';
import Popup from '../components/Popup';
import { useAuth } from '@context/AuthContext';

const Workers = () => {
  const { user } = useAuth();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  if (user?.rol !== 'administrador') {
    return <p>No tienes permiso para acceder a esta sección.</p>;
  }

  const handleWorkerCreated = () => {
    
  };


  const handleWorkerUpdated = () => {
   
    setIsEditPopupOpen(false);
  };

  return (
    <div>
      <CreateWorker onWorkerCreated={handleWorkerCreated} />
      <WorkerList setSelectedWorker={setSelectedWorker} setIsEditPopupOpen={setIsEditPopupOpen} />
      <Popup isOpen={isEditPopupOpen} onClose={() => setIsEditPopupOpen(false)} worker={selectedWorker} onWorkerUpdated={handleWorkerUpdated} />
    </div>
  );
};

export default Workers;