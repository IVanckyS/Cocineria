import { useState } from "react";
import { getPlatoIngr } from "@services/platoingr.service.js";

export const useGetPlatoIngr = () => {

    const [loading, setLoading] = useState(false);
    const [platoIngr, setPlatoIngr] = useState([]);

    const handleGetPlatoIngr = async () => {
        setLoading(true);
        try {
            const data = await getPlatoIngr();
            setPlatoIngr(data);
        } catch (error) {
            console.error("Error en handleGetPlatoIngr:", error);
        } finally {
            setLoading(false);
        }
    };

    return { handleGetPlatoIngr, loading, platoIngr };

}

