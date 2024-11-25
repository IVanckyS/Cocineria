// src/components/WorkerList.jsx
import React, { useEffect, useState } from 'react';
import { getAllWorkers, deleteWorker } from '../services/worker.service';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { useAuth } from '@context/AuthContext';


const WorkerList = ({ setSelectedWorker, setIsEditPopupOpen }) => {
  const [workers, setWorkers] = useState([]);
  const { user } = useAuth();
  if (user?.rol !== 'administrador') {
    return <p>No tienes permiso para ver esta sección.</p>;
  }
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getAllWorkers();
        setWorkers(data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteWorker(id);
      setWorkers(workers.filter(worker => worker.id !== id));
      showSuccessAlert('¡Eliminado!', 'El trabajador ha sido eliminado correctamente.');
    } catch (error) {
      showErrorAlert('Error', 'Ocurrió un error al eliminar el trabajador.');
    }
  };

  return (
    <div>
      <h1>Lista de Trabajadores</h1>
      <ul>
        {workers.map(worker => (
          <li key={worker.id}>
            {worker.nombre} - {worker.rol}
            <button onClick={() => {
              setSelectedWorker(worker);
              setIsEditPopupOpen(true);
            }}>Editar</button>
            <button onClick={() => handleDelete(worker.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkerList;