"use strict";
import Joi from "joi";

export const workerBodyValidation = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
      "string.empty": "El nombre no puede estar vacío.",
      "string.min": "El nombre debe tener al menos 3 caracteres.",
      "string.max": "El nombre no puede tener más de 255 caracteres.",
      "any.required": "El nombre es obligatorio.",
    }),

  rol: Joi.string()
    .valid("mesero", "cocinero")
    .required()
    .messages({
      "string.empty": "El rol no puede estar vacío.",
      "any.required": "El rol es obligatorio.",
      "any.only": "El rol debe ser 'mesero' o 'cocinero'.",
    }),

  diasTrabajo: Joi.array()
    .items(
      Joi.string().valid(
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo"
      )
    )
    .min(1) 
    .required() 
    .messages({
      "array.empty": "Debe seleccionar al menos un día de trabajo.",
      "array.min": "Debe seleccionar al menos un día de trabajo.",
      "any.required": "Los días de trabajo son obligatorios.",
      "any.only": "Los días seleccionados no son válidos.",
    }),

  horaInicio: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      "string.empty": "La hora de inicio no puede estar vacía.",
      "string.pattern.base": "La hora de inicio debe tener el formato HH:MM (24 horas).",
      "any.required": "La hora de inicio es obligatoria.",
    }),

  horaFin: Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .required()
    .messages({
      "string.empty": "La hora de fin no puede estar vacía.",
      "string.pattern.base": "La hora de fin debe tener el formato HH:MM (24 horas).",
      "any.required": "La hora de fin es obligatoria.",
    }),

  disponibilidad: Joi.boolean()
    .default(true)
    .messages({
      "boolean.base": "La disponibilidad debe ser un valor booleano.",
    }),
})
.custom((value, helpers) => {
  const inicio = value.horaInicio.split(':').map(Number);
  const fin = value.horaFin.split(':').map(Number);
  
  const inicioMinutos = inicio[0] * 60 + inicio[1];
  const finMinutos = fin[0] * 60 + fin[1];
  
  if (finMinutos <= inicioMinutos) {
    return helpers.error('custom.horaFin', {
      message: 'La hora de fin debe ser posterior a la hora de inicio'
    });
  }
  
  return value;
})
.messages({
  "custom.horaFin": "La hora de fin debe ser posterior a la hora de inicio",
});

export const workerQueryValidation = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .messages({
      "number.base": "El ID debe ser un número.",
      "number.integer": "El ID debe ser un número entero.",
      "number.positive": "El ID debe ser un número positivo.",
    }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten parámetros adicionales.",
  });