import { useState, useCallback } from "react";
import { getDisponibilidad } from "@services/menu.service.js";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert.js";


const useGetDisponibilidad = () => {
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchDisponibilidad = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDisponibilidad();

      if (data && data.length > 0) {
        setDisponibilidad(data);
        showSuccessAlert("Disponibilidad Verificada", "La disponibilidad de los platos se verificó correctamente.");
      } else {
        showErrorAlert("Sin Datos", "No se encontraron platos disponibles en este momento.");
      }
    } catch (error) {
      console.error("Error en handleFetchDisponibilidad:", error);
      showErrorAlert("Error al Verificar Disponibilidad", "Hubo un problema al intentar verificar la disponibilidad de los platos.");
    } finally {
      setLoading(false);
    }
  }, []); 

  return { disponibilidad, loading, handleFetchDisponibilidad };
};

export default useGetDisponibilidad;