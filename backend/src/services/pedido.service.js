// src/services/pedido.service.js
export async function ajustarStockIngredientes(ingredientesUsados) {
    try {
      const ingredienteRepository = AppDataSource.getRepository(Ingrediente);
      for (const { id, cantidad } of ingredientesUsados) {
        const ingrediente = await ingredienteRepository.findOne({ where: { id } });
        if (ingrediente) {
          ingrediente.cantidadDisponible -= cantidad;
          await ingredienteRepository.save(ingrediente);
        }
      }
    } catch (error) {
      console.error("Error ajustando stock de ingredientes:", error);
    }
  }
  