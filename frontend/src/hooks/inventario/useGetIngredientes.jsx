import { useState, useEffect } from 'react';
import { getIngredientesService } from '@services/ingredientes/getIngredientes.service.js';

const useGetIngredientes = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIngredientes = async () => {
    setLoading(true);
    try {
      const { success, data, message } = await getIngredientesService();
      if (success) {
        setIngredientes(data);
      } else {
        setError(message);
      }
    } catch {
      setError('Error al cargar los ingredientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredientes();
  }, []);

  return { ingredientes, loading, error, fetchIngredientes };
};

export default useGetIngredientes;
