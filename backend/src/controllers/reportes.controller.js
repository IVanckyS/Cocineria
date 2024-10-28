// src/controllers/reportes.controller.js
"use strict";
import { getIngredientesService } from "../services/ingrediente.service.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

export async function generarReporteInventario(req, res) {
  try {
    const [ingredientes, error] = await getIngredientesService();
    if (error) return handleErrorClient(res, 404, error);

    const ingredientesBajos = ingredientes.filter(
      (ingrediente) => ingrediente.cantidadDisponible <= ingrediente.stockMinimo
    );

    const reporte = {
      totalIngredientes: ingredientes.length,
      ingredientesBajos,
      fechaReporte: new Date(),
    };

    handleSuccess(res, 200, "Reporte de inventario generado", reporte);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
