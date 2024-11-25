import { useState, useEffect } from "react";
import { getPlatoById, updatePlato } from "@services/menu.service.js";

export const useUpdatePlato = (id) => {

    const [plato, setPlato] = useState({
        nombre: "",
        ingredientesRequeridos: "",
        valorVenta: "",
    });
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

    const handleChange = (e) => {
        setPlato({
            ...plato,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updatePlato(id, plato);
            setLoading(false);
            setError(null);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    return {
        plato,
        loading,
        error,
        handleChange,
        handleSubmit,
    };
}
