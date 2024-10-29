// src/services/ingrediente.service.js
"use strict";
import { AppDataSource } from "../config/configDb.js";
import Ingrediente from "../entity/ingrediente.entity.js";

export async function getIngredientesService() {
  try {
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);
    const ingredientes = await ingredienteRepository.find();
    return [ingredientes, null];
  } catch (error) {
    console.error("Error al obtener ingredientes:", error);
    return [null, "Error al obtener ingredientes"];
  }
}

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

export async function createIngredienteService(data) {
  try {
    const ingredienteRepository = AppDataSource.getRepository(Ingrediente);
    const ingrediente = ingredienteRepository.create(data); // `data` incluye `precio`
    await ingredienteRepository.save(ingrediente);
    return [ingrediente, null];
  } catch (error) {
    console.error("Error al crear ingrediente:", error);
    return [null, "Error al crear ingrediente"];
  }
}

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
