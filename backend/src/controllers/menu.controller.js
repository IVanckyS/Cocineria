"use-strict";

import { createPlatoService, getPlatoService } from "../services/menu.service.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

export async function getPlato (req, res) {
    try{
        const [platos, error] = await getPlatoService();
        if(error) return handleErrorClient(res, 404, error);
        handleSuccess(res, 200, "Los platos disponibles son:", platos);
    }catch(error){
        handleErrorServer(res, 500, error.message);

    }

}

export async function createPlato (req, res) {
    try{
        const [plato, error] = await createPlatoService(req.body);
        if(error) return handleErrorClient(res, 400, error);
        handleSuccess(res, 200, "El plato se ha creado correctamente", plato);
    }catch(error){
        handleErrorServer(res, 500, error.message);
    }
}