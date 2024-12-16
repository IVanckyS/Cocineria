import axios from './root.service.js';


// Llama al endpoint de la API para obtener los platos
export async function getPlatos() {
    try {
        const { data } = await axios.get('/menu/');
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

// Llama al endpoint de la API para obtener un plato
export async function getPlatoById(id) {
    try {
        const { data } = await axios.get(`/menu/${id}`);
        console.log(data.data);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

// Llama al endpoint de la API para crear un plato
export async function createPlato(dato) {
    try {
        const { data } = await axios.post('/menu/crear', dato);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

// Llama al endpoint de la API para borrar un plato
export async function deletePlato(id) {
    try {
        const { data } = await axios.delete(`/menu/borrar/${id}`);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}   

// Llama al endpoint de la API para actualizar un plato

export async function updatePlato(id, dato) {
    try {
        const { data } = await axios.patch(`/menu/update/${id}`, dato);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

// Llama al endpoint de la API para obtener los ingredientes asignados a un plato

export async function getDisponibilidad() {
    try {
        const { data } = await axios.get('/menu/disponible');
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}