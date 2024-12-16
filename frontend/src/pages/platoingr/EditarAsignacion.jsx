import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "@styles/platoingr/editarAsignacion.css";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert.js";
import { getPlatoIngr, updatePlatoIngr } from "@services/platoingr.service.js"; 

const EditarAsignacion = () => {
  const { platoId, ingredienteId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [cantidadNecesaria, setCantidadNecesaria] = useState("");

  useEffect(() => {
    const loadAsignacion = async () => {
      setLoading(true);
      try {
        // getAsignacionByIds debe devolver { success: true, data: { platoId, ingredienteId, cantidadNecesaria } }
        const response = await getPlatoIngr(platoId, ingredienteId);
        if (response.success && response.data) {
          setCantidadNecesaria(response.data.cantidadNecesaria);
        } else {
         console.error("Error al cargar la asignación:", response.message);
        }
      } catch (error) {
        console.error("Error al cargar la asignación:", error);
        showErrorAlert("Error", "Hubo un problema al cargar la asignación.");
        navigate("/asignacion");
      } finally {
        setLoading(false);
      }
    };

    loadAsignacion();
  }, [platoId, ingredienteId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Actualiza únicamente la cantidadNecesaria
      const { success, message } = await updatePlatoIngr(platoId, ingredienteId, {
        cantidadNecesaria,
      });

      if (success) {
        showSuccessAlert("¡Asignación Actualizada!", "Se actualizó la cantidad necesaria correctamente.");
        navigate("/asignacion"); // Ruta donde se listan todas las asignaciones
      } else {
        showErrorAlert("Error al Actualizar", message || "Ocurrió un problema al actualizar la asignación.");
      }
    } catch (error) {
      console.error("Error al actualizar asignación:", error);
      showErrorAlert("Error", "Hubo un problema inesperado al actualizar la asignación.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading-text">Cargando datos de la asignación...</p>;

  return (
    <div className="editar-asignacion-container">
      <h1 className="editar-asignacion-title">Editar Cantidad Necesaria</h1>
      <Link to="/gestion-asignaciones" className="button back-button">
              Regresar
            </Link>
      <form onSubmit={handleSubmit} className="editar-asignacion-form">
        {/* IDs mostrados como referencia, pero no editables */}
        <div className="form-group">
          <label>Plato ID:</label>
          <input type="text" value={platoId} disabled />
        </div>
        <div className="form-group">
          <label>Ingrediente ID:</label>
          <input type="text" value={ingredienteId} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="cantidadNecesaria">Cantidad Necesaria:</label>
          <input
            type="number"
            id="cantidadNecesaria"
            name="cantidadNecesaria"
            value={cantidadNecesaria}
            onChange={(e) => setCantidadNecesaria(e.target.value)}
            required
            min={0}
          />
        </div>

        <button type="submit" className="button update-button" disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar"}
        </button>
      </form>
    </div>
  );
};

export default EditarAsignacion;
