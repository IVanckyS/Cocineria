
import { useAuth } from '@context/AuthContext';
import React from 'react';
import { useGetWorkers } from '@hooks/workers/useGetWorkers';
import { useDeleteWorker } from '@hooks/workers/useDeleteWorker';
import { useUpdateWorker } from '@hooks/workers/useUpdateWorker';

const WorkerList = () => {

  const { user } = useAuth();
  if (user?.rol !== 'administrador') {
    return <p>No tienes permiso para ver esta sección.</p>;
  }
  const { workers, loading, error } = useGetWorkers();
  const { handleDeleteWorker } = useDeleteWorker();
  const { handleUpdateWorker } = useUpdateWorker();


  if (loading) return <p>Cargando trabajadores...</p>;
  if (error) return <p>Error al cargar trabajadores: {error.message}</p>;

  return (
    <ul>
      {workers.map((worker) => (
        <li key={worker.id}>
          {worker.nombre} - {worker.rol}
          <button onClick={() => handleUpdateWorker(worker.id, { ...worker, disponibilidad: !worker.disponibilidad })}>
            {worker.disponibilidad ? 'Desactivar' : 'Activar'}
          </button>
          <button onClick={() => handleDeleteWorker(worker.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
};

export default WorkerList;