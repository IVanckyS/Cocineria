// src/entity/ingrediente.entity.js
"use strict";
import { EntitySchema } from "typeorm";

const IngredienteSchema = new EntitySchema({
  name: "Ingrediente",
  tableName: "ingredientes",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    nombre: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    cantidadDisponible: {
      type: "decimal",
      nullable: false,
    },
    unidadMedida: {
      type: "varchar",
      length: 20,
      nullable: false,
    },
    stockMinimo: {
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
  indices: [
    {
      name: "IDX_INGREDIENTE_ID",
      columns: ["id"],
      unique: true,
    },
  ],
});

export default IngredienteSchema;
