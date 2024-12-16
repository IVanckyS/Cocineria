import { Link } from "react-router-dom";
import "@styles/inventario/gestionarInventario.css";

const GestionarInventarioPage = () => {
  return (
    <div className="inventario-container">
      <div className="inventario-title-container">
        <h1 className="inventario-title">Gestión de Inventario</h1>
        <p className="inventario-subtitle">Selecciona una opción:</p>
      </div>
      <div className="inventario-buttons-container">
        <div className="inventario-buttons">
          <Link to="/inventario/crear" className="button create-button">
            Crear Ingrediente
          </Link>
          <Link to="/inventario/ver" className="button view-button">
            Ver Ingredientes
          </Link>
          <Link to="/inventario/generar-reporte" className="button report-button">
             Generar Reportes
          </Link>

        </div>
      </div>
    </div>
  );
};

export default GestionarInventarioPage;
