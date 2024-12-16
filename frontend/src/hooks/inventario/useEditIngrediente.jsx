import { useState } from "react";
import { editIngrediente } from "@services/ingredientes/editIngrediente.service";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";

const useEditIngrediente = (setIngredientes) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dataIngrediente, setDataIngrediente] = useState(null);

  // Función para manejar el clic en el botón Editar
  const handleClickUpdate = (ingrediente) => {
    setDataIngrediente(ingrediente); // Guarda el ingrediente seleccionado
    setIsPopupOpen(true); // Abre el popup
  };

  // Función para manejar la actualización de un ingrediente
  const handleUpdate = async (updatedData) => {
    try {
      const updatedIngrediente = await editIngrediente(
        updatedData,
        updatedData.id
      );

      showSuccessAlert("¡Actualizado!", "El ingrediente ha sido actualizado.");
      setIsPopupOpen(false);

      setIngredientes((prev) =>
        prev.map((ingrediente) =>
          ingrediente.id === updatedIngrediente.id
            ? updatedIngrediente
            : ingrediente
        )
      );
    } catch (error) {
      console.error("Error al actualizar el ingrediente:", error);
      showErrorAlert("Error", "No se pudo actualizar el ingrediente.");
    }
  };

  return {
    handleUpdate,
    handleClickUpdate, // Exportamos la función
    isPopupOpen,
    setIsPopupOpen,
    dataIngrediente,
    setDataIngrediente,
  };
};

export default useEditIngrediente;
