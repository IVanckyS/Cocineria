import { useState } from 'react';
import useGetIngredienteById from '@hooks/inventario/useGetIngredienteById';
import '@styles/inventario/verIngrediente.css';

const VerIngredientePage = () => {
  const [inputId, setInputId] = useState('');
  const { ingrediente, loading, error, fetchIngredienteById } = useGetIngredienteById();

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setInputId(value);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputId) {
      fetchIngredienteById(inputId);
    } else {
      alert('Por favor, ingresa un ID válido.');
    }
  };

  return (
    <div className="ver-ingrediente-container">
      <h1 className="page-title">Buscar Ingrediente por ID</h1>
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label htmlFor="id">ID del Ingrediente:</label>
          <input
            type="number"
            id="id"
            name="id"
            value={inputId}
            onChange={handleInputChange}
            placeholder="Ej. 3"
            required
          />
        </div>
        <button type="submit" className="search-button">Buscar</button>
      </form>

      {loading && <p className="loading-message">Cargando ingrediente...</p>}
      {error && <p className="error-message">{error}</p>}
      {ingrediente && (
        <div className="ingrediente-details">
          <h2>Detalles del Ingrediente</h2>
          <p><strong>ID:</strong> {ingrediente.id}</p>
          <p><strong>Nombre:</strong> {ingrediente.nombre}</p>
          <p><strong>Cantidad Disponible:</strong> {ingrediente.cantidadDisponible}</p>
          <p><strong>Unidad de Medida:</strong> {ingrediente.unidadMedida}</p>
          <p><strong>Stock Mínimo:</strong> {ingrediente.stockMinimo}</p>
          <p><strong>Precio:</strong> ${ingrediente.precio}</p>
        </div>
      )}
    </div>
  );
};

export default VerIngredientePage;
