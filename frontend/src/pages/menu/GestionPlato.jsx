import { Link } from "react-router-dom";
import { useEffect } from "react";
import "@styles/menu/platoGestion.css";
import useGetDisponibilidad from "@hooks/menu/useGetDisponibilidad.jsx";
import { deletePlato } from "@services/menu.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";

const PlatoGestionPage = () => {
  const { disponibilidad, loading, handleFetchDisponibilidad } = useGetDisponibilidad();

  useEffect(() => {
    handleFetchDisponibilidad();
  }, [handleFetchDisponibilidad]);

  const handleDelete = async (id) => {
    try {
        await deletePlato(id);
        showSuccessAlert("¡Plato Eliminado!", "El plato se eliminó correctamente del sistema.");
        handleFetchDisponibilidad(); // Refrescar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar el plato:", error);
      showErrorAlert("Error", "Hubo un problema inesperado al intentar eliminar el plato.");
    }
  };

  return (
    <div className="plato-management-container">
      <h1 className="plato-management-title">Gestión de Platos</h1>
      <Link to="/menu" className="button back-button">
        Regresar
      </Link>
      <Link to="/menu/crear-plato" className="button create-button">
        Ingresar Plato
      </Link>
      {loading ? (
        <p>Cargando disponibilidad de platos...</p>
      ) : disponibilidad.length > 0 ? (
        <div className="plato-card-container">
          {disponibilidad.map((plato) => (
            <div key={plato.id} className="plato-card">
              <h2 className="plato-card-title">{plato.nombrePlato}</h2>
              <p>
                <strong>ID:</strong> {plato.id}
              </p>
              <p>
                <strong>Ingredientes:</strong> {plato.ingredientesRequeridos || "No especificados"}
              </p>
              <p>
                <strong>Valor de Venta: </strong> 
                ${Number(plato.valorVenta ?? 0).toFixed(0)} CLP
               </p>
              <p>
                <strong>Disponibilidad:</strong> {plato.disponible ? "Disponible" : "No disponible"}
              </p>
              <div className="plato-card-buttons">
                <Link to={`/menu/editar-plato/${plato.id}`} className="button update-button">
                  Actualizar
                </Link>
                <button className="button delete-button" onClick={() => handleDelete(plato.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay platos disponibles en este momento.</p>
      )}
    </div>
  );
};

export default PlatoGestionPage;
