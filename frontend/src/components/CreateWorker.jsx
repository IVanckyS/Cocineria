import React, { useState } from 'react';

const CreateWorker = ({ onWorkerCreated }) => {
  const [form, setForm] = useState({
    nombre: '',
    rol: '',
    diasTrabajo: [],
    horaInicio: '',
    horaFin: '',
    disponibilidad: true,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDayChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      const diasTrabajo = checked
        ? [...prev.diasTrabajo, value]
        : prev.diasTrabajo.filter((day) => day !== value);
      return { ...prev, diasTrabajo };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createWorker(form);
      onWorkerCreated(); 
      showSuccessAlert('¡Creado!', 'El trabajador ha sido creado correctamente.');
    } catch (error) {
      showErrorAlert('Error', 'Ocurrió un error al crear el trabajador.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Crear Trabajador</h1>
      <input type="text" name="nombre" onChange={handleChange} placeholder="Nombre" required />
      <input type="text" name="rol" onChange={handleChange} placeholder="Rol" required />
      <input type="text" name="horaInicio" onChange={handleChange} placeholder="Hora de Inicio" required />
      <input type="text" name="horaFin" onChange={handleChange} placeholder="Hora de Fin" required />

      <div>
        <h3>Días de Trabajo</h3>
        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              value={day}
              onChange={handleDayChange}
            />
            {day}
          </label>
        ))}
      </div>

      <button type="submit">Crear Trabajador</button>
    </form>
  );
};

export default CreateWorker;