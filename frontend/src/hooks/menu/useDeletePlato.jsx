import { useState, useEffect } from "react";
import { deletePlato } from "@services/menu.service.js";

export const useDeletePlato = (id) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDeletePlato = async () => {
            setLoading(true);
            try {
                await deletePlato(id);
                setLoading(false);
                setError(null);
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        };
        fetchDeletePlato();
    }, [id]);

    return {
        loading,
        error,
    };
}
