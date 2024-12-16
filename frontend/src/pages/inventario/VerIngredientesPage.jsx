import { useState } from "react";
import useGetIngredientes from "@hooks/inventario/useGetIngredientes";
import useEditIngrediente from "@hooks/inventario/useEditIngrediente";
import EditIngredientePopup from "@components/EditIngredientePopup";
import { deleteIngredienteService } from "@services/ingredientes/deleteIngrediente.service";
import "@styles/inventario/verIngredientes.css";
import {
  deleteDataAlert,
  showSuccessAlert,
  showErrorAlert,
} from "@helpers/sweetAlert.js";

const VerIngredientesPage = () => {
  const { ingredientes, fetchIngredientes, setIngredientes } = useGetIngredientes();
  const {
    handleUpdate,
    handleClickUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataIngrediente,
  } = useEditIngrediente(setIngredientes);

  const [searchId, setSearchId] = useState("");

  const handleSearch = (e) => setSearchId(e.target.value);

  const filteredIngredientes = searchId
    ? ingredientes.filter((ingrediente) =>
        ingrediente.id.toString().includes(searchId)
      )
    : ingredientes;

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

  return (
    <main className="ver-ingredientes-container">
      <h1 className="page-title">Lista de Ingredientes</h1>

      <div className="search-container">
        <label htmlFor="search-id">Buscar por ID:</label>
        <input
          type="number"
          id="search-id"
          value={searchId}
          onChange={handleSearch}
          placeholder="Ingresa un ID"
          className="search-input"
        />
      </div>

      <table className="ingredientes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Stock Mínimo</th>
            <th>Precio</th>
            <th>Fecha de Creación</th>
            <th>Última Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredIngredientes.map((ingrediente) => (
            <tr key={ingrediente.id}>
              <td>{ingrediente.id}</td>
              <td>{ingrediente.nombre}</td>
              <td>{ingrediente.cantidadDisponible}</td>
              <td>{ingrediente.unidadMedida}</td>
              <td>{ingrediente.stockMinimo}</td>
              <td>${parseFloat(ingrediente.precio).toFixed(2)}</td>
              <td>{ingrediente.createdAt || "N/A"}</td>
              <td>{ingrediente.updatedAt || "N/A"}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleClickUpdate(ingrediente)}
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

      {filteredIngredientes.length === 0 && (
        <p className="no-data-message">No se encontraron ingredientes.</p>
      )}

      <EditIngredientePopup
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        data={dataIngrediente}
        onSubmit={handleUpdate}
      />
    </main>
  );
};

export default VerIngredientesPage;
