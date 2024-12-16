import axios from './root.service.js';

// Llama al endpoint de la API para obtener los ingredientes asignados a los platos
export async function getPlatoIngr() {
    try {
        const { data } = await axios.get('/asignar/');
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

// Llama al endpoint de la API para obtener los ingredientes asignados a un plato
export async function createPlatoIngr(dato) {
    console.log(dato);
    try {
        const { data } = await axios.post('/asignar/', dato);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

// Llama al endpoint de la API para borrar un ingrediente asignado a un plato
export async function deletePlatoIngr(platoId, ingredienteId) {
    try {
        const { data } = await axios.delete(`/asignar/${platoId}/${ingredienteId}`);
        return data.data;
    } catch (error) {
        return error.response.data;
    }

}
// Llama al endpoint de la API para actualizar la cantidad necesaria de un ingrediente a un plato
export async function updatePlatoIngr(platoId, ingredienteId, dato) {

    try {
        const { data } = await axios.patch(`/asignar/${platoId}/${ingredienteId}`, dato);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}