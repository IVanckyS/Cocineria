import { useState, useEffect } from "react";
import { getReporteService } from "@services/ingredientes/getReporte.service";

const useReporteInventario = () => {
  const [reporte, setReporte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerReporte = async () => {
      try {
        const data = await getReporteService();
        setReporte(data);
      } catch (err) {
        console.error("Error al cargar el reporte:", err);
        setError("Error al cargar el reporte.");
      } finally {
        setLoading(false);
      }
    };

    obtenerReporte();
  }, []);

  return { reporte, loading, error };
};

export default useReporteInventario;
