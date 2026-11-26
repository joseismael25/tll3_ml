import joblib
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np

app = FastAPI(title="Predicción de precios de viviendas API")

# Permitir que React la llame (si no pones esto, te da error CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en producción pon solo tu dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar el modelo
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "linear_model.joblib"
model = joblib.load(MODEL_PATH)

# Lo que va a recibir la API
class Vivienda(BaseModel):
    superficie: float  # en m2

@app.get("/")
def inicio():
    return {"mensaje": "API funcionando, usa POST /predict"}

@app.post("/predict")
def predecir(vivienda: Vivienda):
    # El modelo espera [[m2]]
    prediccion = model.predict([[vivienda.superficie]])
    precio = float(prediccion[0])

    return {
        "superficie_m2": vivienda.superficie,
        "prediccion de precio": round(precio, 2),
        "precio_serializado": f"${precio:,.0f} COP"
    }