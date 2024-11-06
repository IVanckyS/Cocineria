// src/controllers/reportes.controller.js
"use strict";
import { getIngredientesService } from "../services/ingrediente.service.js";

export async function generarReporteInventario(req, res) {
  try {
    const [ingredientes, error] = await getIngredientesService();

    if (error || !ingredientes) {
      return res.status(404).json({ message: "Error al obtener ingredientes para el reporte", error });
    }

    // Filtrar los ingredientes en dos categorías: bajo stock y en stock
    const ingredientesBajoStock = ingredientes.filter(
      ingrediente => ingrediente.cantidadDisponible < ingrediente.stockMinimo
    );
    const ingredientesEnStock = ingredientes.filter(
      ingrediente => ingrediente.cantidadDisponible >= ingrediente.stockMinimo
    );

    // Ordenar ambos grupos por `id`
    ingredientesBajoStock.sort((a, b) => a.id - b.id);
    ingredientesEnStock.sort((a, b) => a.id - b.id);

    // Concatenar los dos grupos para el reporte final
    const reporte = [...ingredientesBajoStock, ...ingredientesEnStock].map(ingrediente => ({
      id: ingrediente.id,
      nombre: ingrediente.nombre,
      cantidadDisponible: ingrediente.cantidadDisponible,
      unidadMedida: ingrediente.unidadMedida,
      stockMinimo: ingrediente.stockMinimo,
      precio: ingrediente.precio,
      estado: ingrediente.cantidadDisponible < ingrediente.stockMinimo ? "Bajo stock" : "En stock"
    }));

    // Devolver el reporte en la respuesta
    res.status(200).json({
      message: "Reporte de Inventario",
      totalIngredientes: ingredientes.length,
      ingredientesBajoStock: ingredientesBajoStock.length,
      ingredientesEnStock: ingredientesEnStock.length,
      detalles: reporte
    });
  } catch (error) {
    console.error("Error al generar el reporte de inventario:", error);
    res.status(500).json({ error: "Error en el servidor al generar el reporte de inventario" });
  }
}
