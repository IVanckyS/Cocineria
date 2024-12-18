"use strict";
import { EntitySchema } from "typeorm";

const WorkerSchema = new EntitySchema({
  name: "Worker",
  tableName: "workers",
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
    rol: {
      type: "varchar",
      length: 50,
      enum: ["mesero", "cocinero"],
      nullable: false,
    },
    diasTrabajo: {
      type: "simple-array", 
      nullable: true,
    },
    horaInicio: {
      type: "varchar",
      length: 5, 
      nullable: false,
      default: "08:00",
    },
    horaFin: {
      type: "varchar",
      length: 5, 
      nullable: false,
      default: "20:00",
    },
    disponibilidad: {
      type: "boolean",
      default: true,
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

export default WorkerSchema;