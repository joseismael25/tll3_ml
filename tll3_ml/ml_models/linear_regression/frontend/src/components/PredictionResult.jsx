import React from 'react';
export default function PredictionResult({ result }) {
  if (!result) return null;

  const formattedPrice = `$${result.price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} COP`;

  return (
    <section className="alert alert-success mt-4 mb-0" role="status" aria-live="polite">
      <h2 className="h4 fw-bold mb-2">✓ Predicción Exitosa</h2>
      <p className="mb-3">
        Una vivienda de <strong>{result.area.toLocaleString('es-CO')} m²</strong> tiene un valor estimado de:
      </p>
      <hr />
      <p className="h3 fw-bold text-primary mb-0 text-break">{formattedPrice}</p>
    </section>
  );
}
