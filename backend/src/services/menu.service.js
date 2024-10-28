"use-strict";
import MenuSchemna from "../entity/menu.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getPlatoService() {

    try {
        const menuRepository = AppDataSource.getRepository(MenuSchemna);
        const platos = await menuRepository.find();
        return [platos, null];
    } catch (error) {
        console.error("No existen platos", error);
        return [null, "No existen platos"];
    }
}

export async function createPlatoService(plato) {
    try{
        const menuRepository = AppDataSource.getRepository(MenuSchemna);
        const plato = menuRepository.create(data);


    }catch{

    }

}
