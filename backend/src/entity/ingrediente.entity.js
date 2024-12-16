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
      default: "Sin nombre",
    },
    cantidadDisponible: {
      type: "int",
      nullable: false,
      default: 1,
    },
    unidadMedida: {
      type: "varchar",
      length: 50,
      nullable: false,
      default: "Sin unidad",
    },
    stockMinimo: {
      type: "int",
      nullable: false,
      default: 1,
    },
    precio: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: false,
      default: 0,
    },
    createdAt: {
      type: "timestamp with time zone",
      createDate: true, // Establece automáticamente la fecha de creación
    },
    updatedAt: {
      type: "timestamp with time zone",
      updateDate: true, // Actualiza automáticamente la fecha de actualización
    },
  },
});

export default IngredienteSchema;
