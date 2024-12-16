import { useState, useEffect } from 'react';
import { getIngredientesService } from '@services/ingredientes/getIngredientes.service.js';

const useGetIngredientes = () => {
  const [ingredientes, setIngredientes] = useState([]);

  const fetchIngredientes = async () => {
    try {
      const data = await getIngredientesService();
      setIngredientes(data);
    } catch (error) {
      console.error('Error al obtener los ingredientes:', error);
    }
  };

  useEffect(() => {
    fetchIngredientes();
  }, []);

  return { ingredientes, fetchIngredientes, setIngredientes };
};

export default useGetIngredientes;
