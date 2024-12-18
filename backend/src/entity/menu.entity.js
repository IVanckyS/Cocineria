"use-strict"

import { EntitySchema } from "typeorm";


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

        disponible: {
            type: "boolean",
            default: true,
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
        
        platoIngredientes: {
            type: "one-to-many",
            target: "PlatoIngrediente",
            inverseSide: "plato",
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