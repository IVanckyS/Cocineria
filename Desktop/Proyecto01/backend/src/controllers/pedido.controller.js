
import { confirmarPedido, crearPedido, generarRecibo } from "../services/pedido.service.js";

export async function crearPedidoController(req, res) {
  try {
    const pedido = await crearPedido(req.body);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el pedido" });
  }
}

export async function confirmarPedidoController(req, res) {
  try {
    const resultado = await confirmarPedido(req.params.id);
    if (resultado.error) return res.status(400).json({ error: resultado.error });
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error al confirmar el pedido" });
  }
}

export async function generarReciboController(req, res) {
  try {
    const recibo = await generarRecibo(req.params.id);
    if (recibo.error) return res.status(404).json({ error: recibo.error });
    res.status(200).json(recibo);
  } catch (error) {
    res.status(500).json({ error: "Error al generar el recibo" });
  }
}
