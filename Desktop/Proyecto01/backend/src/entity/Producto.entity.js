
import { EntitySchema } from "typeorm";

const ProductoSchema = new EntitySchema({
  name: "Producto",
  tableName: "productos",
  columns: {
    id: { type: "int", primary: true, generated: true },
    nombre: { type: "varchar", length: 255, nullable: false },
    precio: { type: "decimal", precision: 10, scale: 2, nullable: false },

  },
});

export default ProductoSchema;
