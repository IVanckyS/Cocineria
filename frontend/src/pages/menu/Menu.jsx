import { Link } from "react-router-dom";
import "@styles/menu/gestionMenu.css"; 

const Menu = () => {
  return (
    <div className="menu-container">
      <div className="menu-title-container">
        <h1 className="menu-title">Gestión del Menú</h1>
        <p className="menu-subtitle">Selecciona una opción:</p>
      </div>
      <div className="menu-buttons-container">
        <div className="menu-buttons">
          <Link to="/menu/gestion-platos" className="button platos-button">
            Gestión de Platos
          </Link>
          <Link to="/gestion-asignaciones" className="button asignaciones-button">
            Gestión de Asignaciones
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;