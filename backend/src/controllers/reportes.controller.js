// src/controllers/ingrediente.controller.js

export async function generarReporteInventario(req, res) {
  try {
    // Obtén todos los ingredientes
    const ingredientes = await getIngredientes();

    // Filtra los ingredientes con `cantidadDisponible` inferior a `stockMinimo`
    const ingredientesBajoStock = ingredientes.filter(ingrediente =>
      ingrediente.cantidadDisponible < ingrediente.stockMinimo
    );

    // Estructura el reporte incluyendo el campo `precio`
    const reporte = ingredientes.map(ingrediente => ({
      id: ingrediente.id,
      nombre: ingrediente.nombre,
      cantidadDisponible: ingrediente.cantidadDisponible,
      unidadMedida: ingrediente.unidadMedida,
      stockMinimo: ingrediente.stockMinimo,
      precio: ingrediente.precio,
      estado: ingrediente.cantidadDisponible < ingrediente.stockMinimo ? "Bajo stock" : "En stock"
    }));

    res.status(200).json({
      message: "Reporte de Inventario",
      totalIngredientes: ingredientes.length,
      ingredientesBajoStock: ingredientesBajoStock.length,
      detalles: reporte,
    });
  } catch (error) {
    console.error("Error al generar el reporte de inventario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
}
