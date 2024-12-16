import { useState } from "react";
import { updatePlatoIngr } from "@services/platoingr.service.js";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert.js";

export const useUpdatePlatoIngr = () => {

    const [loading, setLoading] = useState(false);

    const handleUpdatePlatoIngr = async (id, data) => {
        setLoading(true);
        try {
            const { success, message } = await updatePlatoIngr(id, data);

            if (success) {
                showSuccessAlert(
                    "¡Ingrediente Actualizado!",
                    "El ingrediente se actualizó correctamente en el plato."
                );
                return true;
            } else {
                showErrorAlert(
                    "Error al Actualizar Ingrediente",
                    message || "Ocurrió un problema durante la actualización."
                );
                return false;
            }
        } catch (error) {
            console.error("Error en handleUpdatePlatoIngr:", error);
            showErrorAlert(
                "Error",
                "Hubo un problema inesperado al intentar actualizar el ingrediente."
            );
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdatePlatoIngr, loading };
}