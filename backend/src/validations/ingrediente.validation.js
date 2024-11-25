import Joi from "joi";

// Función personalizada para validar números con comas o puntos como separador decimal
const customNumberValidation = (value, helpers) => {
  const normalizedValue = typeof value === "string" ? value.replace(",", ".") : value;
  const parsedValue = parseFloat(normalizedValue);

  if (isNaN(parsedValue) || parsedValue <= 0) {
    return helpers.error("number.base");
  }
  return parsedValue;
};

export const ingredienteSchema = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .required()
    .messages({
      "string.base": "El nombre debe ser un texto.",
      "string.empty": "El nombre no puede estar vacío.",
      "any.required": "El nombre es obligatorio.",
      "string.min": "El nombre debe tener al menos 3 caracteres.",
      "string.max": "El nombre debe tener como máximo 50 caracteres.",
      "string.pattern.base": "El nombre solo puede contener letras y espacios."
    }),

  cantidadDisponible: Joi.custom(customNumberValidation)
    .required()
    .messages({
      "number.base": "La cantidad disponible debe ser un número positivo, con coma o punto para decimales.",
      "any.required": "La cantidad disponible es obligatoria."
    }),

  unidadMedida: Joi.string()
    .valid("kg", "litros", "gramos", "mililitros")
    .required()
    .messages({
      "string.base": "La unidad de medida debe ser un texto.",
      "any.only": "La unidad de medida debe ser 'kg', 'litros', 'gramos' o 'mililitros'.",
      "any.required": "La unidad de medida es obligatoria."
    }),

  stockMinimo: Joi.custom(customNumberValidation)
    .required()
    .messages({
      "number.base": "El stock mínimo debe ser un número positivo, con coma o punto para decimales.",
      "any.required": "El stock mínimo es obligatorio."
    }),

  precio: Joi.custom(customNumberValidation)
    .required()
    .messages({
      "number.base": "El precio debe ser un número positivo, con coma o punto para decimales.",
      "any.required": "El precio es obligatorio."
    })
});
