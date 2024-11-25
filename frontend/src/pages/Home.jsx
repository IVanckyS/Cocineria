import { Link } from "react-router-dom";
import "@styles/home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a la Intranet</h1>
      <p className="home-subtitle">Selecciona una opción para continuar:</p>
      <div className="home-buttons">
        <Link to="/inventario" className="button inventory-button">
          Gestionar Inventario
        </Link>
      </div>
    </div>
  );
};

export default Home;
