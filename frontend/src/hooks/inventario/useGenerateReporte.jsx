import { useState } from 'react';
import { generateReporteService } from '@services/ingredientes/generateReporte.service.js';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert.js';

const useGenerateReporte = () => {
  const [loading, setLoading] = useState(false);

  const handleGenerateReporte = async () => {
    setLoading(true);
    try {
      const { success, message } = await generateReporteService();
      if (success) {
        showSuccessAlert('Reporte Generado', 'El reporte se ha descargado correctamente.');
      } else {
        showErrorAlert('Error', message || 'No se pudo generar el reporte.');
      }
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      showErrorAlert('Error', 'Ocurrió un problema al generar el reporte.');
    } finally {
      setLoading(false);
    }
  };

  return { handleGenerateReporte, loading };
};

export default useGenerateReporte;
