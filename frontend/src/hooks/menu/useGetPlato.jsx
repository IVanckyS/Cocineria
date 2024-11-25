import { useState, useEffect } from "react";
import { getPlatoById } from "@services/menu.service.js";

export const useGetPlato = (id) => {

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

    return {
        plato,
        loading,
        error,
    };
}