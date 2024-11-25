// src/components/CreateWorker.jsx
import React, { useState } from 'react';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert.js';
import { createWorker } from '@services/worker.service.js'; 

const CreateWorker = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    rol: '',
    diasTrabajo: [],
    horaInicio: '',
    horaFin: '',
    disponibilidad: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDayChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const diasTrabajo = checked
        ? [...prev.diasTrabajo, value]
        : prev.diasTrabajo.filter((day) => day !== value);
      return { ...prev, diasTrabajo };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onCreate(formData); 
      showSuccessAlert('¡Creado!', 'El trabajador ha sido creado correctamente.');
      
      setFormData({
        nombre: '',
        rol: '',
        diasTrabajo: [],
        horaInicio: '',
        horaFin: '',
        disponibilidad: true,
      });
    } catch (error) {
      showErrorAlert('Error', 'Ocurrió un error al crear el trabajador.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Trabajador</h2>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
      </div>
      <div>
        <label htmlFor="rol">Rol:</label>
        <input
          type="text"
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          placeholder="Rol"
          required
        />
      </div>
      <div>
        <h3>Días de Trabajo</h3>
        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              value={day}
              checked={formData.diasTrabajo.includes(day)}
              onChange={handleDayChange}
            />
            {day}
          </label>
        ))}
      </div>
      <div>
        <label htmlFor="horaInicio">Hora de Inicio:</label>
        <input
          type="time"
          name="horaInicio"
          value={formData.horaInicio}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="horaFin">Hora de Fin:</label>
        <input
          type="time"
          name="horaFin"
          value={formData.horaFin}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="disponibilidad">Disponibilidad:</label>
        <input
          type="checkbox"
          name="disponibilidad"
          checked={formData.disponibilidad}
          onChange={(e) => setFormData({ ...formData, disponibilidad: e.target.checked })}
        />
      </div>
      <button type="submit">Crear Trabajador</button>
    </form>
  );
};

export default CreateWorker;