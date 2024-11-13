"use-strict"

import { EntitySchema } from "typeorm";
import Ingrediente from "../entity/ingrediente.entity.js";

const MenuSchemna = new EntitySchema({
    name: "Plato",
    tableName: "Plato",
    columns: {

        id: {
            type: "int",
            primary: true,
            generated: true,
        },

        nombrePlato: {
            type: "varchar",
            length: 70,
            nullable: false,
        },

        ingredientesRequeridos: {
            type: "varchar",
            length: 70,
            nullable: false,
        },

        valorVenta: {
            type: "decimal",
            nullable: false,
        },

        createdAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },

        updatedAt: {
            type: "timestamp with time zone",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            nullable: false,
        },
    },
    relations: {
        ingredientes: {
            type: "many-to-many",
            target: "Ingrediente",
            joinTable: {
                name: "plato_ingrediente",
                joinColumn: { name: "platoId", referencedColumnName: "id" },
                inverseJoinColumn: { name: "ingredienteId", referencedColumnName: "id" },
            },
        },
    },
    indices: [
        {
            name: "IDX_PLATO_ID",
            columns: ["id"],
            unique: true,
        },
    ],
 });

 export default MenuSchemna;