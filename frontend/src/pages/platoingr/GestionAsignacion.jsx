import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "@styles/platoingr/gestionAsignacion.css";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";
import { getPlatoIngr, deletePlatoIngr } from "@services/platoingr.service.js";
import { getPlatos } from "@services/menu.service.js";

const GestionAsignacion = () => {
    const [asignaciones, setAsignaciones] = useState([]);
    const [platos, setPlatos] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const asignacionesData = await getPlatoIngr(); // Retorna array con { platoId, ingredienteId, cantidadNecesaria, ... }
          const platosData = await getPlatos(); // Retorna array con { id, nombrePlato, ... }
          setAsignaciones(asignacionesData || []);
          setPlatos(platosData || []);
        } catch (error) {
          console.error("Error al obtener asignaciones o platos:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);

    // Crear un diccionario { platoId => nombrePlato }
    const platoMap = {};
    platos.forEach(plato => {
      platoMap[plato.id] = plato.nombrePlato;
    });
  
    // Combinar información: Asignaciones con nombre del plato
    const asignacionesConNombre = asignaciones.map(asig => {
      return {
        ...asig,
        nombrePlato: platoMap[asig.platoId] || "Desconocido", // Fallback si no existe
      };
    });

    const handleDelete = async (platoId, ingredienteId) => {
        try {
          // Llama el servicio para eliminar la asignación
          await deletePlatoIngr(platoId, ingredienteId);
            showSuccessAlert("¡Asignación Eliminada!", "La asignación se eliminó correctamente.");
            // Actualiza el estado filtrando la asignación eliminada
            setAsignaciones(asignaciones.filter(
              (asig) => !(asig.platoId === platoId && asig.ingredienteId === ingredienteId)
            ));
        } catch (error) {
          console.error("Error al eliminar asignación:", error);
          showErrorAlert("Error", "Ocurrió un problema inesperado al eliminar la asignación.");
        }
      };
    
  
    if (loading) return <p>Cargando datos...</p>;
  
    return (
      <div className="asignacion-container">
        <h1 className="asignacion-title">Gestión de Asignaciones</h1>
        <Link to="/menu" className="button back-button">
        Regresar
      </Link>
      <Link to="/crear-asignacion" className="button create-button">
        Asignar
      </Link>
        {asignacionesConNombre.length === 0 ? (
          <p>No hay asignaciones disponibles.</p>
        ) : (
          <div className="asignacion-list">
            {asignacionesConNombre.map((asignacion, index) => (
              <div key={index} className="asignacion-card">
                <p><strong>Plato ID:</strong> {asignacion.platoId}</p>
                <p><strong>Ingrediente ID:</strong> {asignacion.ingredienteId}</p>
                <p><strong>Cantidad necesaria:</strong> {asignacion.cantidadNecesaria}</p>
                <p><strong>Nombre del plato:</strong> {asignacion.nombrePlato}</p>
                <p><strong>Ingrediente:</strong> {asignacion.ingrediente}</p>
                <div className="asignacion-card-buttons">
                <Link
                  className="button update-button"
                  to={`/editar-asignacion/${asignacion.platoId}/${asignacion.ingredienteId}`}
                >
                  Actualizar
                </Link>
                <button
                  className="button delete-button"
                  onClick={() => handleDelete(asignacion.platoId, asignacion.ingredienteId)}
                >
                  Eliminar
                </button>
              </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default GestionAsignacion;