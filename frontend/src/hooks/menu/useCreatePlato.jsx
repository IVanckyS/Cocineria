import { useState } from "react";
import { createPlato } from "@services/menu.service.js";

export const useCreatePlato = () => {

    const [plato, setPlato] = useState({
        nombrePlato: "",
        ingredientesRequeridos: "",
        valorVenta: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            await createPlato(plato);
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