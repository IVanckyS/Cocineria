"use-strict";

import { getPlatoService } from "../services/menu.service.js";
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
