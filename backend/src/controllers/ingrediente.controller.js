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

export async function getIngredientes(req, res) {
  try {
    const [ingredientes, error] = await getIngredientesService();
    if (error) return handleErrorClient(res, 404, error);
    handleSuccess(res, 200, "Ingredientes encontrados", ingredientes);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getIngrediente(req, res) {
  try {
    const { id } = req.params;
    const [ingrediente, error] = await getIngredienteService(id);
    if (error) return handleErrorClient(res, 404, error);
    handleSuccess(res, 200, "Ingrediente encontrado", ingrediente);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function createIngrediente(req, res) {
  try {
    const [ingrediente, error] = await createIngredienteService(req.body);
    if (error) return handleErrorClient(res, 400, error);
    handleSuccess(res, 201, "Ingrediente creado exitosamente", ingrediente);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateIngrediente(req, res) {
  try {
    const { id } = req.params;
    const [ingrediente, error] = await updateIngredienteService(id, req.body);
    if (error) return handleErrorClient(res, 404, error);
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
