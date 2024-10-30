// src/entity/ingrediente.entity.js
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
      length: 255,
      nullable: false,
    },
    cantidadDisponible: {
      type: "int",
      nullable: false,
    },
    unidadMedida: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    stockMinimo: {
      type: "int",
      nullable: false,
    },
    precio: {
      type: "decimal",
      precision: 10,
      scale: 2,
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
});

export default IngredienteSchema;
