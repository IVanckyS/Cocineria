import { useState } from 'react';
import { getIngredienteByIdService } from '@services/ingredientes/getIngredienteById.service.js';

const useGetIngredienteById = () => {
  const [ingrediente, setIngrediente] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIngredienteById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { success, data, message } = await getIngredienteByIdService(id);
      if (success) {
        setIngrediente(data);
      } else {
        setError(message);
      }
    } catch (error) { // Renombramos `fetchError` a `error`
      console.error('Error al cargar el ingrediente:', error); // Ahora el error se registra en consola
      setError('Error al cargar el ingrediente.');
    } finally {
      setLoading(false);
    }
  };

  return { ingrediente, loading, error, fetchIngredienteById };
};

export default useGetIngredienteById;
