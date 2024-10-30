import { DataSource } from "typeorm";
import { DATABASE, DB_USERNAME, HOST, PASSWORD } from "./configEnv.js";
import DetallePedido from "../entity/detallePedido.entity.js";
import Pedido from "../entity/pedido.entity.js";
import Producto from "../entity/Producto.entity.js";
import Venta from "../entity/venta.entity.js";
import User from "../entity/User.entity.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: HOST,
  port: 5432,
  username: DB_USERNAME,
  password: PASSWORD,
  database: DATABASE,
  entities: [Pedido, DetallePedido, Producto, Venta, User],
  synchronize: true,
  logging: false,
});

export async function connectDB() {
  try {
    await AppDataSource.initialize();
    console.log("=> Conexión exitosa a la base de datos!");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
}
