import { useState } from 'react';
import useDeleteIngrediente from '@hooks/inventario/useDeleteIngrediente';
import '@styles/inventario/eliminarIngrediente.css';

const EliminarIngredientePage = () => {
  const { handleDelete } = useDeleteIngrediente();
  const [deleteId, setDeleteId] = useState('');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setDeleteId(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await handleDelete(deleteId)) {
      setDeleteId(''); // Limpiar el campo si se elimina con éxito
    }
  };

  return (
    <main className="container">
      <h1 className="page-title">Eliminar Ingrediente</h1>
      <form onSubmit={handleSubmit} className="delete-form">
        <div className="form-group">
          <label htmlFor="deleteId">ID del Ingrediente:</label>
          <input
            type="number"
            id="deleteId"
            name="deleteId"
            value={deleteId}
            onChange={handleInputChange}
            placeholder="Ej. 3"
            required
            min="1"
          />
        </div>
        <button type="submit" className="delete-button">Eliminar</button>
      </form>
    </main>
  );
};

export default EliminarIngredientePage;
