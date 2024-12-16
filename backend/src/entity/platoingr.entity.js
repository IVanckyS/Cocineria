"use strict";
import { EntitySchema } from "typeorm";
import MenuSchemna from "../entity/menu.entity.js";
import Ingrediente from "../entity/ingrediente.entity.js";

const PlatoIngredienteSchema = new EntitySchema({
    name: "PlatoIngrediente",
    tableName: "plato_ingrediente",
    columns: {

        platoId: {
            type: "int",
            primary: true,
            nullable: false,  
        },

        ingredienteId: {
            type: "int",
            primary: true, 
            nullable: false,  
        },

        cantidadNecesaria: {
            type: "int",
            nullable: false, 
            default: 1,
        },

    },

    relations: {
        plato: {
            type: "many-to-one",
            target: MenuSchemna,
            joinColumn: { name: "platoId", referencedColumnName: "id" },
            inverseSide: "platoIngredientes", // Relación inversa hacia la entidad Plato
        },
        ingrediente: {
            type: "many-to-one",
            target: Ingrediente,
            joinColumn: { name: "ingredienteId", referencedColumnName: "id" },
        },
    },
});

export default PlatoIngredienteSchema;
