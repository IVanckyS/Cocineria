import useGetIngredientes from '@hooks/inventario/useGetIngredientes';
import { useNavigate } from 'react-router-dom';
import '@styles/inventario/verIngredientes.css';

const VerIngredientesPage = () => {
  const { ingredientes, loading, error } = useGetIngredientes();
  const navigate = useNavigate();

  return (
    <main className="ver-ingredientes-container">
      <h1 className="page-title">Lista de Ingredientes</h1>
      <button className="back-button" onClick={() => navigate('/inventario')}>
        Volver a Gestión de Inventario
      </button>

      {/* Mensajes de carga o error */}
      {loading && <p className="loading-message">Cargando ingredientes...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Tabla de ingredientes */}
      {!loading && !error && ingredientes.length > 0 && (
        <table className="ingredientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Cantidad Disponible</th>
              <th>Unidad de Medida</th>
              <th>Stock Mínimo</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {ingredientes.map((ingrediente) => (
              <tr key={ingrediente.id}>
                <td>{ingrediente.id}</td>
                <td>{ingrediente.nombre}</td>
                <td>{ingrediente.cantidadDisponible}</td>
                <td>{ingrediente.unidadMedida}</td>
                <td>{ingrediente.stockMinimo}</td>
                <td>${ingrediente.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && ingredientes.length === 0 && (
        <p className="no-data-message">No hay ingredientes disponibles.</p>
      )}
    </main>
  );
};

export default VerIngredientesPage;
