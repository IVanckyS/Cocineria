import axios from '@services/root.service.js';

export const generateReporteService = async () => {
  try {
    const response = await axios.get('/reportes', { responseType: 'blob' }); // Descarga como archivo
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reporte_ingredientes.pdf'); // Nombre del archivo descargado
    document.body.appendChild(link);
    link.click();
    link.remove();
    return { success: true };
  } catch (error) {
    console.error('Error al generar el reporte:', error);
    return { success: false, message: error.response?.data?.message || 'Error al generar el reporte' };
  }
};
