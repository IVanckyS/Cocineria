"use-strict";

import { createPlatoIngredienteService,
        createPlatoService,
        deletePlatoIngredienteService,
        deletePlatoService,
        getPlatoIngredienteService,
        getPlatoService,
        getPlatoServiceById,
        updatePlatoIngredienteService,
        updatePlatoService,
        verificarDisponibilidadPlatos } from "../services/menu.service.js";

import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

import { menuValidation } from "../validations/menu.validations.js";
import { platoingrValidation } from "../validations/platoingr.validation.js";


// Se encarga de obtener los platos disponibles.
export async function getPlato (req, res) {
    try{
        const [platos, error] = await getPlatoService();
        if(error) return handleErrorClient(res, 404, error);
        handleSuccess(res, 202, "Los platos disponibles son:", platos);
    }catch(error){
        handleErrorServer(res, 500, error.message);

    }

}

// Se encarga de crear un plato.

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

// Se encarga de obtener un plato en especifico.

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

// Se encarga de actualizar un plato en especifico.

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

// Se encarga de eliminar un plato en especifico.

export async function deletePlato (req, res) {
    try{
        const [plato, error] = await deletePlatoService(req.params.id);
        if(error) return handleErrorClient(res, 400, error);
        handleSuccess(res, 202, "El plato se ha eliminado correctamente", plato);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}


// Todo lo relacionado a la asignacion de ingredientes a platos se maneja a partir de aqui.
// Se encarga de asignar un ingrediente a un plato en especifico.
export async function createPlatoIngrediente (req, res) {
    try{
        console.log(req.body);
        const { error: bodyError } = platoingrValidation.validate(req.body);
        console.log(bodyError)
        if (bodyError) return handleErrorClient(res, 400, "Error de validacion", bodyError.message);
        const { platoId, ingredienteId, cantidadNecesaria } = req.body;

        const [platoIngrediente, error] = await createPlatoIngredienteService({
            platoId, 
            ingredienteId, 
            cantidadNecesaria
        });
        
        if(error) return handleErrorClient(res, 400, error);
        handleSuccess(res, 201, "El ingrediente se ha añadido al plato correctamente", platoIngrediente);
        
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}
// Se encarga de verificar la disponibilidad de los platos y devuelve los platos disponibles.
export async function getDisponibilidad(req, res) {
    try {
        // Llama al servicio para verificar disponibilidad
        const [disponibilidad, error] = await verificarDisponibilidadPlatos();
        if (error) return handleErrorClient(res, 404, error);

        // Devuelve los platos disponibles
        handleSuccess(res, 200, "La disponibilidad de los platos se ha actualizado exitosamente:",
             disponibilidad);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

// Se encarga de obtener los ingredientes asignados a los platos.
export async function getPlatoIngrediente (req, res) {
    try{
        const [platoIngrediente, error] = await getPlatoIngredienteService();
        if(error) return handleErrorClient(res, 404, error);
        handleSuccess(res, 202, "Los ingredientes asignados a los platos son:", platoIngrediente);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

// Se encarga de actualizar la cantidad necesaria de un ingrediente en un plato en especifico.
export async function updatePlatoIngrediente (req, res) {
    console.log(req.body);
    try {
        const { error: bodyError } = platoingrValidation.validate(req.body);
        if (bodyError) return handleErrorClient(res, 400, "Error de validacion", bodyError.message);
        const data = req.body;
        const [platoIngrediente, error] = await updatePlatoIngredienteService(
            req.params.platoId,
            req.params.ingredienteId,
            data
        );
        if(error) return handleErrorClient(res, 400, error);
        handleSuccess(res, 202, "La cantidad necesaria se ha actualizado correctamente", platoIngrediente);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}

// Se encarga de eliminar un ingrediente asignado a un plato en especifico.
export async function deletePlatoIngrediente (req, res) {
    try{
        const [platoIngrediente, error] = await deletePlatoIngredienteService(
            req.params.platoId, 
            req.params.ingredienteId);
        if(error) return handleErrorClient(res, 400, error);
        handleSuccess(res, 202, "El ingrediente se ha eliminado del plato correctamente", platoIngrediente);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}