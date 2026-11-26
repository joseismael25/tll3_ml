import joblib
from pathlib import Path
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Datos de entrenamiento X y Y
X = np.array([[70], [80], [90], [100], [110], [120], [130], [140], [150]])  # metros cuadrados de superficie
y = np.array([420000000, 800000000, 900000000, 1500000000, 1800000000, 2100000000, 2400000000, 2700000000, 3000000000])  # precios de las viviendas

# Crear y entrenar el modelo
model = LinearRegression()
model.fit(X, y)

# PREDICCIONES DE PRUEBA
y_pred = model.predict(X)

# Imprimir los coeficientes del modelo
print("Coeficiente de regresión:", model.coef_)
print("Término independiente:", model.intercept_)

# Predecir un ejemplo: casa de 160 m2
print("Predicción para 160 m2:", model.predict([[160]]))

# GRAFICAR DATOS REALES
plt.scatter(X, y, color='blue', label='Datos reales')

# GRAFICAR LINEA DE REGRESIÓN - AQUÍ ESTABA EL ERROR, ERA y_pred NO y
plt.plot(X, y_pred, color='red', label='Línea de regresión')

# Agregar etiquetas y título
plt.xlabel('Superficie (m2)')
plt.ylabel('Precio (COP)')
plt.title('Regresión Lineal: Precio de Viviendas')
plt.legend()
plt.grid()

# Mostrar la grafica
plt.show()

# Guardar el modelo entrenado
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "linear_model.joblib"

# ESTO FALTABA: crear la carpeta model/ si no existe
MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)

joblib.dump(model, MODEL_PATH)
print(f"Modelo guardado en: {MODEL_PATH}")