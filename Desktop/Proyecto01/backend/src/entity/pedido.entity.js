
import { EntitySchema } from "typeorm";

const PedidoSchema = new EntitySchema({
  name: "Pedido",
  tableName: "pedidos",
  columns: {
    id: { type: "int", primary: true, generated: true },
    total: { type: "decimal", precision: 10, scale: 2 },
    estado: { type: "varchar", length: 50 }, // e.g., "pendiente", "confirmado"
    createdAt: { type: "timestamp", default: () => "CURRENT_TIMESTAMP" },
  },
  relations: {
    productos: { target: "DetallePedido", type: "one-to-many" },
  },
});

export default PedidoSchema;
