import  { useState } from "react";
import useGetIngredientes from "@hooks/inventario/useGetIngredientes";
import EditIngredientePopup from "@components/EditIngredientePopup";
import { deleteIngredienteService } from "@services/ingredientes/deleteIngrediente.service";
import "@styles/inventario/verIngredientes.css";
import { deleteDataAlert, showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert.js";

const VerIngredientesPage = () => {
  const { ingredientes, fetchIngredientes, setIngredientes } = useGetIngredientes();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedIngrediente, setSelectedIngrediente] = useState(null);

  const handleEditClick = (ingrediente) => {
    setSelectedIngrediente([ingrediente]); // Carga los datos del ingrediente seleccionado
    setIsPopupOpen(true); // Abre el popup
  };

  const handleDelete = async (id) => {
    const result = await deleteDataAlert();
    if (result.isConfirmed) {
      try {
        await deleteIngredienteService(id);
        showSuccessAlert("¡Eliminado!", `Ingrediente con ID ${id} eliminado.`);
        fetchIngredientes();
      } catch (err) {
        console.error(err);
        showErrorAlert("Error", "No se pudo eliminar el ingrediente.");
      }
    }
  };

  const handleUpdate = (updatedIngrediente) => {
    setIngredientes((prev) =>
      prev.map((ingrediente) =>
        ingrediente.id === updatedIngrediente.id ? updatedIngrediente : ingrediente
      )
    );
    fetchIngredientes(); // Recarga los ingredientes
  };

  return (
    <main className="ver-ingredientes-container">
      <h1>Lista de Ingredientes</h1>
      <table className="ingredientes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Stock Mínimo</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map((ingrediente) => (
            <tr key={ingrediente.id}>
              <td>{ingrediente.id}</td>
              <td>{ingrediente.nombre}</td>
              <td>{ingrediente.cantidadDisponible}</td>
              <td>{ingrediente.unidadMedida}</td>
              <td>{ingrediente.stockMinimo}</td>
              <td>${ingrediente.precio}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(ingrediente)}
                >
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(ingrediente.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditIngredientePopup
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        data={selectedIngrediente}
        onSubmit={handleUpdate}
      />
    </main>
  );
};

export default VerIngredientesPage;
