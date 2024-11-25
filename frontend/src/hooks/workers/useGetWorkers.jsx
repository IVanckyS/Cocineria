import { useState, useEffect } from 'react';
import { getAllWorkers } from '@services/worker.service.js';

const useGetWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkers = async () => {
    try {
      const data = await getAllWorkers();
      setWorkers(data);
    } catch (err) {
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