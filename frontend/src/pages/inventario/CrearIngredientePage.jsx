import { useNavigate } from "react-router-dom";
import useCreateIngrediente from "@hooks/inventario/useCreateIngrediente";
import "@styles/inventario/crearIngrediente.css";
import { useState } from "react";

const CrearIngredientePage = () => {
  const navigate = useNavigate();
  const { handleCreate } = useCreateIngrediente();

  const [formData, setFormData] = useState({
    nombre: "",
    cantidadDisponible: "",
    unidadMedida: "",
    stockMinimo: "",
    precio: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleCreate(formData);
    if (success) {
      navigate("/inventario");
    }
  };

  return (
    <main className="crear-ingrediente-container">
      <h1>Crear Ingrediente</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Ej. Tomate"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cantidadDisponible">Cantidad Disponible:</label>
          <input
            type="number"
            id="cantidadDisponible"
            name="cantidadDisponible"
            value={formData.cantidadDisponible}
            onChange={handleInputChange}
            placeholder="Ej. 100"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="unidadMedida">Unidad de Medida:</label>
          <select
            id="unidadMedida"
            name="unidadMedida"
            value={formData.unidadMedida}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Selecciona una unidad
            </option>
            <option value="kg">kg</option>
            <option value="litros">litros</option>
            <option value="gramos">gramos</option>
            <option value="mililitros">mililitros</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="stockMinimo">Stock Mínimo:</label>
          <input
            type="number"
            id="stockMinimo"
            name="stockMinimo"
            value={formData.stockMinimo}
            onChange={handleInputChange}
            placeholder="Ej. 10"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
            placeholder="Ej. 20"
            required
          />
        </div>
        <button type="submit" className="submit-button">Crear</button>
      </form>
      <button onClick={() => navigate("/inventario")} className="back-button">
        Volver a Gestión de Inventario
      </button>
    </main>
  );
};

export default CrearIngredientePage;
