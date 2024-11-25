import React, { useEffect, useState } from 'react';
import { getAllWorkers, deleteWorker } from '@services/worker.service'; 
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js'; 
import { useNavigate } from 'react-router-dom';

const Workers = () => {
  const [workers, setWorkers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true); 
      try {
        const response = await getAllWorkers(); 
        console.log(response); 
        setWorkers(response); 
      } catch (err) {
        setError(err.message); 
        showErrorAlert('Error al cargar trabajadores', err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchWorkers(); 
  }, []);

  
  if (loading) return <p>Cargando trabajadores...</p>;
  
  
  if (error) return <p>Error al cargar trabajadores: {error}</p>;

  return (
    <div>
      <h1>Lista de Trabajadores</h1>
      <ul>
        {workers.map((worker) => (
          <li key={worker.id}>
            {worker.nombre} - {worker.rol}
            <button onClick={() => handleUpdateWorker(worker.id)}>
              {worker.disponibilidad ? 'Desactivar' : 'Activar'}
            </button>
            <button onClick={() => handleDeleteWorker(worker.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


const handleUpdateWorker = async (id) => {

  navigate(`/editar-trabajador/${id}`); 
};

//
const handleDeleteWorker = async (id) => {
  const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este trabajador?');
  if (confirmed) {
    try {
      await deleteWorker(id); 
      showSuccessAlert('¡Eliminado!', 'El trabajador ha sido eliminado correctamente.');
      
      setWorkers((prevWorkers) => prevWorkers.filter(worker => worker.id !== id));
    } catch (error) {
      showErrorAlert('Error al eliminar', error.message);
    }
  }
};

export default Workers;