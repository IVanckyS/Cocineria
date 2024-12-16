import PropTypes from "prop-types";
import IngredienteForm from "./IngredienteForm";
import "@styles/inventario/popupingrediente.css";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";

const EditIngredientePopup = ({ show, setShow, data, onSubmit }) => {
  if (!show || !data) return null;

  const handleFormSubmit = async (formData) => {
    console.log("Datos del formulario recibidos:", formData);

    // Convertir valores numéricos al tipo correcto
    const updatedData = {
      ...data,
      ...formData,
      cantidad: Number(formData.cantidad), // Convertir a número
      stockMinimo: Number(formData.stockMinimo), // Convertir a número
      precio: parseFloat(formData.precio), // Convertir a número flotante
    };

    try {
      // Validación de campos
      if (
        !updatedData.nombre.trim() || // Validar nombre no vacío
        isNaN(updatedData.cantidad) || updatedData.cantidad <= 0 ||
        isNaN(updatedData.stockMinimo) || updatedData.stockMinimo < 0 ||
        isNaN(updatedData.precio) || updatedData.precio < 0
      ) {
        showErrorAlert("Error", "Por favor completa todos los campos correctamente.");
        return;
      }

      console.log("Enviando datos al backend:", updatedData);
      await onSubmit(updatedData); // Llama a la función onSubmit

      showSuccessAlert("¡Éxito!", "El ingrediente se ha actualizado correctamente.");
      setShow(false); // Cierra el popup solo si todo salió bien
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      showErrorAlert("Error", "Hubo un problema al actualizar el ingrediente.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        {/* Botón para cerrar el popup */}
        <button className="close-button" onClick={() => setShow(false)}>
          &#10006;
        </button>

        {/* Título del popup */}
        <h2 className="popup-title">Editar Ingrediente</h2>

        {/* Formulario del ingrediente */}
        <IngredienteForm
          initialData={data}
          onSubmit={handleFormSubmit}
          buttonText="Guardar Cambios"
        />
      </div>
    </div>
  );
};

EditIngredientePopup.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditIngredientePopup;
