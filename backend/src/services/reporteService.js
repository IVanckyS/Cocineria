"use strict";
import { AppDataSource } from "../config/configDb.js";
import Worker from "../entity/Worker.js";
import WorkLog from "../entity/WorkLog.js";

export const generarReporteRendimiento = async (fechaInicio, fechaFin) => {
  const workerRepository = AppDataSource.getRepository(Worker);
  const workLogRepository = AppDataSource.getRepository(WorkLog);

  const workers = await workerRepository.find();

  const reporte = await Promise.all(workers.map(async (worker) => {
    const logs = await workLogRepository.find({
      where: {
        workerId: worker.id,
        fecha: {
          $gte: fechaInicio,
          $lte: fechaFin
        }
      }
    });

    const horasTotales = logs.reduce((total, log) => total + log.horasTrabajadas, 0);
    const diasTrabajados = new Set(logs.map(log => log.fecha.toISOString().split('T')[0])).size;

    
    const horasEsperadasPorDia = calcularHorasEsperadas(worker.horaInicio, worker.horaFin);
    const horasEsperadas = horasEsperadasPorDia * diasTrabajados;

    
    const rendimiento = (horasTotales / horasEsperadas) * 100;

    return {
      id: worker.id,
      nombre: worker.nombre,
      rol: worker.rol,
      diasTrabajados,
      horasTotales,
      horasEsperadas,
      rendimiento: rendimiento.toFixed(2) + '%'
    };
  }));

  return reporte;
};

function calcularHorasEsperadas(horaInicio, horaFin) {
  const [inicioHoras, inicioMinutos] = horaInicio.split(':').map(Number);
  const [finHoras, finMinutos] = horaFin.split(':').map(Number);

  let diferencia = (finHoras * 60 + finMinutos) - (inicioHoras * 60 + inicioMinutos);
  if (diferencia < 0) diferencia += 24 * 60; 

  return diferencia / 60; 
}