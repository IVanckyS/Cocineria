import { EntitySchema } from "typeorm";
import Producto from "./Producto.entity.js";
const DetallePedidoSchema = new EntitySchema({
  name: "DetallePedido",
  tableName: "detalle_pedidos",
  columns: {
    id: { type: "int", primary: true, generated: true },
    cantidad: { type: "int", nullable: false },
  },
  relations: {
    pedido: { target: "Pedido", type: "many-to-one" },
    producto: { target: "Producto", type: "many-to-one" },
  },
});

export default DetallePedidoSchema;
