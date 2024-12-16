"use-strict";
import MenuSchemna from "../entity/menu.entity.js";
import Ingrediente from "../entity/ingrediente.entity.js";
import PlatoIngredienteSchema from "../entity/platoingr.entity.js";
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

// Todo lo relacionado a la asignacion de ingredientes a platos se maneja a partir de aqui.

export async function createPlatoIngredienteService(data) {
    try {
        const platoIngredienteRepository = AppDataSource.getRepository(PlatoIngredienteSchema);
        const menuRepository = AppDataSource.getRepository(MenuSchemna);
        const ingredienteRepository = AppDataSource.getRepository(Ingrediente);

        const plato = await menuRepository.findOne({ where: { id: data.platoId } });
        if (!plato) {
            return [null, "El plato no existe"];
        }


        const ingrediente = await ingredienteRepository.findOne({ where: { id: data.ingredienteId } });
        if (!ingrediente) {
            return [null, "El ingrediente no existe"];
        }

        const platoIngrediente = platoIngredienteRepository.create(data);
        await platoIngredienteRepository.save(platoIngrediente);
        return [platoIngrediente, null];
    } catch (error) {
        console.error("Error asignar el ingrediente:", error);
        return [null, "Error asignar el ingrediente"];
    }
}

// Logica de verificacion de disponibilidad de platos

export async function verificarDisponibilidadPlatos() {
    try {
        const platoRepository = AppDataSource.getRepository(MenuSchemna);
        const platoIngredienteRepository = AppDataSource.getRepository(PlatoIngredienteSchema);

        
        const platos = await platoRepository.find();

        for (const plato of platos) {
           
            const ingredientesRelacionados = await platoIngredienteRepository.find({
                where: { plato: { id: plato.id } }, 
                relations: ["ingrediente"], 
            });

         
            const disponible = ingredientesRelacionados.every(relacion => {
                
                if (!relacion.ingrediente) {
                    console.error(`Ingrediente no encontrado para relación: ${JSON.stringify(relacion)}`);
                    return false;
                }
                console.log(relacion.ingrediente.cantidadDisponible);
                return relacion.ingrediente.cantidadDisponible >= relacion.cantidadNecesaria;
            });

            
            if (plato.disponible !== disponible) {
                plato.disponible = disponible;
                await platoRepository.save(plato); 
            }
        }

        return [platos, null];
    } catch (error) {
        console.error("Error al verificar disponibilidad de los platos:", error);
        throw new Error("No se pudo verificar la disponibilidad de los platos.");
    }
}

// Para ver las asignaciones de ingredientes a platos

export async function getPlatoIngredienteService(){
    try{
        const platoIngredienteRepository = AppDataSource.getRepository(PlatoIngredienteSchema);
        const platoIngrediente = await platoIngredienteRepository.find();
        if(platoIngrediente.length === 0){
            return [null, "No existen asignaciones de ingredientes"];
        }
        return [platoIngrediente, null];
    }catch (error) {
        console.error("No existen asignaciones de ingredientes", error);
        return [null, "No existen asignaciones de ingredientes"];
    }
}
// Jajajja si sirve, para actualizar la cantidad necesaria de un ingrediente asignado a un plato
export async function updatePlatoIngredienteService (platoId, ingredienteId, data){
    try{
        const platoIngredienteRepository = AppDataSource.getRepository(PlatoIngredienteSchema);
        const platoIngrediente = await platoIngredienteRepository.findOne({ where: { platoId, ingredienteId } });
        if(!platoIngrediente){
            return [null, "El ingrediente no ha sido asignado a este plato"];
        }
        await platoIngredienteRepository.update({ platoId, ingredienteId }, data);
        return [platoIngrediente, null];
}catch (error) {
    console.error("Error al actualizar asignacion de ingredientes", error);
    return [null, "Error al actualizar asignacion de ingredientes"];
}}

export async function deletePlatoIngredienteService (platoId, ingredienteId){
    try{
        const platoIngredienteRepository = AppDataSource.getRepository(PlatoIngredienteSchema);
        const platoIngrediente = await platoIngredienteRepository.findOne({ where: { platoId, ingredienteId } });
        if(!platoIngrediente){
            return [null, "El ingrediente no ha sido asignado a este plato"];
        }
        await platoIngredienteRepository.delete({ platoId, ingredienteId });
        return [platoIngrediente, null];
    }catch (error) {
        console.error("Error al eliminar asignacion de ingredientes", error);
        return [null, "Error al eliminar asignacion de ingredientes"];
    }
}

