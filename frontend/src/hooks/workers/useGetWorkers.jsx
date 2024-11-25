// src/hooks/workers/useGetWorkers.jsx
import { useState, useEffect } from 'react';
import { getAllWorkers } from '@services/worker.service.js';

const useGetWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const data = await getAllWorkers();
      console.log(data); 
      setWorkers(data); 
    } catch (err) {
      console.error('Error al obtener trabajadores:', err); 
      setError(err); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return { workers, loading, error, fetchWorkers };
};

export default useGetWorkers;