import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "@styles/form.css";

const IngredienteForm = ({ initialData, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    cantidadDisponible: "",
    unidadMedida: "",
    stockMinimo: "",
    precio: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || "",
        cantidadDisponible: initialData.cantidadDisponible || "",
        unidadMedida: initialData.unidadMedida || "",
        stockMinimo: initialData.stockMinimo || "",
        precio: initialData.precio || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="ingrediente-form">
      <label>
        Nombre:
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
      </label>
      <label>
        Cantidad Disponible:
        <input
          type="number"
          name="cantidadDisponible"
          value={formData.cantidadDisponible}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Unidad de Medida:
        <select
          name="unidadMedida"
          value={formData.unidadMedida}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar</option>
          <option value="kg">Kg</option>
          <option value="litros">Litros</option>
        </select>
      </label>
      <label>
        Stock Mínimo:
        <input
          type="number"
          name="stockMinimo"
          value={formData.stockMinimo}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Precio:
        <input
          type="number"
          step="0.01"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">{buttonText}</button>
    </form>
  );
};

IngredienteForm.propTypes = {
  initialData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default IngredienteForm;
