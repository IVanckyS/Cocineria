"use strict";
import Joi from "joi";


export const menuValidation = Joi.object({

    nombrePlato: Joi.string()
    .min(5)
    .max(70)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
        "string.empty": "El nombre del plato no puede estar vacío.",
        "any.required": "El nombre del plato es obligatorio.",
        "string.base": "El nombre del plato solo debe estar compuesto por letras.",
        "string.min": "El nombre del plato debe tener al menos 5 caracteres.",
        "string.max": "El nombre del plato debe tener como máximo 70 caracteres.",
        "string.pattern.base":
        "El nombre del plato solo puede contener letras y espacios.",
    }),
    ingredientesRequeridos: Joi.string()
    .min(5)
    .max(70)
    .messages({
        "string.empty": "El nombre del plato no puede estar vacío.",
        "any.required": "El nombre del plato es obligatorio.",
        "string.base": "El nombre del plato debe ser de tipo texto.",
        "string.min": "El nombre del plato debe tener al menos 5 caracteres.",
        "string.max": "El nombre del plato debe tener como máximo 70 caracteres.",
    }),
    valorVenta: Joi.number()
    .min(1)
    .positive()
    .messages({
        "number.empty": "El valor de venta no puede estar vacío.",
        "any.required": "El valor de venta es obligatorio.",
        "number.base": "El valor de venta debe ser de tipo numérico.",
        "number.min": "El valor de venta debe ser mayor a 0.",
        "number.positive": "El valor de venta debe ser positivo.",
    })
})


