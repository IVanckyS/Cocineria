"use strict";
import Joi from "joi";

export const workerSchema = Joi.object({
  nombre: Joi.string().required(),
  rol: Joi.string().valid("mesero", "cocinero").required(),
  horario: Joi.string().required(),
  disponibilidad: Joi.boolean()
});

export const validateWorker = (data) => workerSchema.validate(data);