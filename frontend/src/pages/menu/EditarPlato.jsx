import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "@styles/menu/editarPlato.css";
import { getPlatoById, updatePlato } from "@services/menu.service.js";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert.js";

const EditarPlatoPage = () => {
  const { id } = useParams();          // Captura el ID desde la URL: /menu/editar-plato/:id
  const navigate = useNavigate();      // Para redirigir al usuario después de actualizar
  const [loading, setLoading] = useState(false);
  const [plato, setPlato] = useState({
    nombrePlato: "",
    ingredientesRequeridos: "",
    valorVenta: 0,
  });

  useEffect(() => {
    const loadPlato = async () => {
      setLoading(true);
      try {
        const response = await getPlatoById(id); 
        // Estructura: { data: { id, nombrePlato, ... } }
  
        const platoData = response.data; 
        // platoData = { id: 11, nombrePlato: "Segunda prueba", valorVenta: "10000", ... }
        console.log(platoData);
        if (platoData) {
          setPlato({
            nombrePlato: platoData.nombrePlato,
            ingredientesRequeridos: platoData.ingredientesRequeridos,
            valorVenta: platoData.valorVenta
          });
        } else {
          console.error("No se encontró el plato con ID:", id);
        }
      } catch (error) {
        console.error("Error al cargar el plato:", error);
        showErrorAlert("Error", "Hubo un problema al cargar el plato.");
        navigate("/menu/gestion-platos");
      } finally {
        setLoading(false);
      }
    };
  
    loadPlato();
  }, [id, navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlato({ ...plato, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updatePlato(id, plato);
      if (response) {
        showSuccessAlert("¡Plato Actualizado!", "El plato se actualizó correctamente.");
      } else {
        showErrorAlert("Error al Actualizar", "Ocurrió un problema al actualizar.");
      }
    } catch (error) {
      console.error("Error al actualizar plato:", error);
      showErrorAlert("Error", "Hubo un problema inesperado al actualizar el plato.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editar-plato-container">
      <h1 className="editar-plato-title">Editar Plato</h1>
      <Link to="/menu/gestion-platos" className="button back-button">
              Regresar
        </Link>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <form onSubmit={handleSubmit} className="editar-plato-form">
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

          <button type="submit" className="button update-button" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditarPlatoPage;
