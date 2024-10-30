
import { Router } from "express";
import { confirmarPedidoController,
    crearPedidoController,
    generarReciboController } from "../controllers/pedido.controller.js";

const router = Router();

router.post("/", crearPedidoController);
router.post("/:id/confirmar", confirmarPedidoController);
router.get("/:id/recibo", generarReciboController);

export default router;
