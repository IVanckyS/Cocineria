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
      nullable: false,
    },
    horaInicio: {
      type: "varchar",
      length: 5,
      nullable: false,
    },
    horaFin: {
      type: "varchar",
      length: 5,
      nullable: false,
    },
    horasTrabajadas: {
      type: "float",
      nullable: false,
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