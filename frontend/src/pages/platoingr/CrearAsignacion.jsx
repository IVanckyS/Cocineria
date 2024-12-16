import { useState } from "react";
import { Link } from "react-router-dom";
import "@styles/platoingr/crearAsignacion.css";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert.js";
import { createPlatoIngr } from "@services/platoingr.service.js";

const CrearAsignacion = () => {
  const [loading, setLoading] = useState(false);

  // Estado local para capturar los datos de la asignación
  const [formData, setFormData] = useState({
    platoId: "",
    ingredienteId: "",
    cantidadNecesaria: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Llama la función createPlatoIngr para crear la asignación
      await createPlatoIngr({
        platoId: formData.platoId,
        ingredienteId: formData.ingredienteId,
        cantidadNecesaria: formData.cantidadNecesaria,
      });
        showSuccessAlert("¡Asignación Creada!", "Se asignó el ingrediente al plato correctamente.")
    } catch (error) {
      console.error("Error al crear la asignación:", error);
      showErrorAlert("Error", "Hubo un problema inesperado al crear la asignación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="crear-asignacion-container">
      <h1 className="crear-asignacion-title">Asignar un ingrediente</h1>
      <Link to="/gestion-asignaciones" className="button back-button">
              Regresar
        </Link>
      <form onSubmit={handleSubmit} className="crear-asignacion-form">
        <div className="form-group">
          <label htmlFor="platoId">Plato ID:</label>
          <input
            type="number"
            id="platoId"
            name="platoId"
            value={formData.platoId}
            onChange={handleChange}
            required
            min={1}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredienteId">Ingrediente ID:</label>
          <input
            type="number"
            id="ingredienteId"
            name="ingredienteId"
            value={formData.ingredienteId}
            onChange={handleChange}
            required
            min={1}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cantidadNecesaria">Cantidad Necesaria:</label>
          <input
            type="number"
            id="cantidadNecesaria"
            name="cantidadNecesaria"
            value={formData.cantidadNecesaria}
            onChange={handleChange}
            required
            min={1}
          />
        </div>

        <button type="submit" className="button create-button" disabled={loading}>
          {loading ? "Creando..." : "Crear Asignación"}
        </button>
      </form>
    </div>
  );
};

export default CrearAsignacion;
