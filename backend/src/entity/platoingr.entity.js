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
        },

        ingredienteId: {
            type: "int",
            primary: true, 
        },

        cantidadNecesaria: {
            type: "decimal",
            nullable: false,
        },

    },

    relations: {

        plato: {
            type: "many-to-one",
            target: "Plato",
            joinColumn: { name: "platoId", referencedColumnName: "id" },
            primary: true,
            nullable: false,
        },
        
        ingrediente: {
            type: "many-to-one",
            target: "Ingrediente",
            joinColumn: { name: "ingredienteId", referencedColumnName: "id" },
            primary: true,
            nullable: false,
        },
    },
});

export default PlatoIngredienteSchema;
