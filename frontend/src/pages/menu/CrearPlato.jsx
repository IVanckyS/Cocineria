import { Link } from "react-router-dom";
import { useState } from "react";
import "@styles/menu/crearPlato.css";
import { createPlato } from "@services/menu.service.js";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert.js";

const CrearPlato = () => {
  const [loading, setLoading] = useState(false);
  const [plato, setPlato] = useState({
    nombrePlato: "",
    ingredientesRequeridos: "",
    valorVenta: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlato((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await createPlato(plato);
        showSuccessAlert("¡Plato Creado!", "El plato se creó correctamente.");

    } catch (error) {
      console.error("Error al crear plato:", error);
      showErrorAlert("Error", "Hubo un problema inesperado al crear el plato.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crear-plato-container">
      <h1 className="crear-plato-title">Crear Plato</h1>
      <Link to="/menu/gestion-platos" className="button back-button">
                    Regresar
        </Link>
      <form onSubmit={handleSubmit} className="crear-plato-form">
        <div className="form-group">
          <label htmlFor="nombrePlato">Nombre del Plato:</label>
          <input
            type="text"
            id="nombrePlato"
            name="nombrePlato"
            value={plato.nombrePlato}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredientesRequeridos">Ingredientes Requeridos:</label>
          <input
            type="text"
            id="ingredientesRequeridos"
            name="ingredientesRequeridos"
            value={plato.ingredientesRequeridos}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="valorVenta">Valor de Venta:</label>
          <input
            type="number"
            id="valorVenta"
            name="valorVenta"
            value={plato.valorVenta}
            onChange={handleChange}
            required
            min={0}
            step={0.01}
          />
        </div>

        <button type="submit" className="button create-button" disabled={loading}>
          {loading ? "Creando..." : "Crear Plato"}
        </button>
      </form>
    </div>
  );
};

export default CrearPlato;
