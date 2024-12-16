import React from "react"; // Mantener la importación
import useReporteInventario from "@hooks/inventario/useReporteInventario";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "@styles/inventario/generarReporte.css";

// Uso como referencia
console.log(React);

const GenerarReportePage = () => {
  const { reporte, loading, error } = useReporteInventario();

  // Función para generar y descargar el PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Título del reporte
    doc.setFontSize(18);
    doc.text("Reporte de Inventario", 14, 20);

    // Información resumida
    doc.setFontSize(12);
    doc.text(`Total de ingredientes: ${reporte?.totalIngredientes}`, 14, 30);
    doc.text(`Ingredientes en stock: ${reporte?.ingredientesEnStock}`, 14, 38);
    doc.text(`Ingredientes bajo stock: ${reporte?.ingredientesBajoStock}`, 14, 46);

    // Generar la tabla
    const tableColumn = ["ID", "Nombre", "Cantidad", "Unidad", "Stock Mínimo", "Precio", "Estado"];
    const tableRows = [];

    reporte?.detalles?.forEach((ingrediente) => {
      const row = [
        ingrediente.id,
        ingrediente.nombre,
        ingrediente.cantidadDisponible,
        ingrediente.unidadMedida,
        ingrediente.stockMinimo,
        `$${ingrediente.precio}`,
        ingrediente.estado,
      ];
      tableRows.push(row);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 55,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 51, 102] }, // Azul Oscuro
    });

    // Guardar el PDF
    doc.save("Reporte_Inventario.pdf");
  };

  if (loading) return <p>Cargando reporte...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="reporte-container">
      <h1 className="reporte-title">Reporte de Inventario</h1>

      <div className="reporte-summary">
        <p>Total de ingredientes: <span>{reporte?.totalIngredientes}</span></p>
        <p>Ingredientes en stock: <span>{reporte?.ingredientesEnStock}</span></p>
        <p>Ingredientes bajo stock: <span>{reporte?.ingredientesBajoStock}</span></p>
      </div>

      <h2 className="reporte-subtitle">Detalles</h2>
      <table className="reporte-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Stock Mínimo</th>
            <th>Precio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reporte?.detalles?.map((ingrediente) => (
            <tr key={ingrediente.id}>
              <td>{ingrediente.id}</td>
              <td>{ingrediente.nombre}</td>
              <td>{ingrediente.cantidadDisponible}</td>
              <td>{ingrediente.unidadMedida}</td>
              <td>{ingrediente.stockMinimo}</td>
              <td>${ingrediente.precio}</td>
              <td>{ingrediente.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para descargar el PDF */}
      <button className="download-button" onClick={handleDownloadPDF}>
        Descargar PDF
      </button>
    </div>
  );
};

export default GenerarReportePage;
