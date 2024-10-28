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

export async function createPlatoService(data) {
    try{
        const menuRepository = AppDataSource.getRepository(MenuSchemna);
        const plato = menuRepository.create(data);
        await menuRepository.save(data);
        return [plato, null];
    }catch{
        console.error("Error al crear plato", error);
        return [null, "Error al crear plato"];
    }

}
