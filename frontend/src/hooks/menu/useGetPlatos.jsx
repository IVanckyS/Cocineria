import { useState, useEffect } from "react";
import { getPlatos } from "@services/menu.service.js";

export const useGetPlatos = () => {

    const [platos, setPlatos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlatos = async () => {
            setLoading(true);
            try {
                const data = await getPlatos();
                setPlatos(data);
                setLoading(false);
                setError(null);
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        };
        fetchPlatos();
    }, []);

    return {
        platos,
        loading,
        error,
    };
}