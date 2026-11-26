import React from 'react';
export default function ValuationForm({ area, onAreaChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mb-4">
        <label htmlFor="area" className="form-label fw-semibold">Área de la vivienda (m²)</label>
        <div className="input-group input-group-lg">
          <span className="input-group-text" aria-hidden="true">📐</span>
          <input
            id="area"
            name="area"
            type="number"
            className="form-control"
            placeholder="Ej: 85.5"
            min="0.01"
            max="10000"
            step="any"
            inputMode="decimal"
            value={area}
            onChange={(event) => onAreaChange(event.target.value)}
            required
          />
        </div>
      </div>
      <button className="btn btn-primary btn-lg w-100 fw-semibold" type="submit" disabled={loading}>
        {loading ? (
          <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />Calculando...</>
        ) : (
          <>▦ <span className="ms-1">Calcular Precio</span></>
        )}
      </button>
    </form>
  );
}
