import axios from './root.service.js';

export async function getPlatos() {
    try {
        const { data } = await axios.get('/menu/');
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getPlatoById(id) {
    try {
        const { data } = await axios.get(`/menu/${id}`);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function createPlato(dato) {
    try {
        const { data } = await axios.post('/menu/crear', dato);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deletePlato(id) {
    try {
        const { data } = await axios.delete(`/menu/borrar/${id}`);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}   

export async function updatePlato(id, dato) {
    try {
        const { data } = await axios.patch(`/menu/update/${id}`, dato);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

