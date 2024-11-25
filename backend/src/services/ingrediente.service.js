// src/services/ingrediente.service.js
"use strict";
import { AppDataSource } from "../config/configDb.js";
import Ingrediente from "../entity/ingrediente.entity.js";

// Obtener todos los ingredientes, ordenados por `id` de forma ascendente
export async function getIngredientesService() {
  try {
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);

    // Obtener los ingredientes ordenados por `id`
    const ingredientes = await ingredienteRepository.find({
      order: {
        id: "ASC",  // Ordena de forma ascendente por `id`
      },
    });

    return [ingredientes, null];
  } catch (error) {
    console.error("Error al obtener ingredientes:", error);
    return [null, "Error al obtener ingredientes"];
  }
}

// Obtener un ingrediente por ID
export async function getIngredienteService(id) {
  try {
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);
    const ingrediente = await ingredienteRepository.findOne({ where: { id } });

    if (!ingrediente) {
      return [null, "Ingrediente no encontrado"];
    }

    return [ingrediente, null];
  } catch (error) {
    console.error("Error al obtener ingrediente:", error);
    return [null, "Error al obtener ingrediente"];
  }
}

// Crear un nuevo ingrediente, reciclando IDs eliminados
export async function createIngredienteService(data) {
  try {
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);

    // Buscar el ID más bajo disponible para reciclar
    const result = await ingredienteRepository.query(`
      SELECT id + 1 AS next_id
      FROM ingredientes i
      WHERE NOT EXISTS (SELECT 1 FROM ingredientes WHERE id = i.id + 1)
      ORDER BY id
      LIMIT 1
    `);

    // Si hay un ID disponible en el "hueco" más bajo, lo usamos. De lo contrario, dejamos que sea automático.
    if (result.length > 0) {
      data.id = result[0].next_id;
    }

    // Crear el ingrediente con el `id` encontrado o el siguiente en la secuencia
    const ingrediente = ingredienteRepository.create(data);
    await ingredienteRepository.save(ingrediente);

    return [ingrediente, null];
  } catch (error) {
    console.error("Error al crear ingrediente:", error);
    return [null, "Error al crear ingrediente"];
  }
}

// Actualizar un ingrediente existente
export async function updateIngredienteService(id, data) {
  try {
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);
    const ingrediente = await ingredienteRepository.findOne({ where: { id } });

    if (!ingrediente) {
      return [null, "Ingrediente no encontrado"];
    }

    Object.assign(ingrediente, data); // Incluye `precio` si está en `data`
    await ingredienteRepository.save(ingrediente);
    return [ingrediente, null];
  } catch (error) {
    console.error("Error al actualizar ingrediente:", error);
    return [null, "Error al actualizar ingrediente"];
  }
}

// Eliminar un ingrediente por ID
export async function deleteIngredienteService(id) {
  try {
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);
    const ingrediente = await ingredienteRepository.findOne({ where: { id } });

    if (!ingrediente) {
      return [null, "Ingrediente no encontrado"];
    }

    await ingredienteRepository.remove(ingrediente);
    return [ingrediente, null];
  } catch (error) {
    console.error("Error al eliminar ingrediente:", error);
    return [null, "Error al eliminar ingrediente"];
  }
}
