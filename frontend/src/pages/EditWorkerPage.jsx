// src/pages/EditWorkerPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getWorkerById } from '../services/worker.service';
import EditWorker from '../components/EditWorker';
import { showErrorAlert } from '@helpers/sweetAlert.js';

const EditWorkerPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const data = await getWorkerById(id);
        setWorker(data);
      } catch (error) {
        showErrorAlert('Error', 'No se pudo cargar el trabajador.');
        navigate('/workers'); 
      }
    };

    fetchWorker();
  }, [id, navigate]);

  const handleWorkerUpdated = () => {
    navigate('/workers'); 
  };

  if (!worker) {
    return <p>Cargando...</p>; 
  }

  return (
    <div>
      <h1>Editar Trabajador</h1>
      <EditWorker worker={worker} onWorkerUpdated={handleWorkerUpdated} />
    </div>
  );
};

export default EditWorkerPage;