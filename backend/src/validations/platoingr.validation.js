"use strict";
import Joi from "joi";

export const platoingrValidation = Joi.object({ 

    platoId : Joi.number() 
    .min(1)
    .integer()
    .positive()
    .messages({
        "number.empty": "El id no debe estar vacio.",
        "any.required": "El id es obligatorio.",
        "number.base": "El id debe ser de tipo numérico.",
        "number.min": "El id debe ser mayor a 0.",
        "number.integer": "El id debe ser un número entero.",
        "number.positive": "El id debe ser positivo.",
    }),
    
    ingredienteId: Joi.number()
    .min(1)
    .integer()
    .positive()
    .messages({
        "number.empty": "El id no debe estar vacio.",
        "any.required": "El id es obligatorio.",
        "number.base": "El id debe ser de tipo numérico.",
        "number.min": "El id debe ser mayor a 0.",
        "number.integer": "El id debe ser un número entero.",
        "number.positive": "El id debe ser positivo.",
    }),

    cantidadNecesaria: Joi.number()
    .min(1)
    .max(5)
    .integer()
    .positive()
    .messages({
        "number.empty": "La cantidad necesaria no debe estar vacia.",
        "any.required": "La cantidad necesaria es obligatoria.",
        "number.base": "La cantidad necesaria debe ser de tipo numérico.",
        "number.min": "La cantidad necesaria debe ser mayor a 0.",
        "number.max": "La cantidad necesaria debe ser menor a 5.",
        "number.integer": "La cantidad necesaria debe ser un número entero.",
        "number.positive": "La cantidad necesaria debe ser positivo.",
    })
});