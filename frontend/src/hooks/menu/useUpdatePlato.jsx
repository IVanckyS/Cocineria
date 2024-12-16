import { useState, useEffect } from "react";
import { getPlatoById, updatePlato } from "@services/menu.service.js";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert.js";

export const useUpdatePlato = (id) => {
    const [plato, setPlato] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlato = async () => {
            setLoading(true);
            try {
                const data = await getPlatoById(id);
                setPlato(data);
                setLoading(false);
                setError(null);
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        };
        fetchPlato();
    }, [id]);

    const handleUpdatePlato = async (data) => {
        setLoading(true);
        try {
            const { success, message } = await updatePlato(id, data);

            if (success) {
                showSuccessAlert(
                    "¡Plato Actualizado!",
                    "El plato se actualizó correctamente en el sistema."
                );
                return true;
            } else {
                showErrorAlert(
                    "Error al Actualizar Plato",
                    message || "Ocurrió un problema durante la actualización."
                );
                return false;
            }
        } catch (error) {
            console.error("Error en handleUpdatePlato:", error);
            showErrorAlert(
                "Error",
                "Hubo un problema inesperado al intentar actualizar el plato."
            );
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { plato, loading, error, handleUpdatePlato };
}