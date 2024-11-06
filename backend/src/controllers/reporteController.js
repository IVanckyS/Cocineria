"use strict";
import { generarReporteRendimiento } from "../services/reporteService.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

export const getReporteRendimiento = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;

    if (!fechaInicio || !fechaFin) {
      return handleErrorClient(res, 400, "Se requieren fechas de inicio y fin para el reporte");
    }

    const reporte = await generarReporteRendimiento(new Date(fechaInicio), new Date(fechaFin));

    if (reporte.length === 0) {
      return handleErrorClient(res, 404, "No se encontraron datos para generar el reporte");
    }

    handleSuccess(res, 200, "Reporte de rendimiento generado exitosamente", reporte);
  } catch (error) {
    handleErrorServer(res, 500, "Error al generar el reporte de rendimiento");
  }
};