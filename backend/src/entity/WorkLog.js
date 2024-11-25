"use strict";
import { EntitySchema } from "typeorm";

const WorkLogSchema = new EntitySchema({
  name: "WorkLog",
  tableName: "work_logs",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    workerId: {
      type: "int",
    },
    fecha: {
      type: "date",
      nullable: true,
    },
    horaInicio: {
      type: "varchar",
      length: 5,
      nullable: true,
    },
    horaFin: {
      type: "varchar",
      length: 5,
      nullable: true,
    },
    horasTrabajadas: {
      type: "float",
      nullable: true,
    },
  },
  relations: {
    worker: {
      target: "Worker",
      type: "many-to-one",
      joinColumn: true,
      cascade: true,
    },
  },
});

export default WorkLogSchema;