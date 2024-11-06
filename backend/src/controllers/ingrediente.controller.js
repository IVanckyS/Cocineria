// src/controllers/ingrediente.controller.js
"use strict";

import {
  createIngredienteService,
  deleteIngredienteService,
  getIngredienteService,
  getIngredientesService,
  updateIngredienteService,
} from "../services/ingrediente.service.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";
import { ingredienteSchema } from "../validations/ingrediente.validation.js";
import { formatFecha } from "../helpers/dateUtils.js";  // Importa la función para formatear fechas

export async function getIngredientes(req, res) {
  try {
    const [ingredientes, error] = await getIngredientesService();
    if (error) return handleErrorClient(res, 404, error);

    // Formatear fechas en cada ingrediente
    const ingredientesFormateados = ingredientes.map(ingrediente => ({
      ...ingrediente,
      createdAt: formatFecha(ingrediente.createdAt),
      updatedAt: formatFecha(ingrediente.updatedAt)
    }));

    handleSuccess(res, 200, "Ingredientes encontrados", ingredientesFormateados);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getIngrediente(req, res) {
  try {
    const { id } = req.params;
    const [ingrediente, error] = await getIngredienteService(id);
    if (error) return handleErrorClient(res, 404, error);

    // Formatear fechas en el ingrediente
    ingrediente.createdAt = formatFecha(ingrediente.createdAt);
    ingrediente.updatedAt = formatFecha(ingrediente.updatedAt);

    handleSuccess(res, 200, "Ingrediente encontrado", ingrediente);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function createIngrediente(req, res) {
  try {
    // Validación de datos de entrada usando Joi
    const { error, value } = ingredienteSchema.validate(req.body);
    if (error) {
      return handleErrorClient(res, 400, "Error de validación", error.details[0].message);
    }

    // Si los datos son válidos, procede a crear el ingrediente
    const [ingrediente, errorService] = await createIngredienteService(value);
    if (errorService) return handleErrorClient(res, 400, errorService);

    // Formatear fechas antes de enviar la respuesta
    ingrediente.createdAt = formatFecha(ingrediente.createdAt);
    ingrediente.updatedAt = formatFecha(ingrediente.updatedAt);

    handleSuccess(res, 201, "Ingrediente creado exitosamente", ingrediente);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateIngrediente(req, res) {
  try {
    const { id } = req.params;
    const { error, value } = ingredienteSchema.validate(req.body);
    if (error) {
      return handleErrorClient(res, 400, "Error de validación", error.details[0].message);
    }

    const [ingrediente, errorService] = await updateIngredienteService(id, value);
    if (errorService) return handleErrorClient(res, 404, errorService);

    // Formatear fechas antes de enviar la respuesta
    ingrediente.createdAt = formatFecha(ingrediente.createdAt);
    ingrediente.updatedAt = formatFecha(ingrediente.updatedAt);

    handleSuccess(res, 200, "Ingrediente actualizado exitosamente", ingrediente);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteIngrediente(req, res) {
  try {
    const { id } = req.params;
    const [ingrediente, error] = await deleteIngredienteService(id);
    if (error) return handleErrorClient(res, 404, error);

    handleSuccess(res, 200, "Ingrediente eliminado exitosamente", ingrediente);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
