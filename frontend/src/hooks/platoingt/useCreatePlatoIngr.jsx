import { useState } from "react";
import { createPlatoIngr } from "@services/platoingr.service.js";
import { showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert.js";

export const useCreatePlatoIngr = () => {
    const [loading, setLoading] = useState(false);

    const handleCreatePlatoIngr = async (data) => {
        setLoading(true);
        try {
            const { success, message } = await createPlatoIngr(data);

            if (success) {
                showSuccessAlert(
                    "¡Ingrediente Asignado!",
                    "El ingrediente se asignó correctamente al plato."
                );
                return true;
            } else {
                showErrorAlert(
                    "Error al Asignar Ingrediente",
                    message || "Ocurrió un problema durante la asignación."
                );
                return false;
            }
        } catch (error) {
            console.error("Error en handleCreatePlatoIngr:", error);
            showErrorAlert(
                "Error",
                "Hubo un problema inesperado al intentar asignar el ingrediente."
            );
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { handleCreatePlatoIngr, loading };
}