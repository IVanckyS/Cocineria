"use-strict";

import { createPlatoIngredienteService,
        createPlatoService,
        deletePlatoService,
        getPlatoService,
        getPlatoServiceById,
        updatePlatoService, } from "../services/menu.service.js";

import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

import { menuValidation } from "../validations/menu.validations.js";

export async function getPlato (req, res) {
    try{
        const [platos, error] = await getPlatoService();
        if(error) return handleErrorClient(res, 404, error);
        handleSuccess(res, 202, "Los platos disponibles son:", platos);
    }catch(error){
        handleErrorServer(res, 500, error.message);

    }

}

export async function createPlato (req, res) {
    try{

        const { error: bodyError } = menuValidation.validate(req.body);
        if (bodyError) return handleErrorClient(res, 400, "Error de validacion", bodyError.message);

        const [plato, error] = await createPlatoService(req.body);
        if(error) return handleErrorClient(res, 400, error);
        handleSuccess(res, 201, "El plato se ha creado correctamente", plato);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

export async function getPlatoById (req, res) {
    try{
        const { id } = req.params;
        const [plato, error] = await getPlatoServiceById(id);
        if(error) return handleErrorClient(res, 404, error);
        handleSuccess(res, 202, "El plato es:", plato);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

export async function updatePlato (req, res) {
    try{
        const { error: bodyError } = menuValidation.validate(req.body);
        if (bodyError) return handleErrorClient(res, 400, "Error de validacion", bodyError.message);
        const [plato, error] = await updatePlatoService(req.params.id, req.body);
        if(error) return handleErrorClient(res, 400, error);
        handleSuccess(res, 202, "El plato se ha actualizado correctamente", plato);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

export async function deletePlato (req, res) {
    try{
        const [plato, error] = await deletePlatoService(req.params.id);
        if(error) return handleErrorClient(res, 400, error);
        handleSuccess(res, 202, "El plato se ha eliminado correctamente", plato);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

export async function createPlatoIngrediente (req, res) {
    try{
        const { platoId, ingredienteId, cantidadNecesaria } = req.body;
        const [platoIngrediente, error] = await createPlatoIngredienteService(
            platoId, 
            ingredienteId, 
            cantidadNecesaria);

        if(error) return handleErrorClient(res, 400, error);
        handleSuccess(res, 201, "El ingrediente se ha añadido al plato correctamente", platoIngrediente);
        
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}