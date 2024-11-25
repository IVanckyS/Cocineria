import useGenerateReporte from '@hooks/inventario/useGenerateReporte';
import '@styles/inventario/generarReporte.css';

const GenerarReportePage = () => {
  const { handleGenerateReporte, loading } = useGenerateReporte();

  return (
    <main className="container">
      <h1 className="page-title">Generar Reporte de Ingredientes</h1>
      <p className="page-subtitle">
        Haz clic en el botón para generar un reporte detallado de todos los ingredientes.
      </p>
      <button
        className="generate-button"
        onClick={handleGenerateReporte}
        disabled={loading}
      >
        {loading ? 'Generando...' : 'Generar Reporte'}
      </button>
    </main>
  );
};

export default GenerarReportePage;
