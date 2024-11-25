import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useEditIngrediente from '@hooks/inventario/useEditIngrediente';
import useGetIngredienteById from '@hooks/inventario/useGetIngredienteById';
import '@styles/inventario/editarIngrediente.css';

const EditarIngredientePage = () => {
  const { id } = useParams(); // Obtener ID del ingrediente desde la URL
  const navigate = useNavigate();
  const { ingrediente, fetchIngredienteById, loading: loadingIngrediente } = useGetIngredienteById();
  const { handleEditIngrediente, loading: loadingEdit } = useEditIngrediente();

  const [formData, setFormData] = useState({
    nombre: '',
    cantidadDisponible: '',
    unidadMedida: '',
    stockMinimo: '',
    precio: '',
  });

  useEffect(() => {
    fetchIngredienteById(id);
  }, [id, fetchIngredienteById]);

  useEffect(() => {
    if (ingrediente) {
      setFormData({
        nombre: ingrediente.nombre,
        cantidadDisponible: ingrediente.cantidadDisponible,
        unidadMedida: ingrediente.unidadMedida,
        stockMinimo: ingrediente.stockMinimo,
        precio: ingrediente.precio,
      });
    }
  }, [ingrediente]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleEditIngrediente(id, formData);
    if (success) {
      navigate('/inventario');
    }
  };

  if (loadingIngrediente) {
    return <p>Cargando ingrediente...</p>;
  }

  return (
    <main className="container">
      <h1 className="page-title">Editar Ingrediente</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="unidadMedida">Unidad de Medida:</label>
          <input
            type="text"
            id="unidadMedida"
            name="unidadMedida"
            value={formData.unidadMedida}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stockMinimo">Stock Mínimo:</label>
          <input
            type="number"
            id="stockMinimo"
            name="stockMinimo"
            value={formData.stockMinimo}
            onChange={handleInputChange}
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
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loadingEdit}>
          {loadingEdit ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </main>
  );
};

export default EditarIngredientePage;
