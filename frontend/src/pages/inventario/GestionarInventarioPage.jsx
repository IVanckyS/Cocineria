import { Link } from "react-router-dom";
import "@styles/inventario/gestionarInventario.css";

const GestionarInventarioPage = () => {
  return (
    <div className="inventario-container">
      <h1 className="inventario-title">Gestión de Inventario</h1>
      <p className="inventario-subtitle">Selecciona una opción:</p>
      <div className="inventario-buttons">
        <Link to="/inventario/crear" className="button create-button">
          Crear Ingrediente
        </Link>
        <Link to="/inventario/ver" className="button view-button">
          Ver Ingredientes
        </Link>
        <Link to="/inventario/eliminar" className="button delete-button">
          Eliminar Ingrediente
        </Link>
        <Link to="/inventario/ver-uno" className="button single-view-button">
          Ver Ingrediente por ID
        </Link>
        <Link to="/inventario/editar" className="button edit-button">
          Editar Ingrediente
        </Link>
        <Link to="/reportes" className="button report-button">
          Generar Reportes
        </Link>
      </div>
    </div>
  );
};

export default GestionarInventarioPage;
