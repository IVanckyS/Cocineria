
import DetallePedido from "../entity/detallePedido.entity.js";
import Pedido from "../entity/pedido.entity.js";
import Venta from "../entity/venta.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { ajustarStockIngredientes } from "./ingrediente.service.js";

export async function crearPedido(data) {
  const pedidoRepository = AppDataSource.getRepository(Pedido);
  const detalleRepository = AppDataSource.getRepository(DetallePedido);

  const pedido = pedidoRepository.create({ estado: "pendiente", total: data.total });
  await pedidoRepository.save(pedido);

  for (const item of data.productos) {
    const detalle = detalleRepository.create({
      pedido: pedido.id,
      producto: item.id,
      cantidad: item.cantidad,
    });
    await detalleRepository.save(detalle);
  }

  return pedido;
}

export async function confirmarPedido(id) {
  const pedidoRepository = AppDataSource.getRepository(Pedido);
  const ventaRepository = AppDataSource.getRepository(Venta);

  const pedido = await pedidoRepository.findOne({ where: { id }, relations: ["productos", "productos.producto"] });
  if (!pedido) return { error: "Pedido no encontrado" };

  const stockDisponible = await ajustarStockIngredientes(pedido.productos);
  if (!stockDisponible) return { error: "Stock insuficiente" };

  pedido.estado = "confirmado";
  await pedidoRepository.save(pedido);

  const venta = ventaRepository.create({ pedidoId: pedido.id, total: pedido.total });
  await ventaRepository.save(venta);

  return venta;
}

export async function generarRecibo(id) {
  const pedidoRepository = AppDataSource.getRepository(Pedido);
  const pedido = await pedidoRepository.findOne({ where: { id }, relations: ["productos", "productos.producto"] });

  if (!pedido) return { error: "Pedido no encontrado" };

  const recibo = {
    pedidoId: pedido.id,
    total: pedido.total,
    productos: pedido.productos.map((detalle) => ({
      producto: detalle.producto.nombre,
      cantidad: detalle.cantidad,
      precio: detalle.producto.precio,
    })),
    fecha: pedido.createdAt,
  };

  return recibo;
}
