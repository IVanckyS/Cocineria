
import { EntitySchema } from "typeorm";

const VentaSchema = new EntitySchema({
  name: "Venta",
  tableName: "ventas",
  columns: {
    id: { type: "int", primary: true, generated: true },
    pedidoId: { type: "int" },
    total: { type: "decimal", precision: 10, scale: 2 },
    fechaVenta: { type: "timestamp", default: () => "CURRENT_TIMESTAMP" },
  },
});

export default VentaSchema;
