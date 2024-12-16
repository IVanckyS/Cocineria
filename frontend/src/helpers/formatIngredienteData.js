export const formatIngredienteData = (ingrediente) => {
  const normalizeNumber = (value) => {
    if (typeof value === "string") {
      return parseFloat(value.replace(",", "."));
    }
    return value;
  };

  return {
    nombre: ingrediente.nombre.trim(),
    cantidadDisponible: normalizeNumber(ingrediente.cantidad),
    unidadMedida: ingrediente.unidadMedida,
    stockMinimo: normalizeNumber(ingrediente.stockMinimo),
    precio: normalizeNumber(ingrediente.precio),
    id: ingrediente.id, // Asegura incluir el ID si es necesario
  };
};
