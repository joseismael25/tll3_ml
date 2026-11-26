const API_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

export async function estimateHomePrice(area) {
  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ superficie: area }),
  });

  if (!response.ok) {
    let message = 'No fue posible calcular el precio. Inténtalo nuevamente.';
    try {
      const errorData = await response.json();
      if (typeof errorData.detail === 'string') message = errorData.detail;
    } catch {
      // Se conserva el mensaje general cuando la API no devuelve JSON.
    }
    throw new Error(message);
  }

  const data = await response.json();
  const price = Number(data['prediccion de precio']);
  if (!Number.isFinite(price)) {
    throw new Error('La API no devolvió un precio válido.');
  }

  return { area: Number(data.superficie_m2), price };
}
