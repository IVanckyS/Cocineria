"use-strict";
import MenuSchemna from "../entity/menu.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getPlatoService() {

    try {
        const menuRepository = AppDataSource.getRepository(MenuSchemna);
        const platos = await menuRepository.find();

        if(platos.length === 0){
            return [null, "No existen platos"];
        }
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
    }catch (error) {
        console.error("Error al crear plato", error);
        return [null, "Error al crear plato"];
    }

}

export async function getPlatoServiceById(id){
    try{
        const menuRepository = AppDataSource.getRepository(MenuSchemna);
        const plato = await menuRepository.findOne({ where: { id } });
        if(!plato){
            return [null, "Este plato no existe"];
        }
        return [plato, null];
    }catch (error) {
        console.error("Error al obtener plato", error);
        return [null, "Error al obtener plato"];
    }
}

export async function updatePlatoService(id, data){
    try{
        const menuRepository = AppDataSource.getRepository(MenuSchemna);
        const plato = await menuRepository.findOne({ where: { id } });
        if(!plato){
            return [null, "Este plato no existe"];
        }
        await menuRepository.update(id, data);
        return [plato, null];
    }catch (error) {
        console.error("Error al actualizar plato", error);
        return [null, "Error al actualizar plato"];
    }
}

export async function deletePlatoService(id){
    try{
        const menuRepository = AppDataSource.getRepository(MenuSchemna);
        const plato = await menuRepository.findOne({ where: { id } });
        if(!plato){
            return [null, "Este plato no existe"];
        }
        await menuRepository.delete(id);
        return [plato, null];
    }catch (error) {
        console.error("Error al eliminar plato", error);
        return [null, "Error al eliminar plato"];
    }
}