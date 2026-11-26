import React from 'react';
import { useState } from 'react';
import Header from './components/Header.jsx';
import ValuationForm from './components/ValuationForm.jsx';
import PredictionResult from './components/PredictionResult.jsx';
import Footer from './components/Footer.jsx';
import { estimateHomePrice } from './services/valuationApi.js';

export default function App() {
  const [area, setArea] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const numericArea = Number(area);

    if (!area.trim() || !Number.isFinite(numericArea) || numericArea <= 0 || numericArea > 10000) {
      setError('Ingresa un área válida, mayor que 0 y no superior a 10.000 m².');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    try {
      const prediction = await estimateHomePrice(numericArea);
      setResult(prediction);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-primary-subtle py-4">
      <div className="col-12 col-md-10 col-lg-8 col-xl-7">
        <div className="card shadow-sm border-0 rounded-4 w-100">
        <div className="card-body p-4 p-md-5">
          <Header />
          <ValuationForm
            area={area}
            onAreaChange={(value) => { setArea(value); setError(''); }}
            onSubmit={handleSubmit}
            loading={loading}
          />
          {error && <div className="alert alert-danger mt-4 mb-0" role="alert">{error}</div>}
          <PredictionResult result={result} />
          <Footer />
        </div>
      </div>
      </div>
    </main>
  );
}
