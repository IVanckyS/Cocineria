// src/components/EditWorker.jsx
import React, { useEffect, useState } from 'react';
import { updateWorker } from '../services/worker.service';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';

const EditWorker = ({ worker, onWorkerUpdated }) => {
  const [form, setForm] = useState(worker);

  useEffect(() => {
    setForm(worker);
  }, [worker]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateWorker(worker.id, form);
      onWorkerUpdated(); 
      showSuccessAlert('¡Actualizado!', 'El trabajador ha sido actualizado correctamente.');
    } catch (error) {
      showErrorAlert('Error', 'Ocurrió un error al actualizar el trabajador.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Editar Trabajador</h1>
      <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input type="text" name="rol" value={form.rol} onChange={handleChange} placeholder="Rol" required />
      <input type="text" name="horaInicio" value={form.horaInicio} onChange={handleChange} placeholder="Hora de Inicio" required />
      <input type="text" name="horaFin" value={form.horaFin} onChange={handleChange} placeholder="Hora de Fin" required />
      <button type="submit">Actualizar Trabajador</button>
    </form>
  );
};

export default EditWorker;