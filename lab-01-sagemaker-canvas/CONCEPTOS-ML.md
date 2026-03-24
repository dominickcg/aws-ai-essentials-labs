# 📘 Conceptos Fundamentales de Machine Learning

Documento de referencia teórica para el Laboratorio 1 de la serie AWS AI Essentials. Consulte este material antes y durante la ejecución del laboratorio para familiarizarse con los términos y conceptos clave de aprendizaje automático.

---

## Indice

1. [Paradigma ML vs. Programación Tradicional](#1-paradigma-ml-vs-programación-tradicional)
2. [Tipos de Aprendizaje Automático](#2-tipos-de-aprendizaje-automático)
3. [Tipo de Problema — Clasificación Binaria](#3-tipo-de-problema--clasificación-binaria)
4. [Roles de los Datos](#4-roles-de-los-datos)
5. [Ciclo de Vida del ML](#5-ciclo-de-vida-del-ml)
6. [Parámetros del Modelo vs. Hiperparámetros](#6-parámetros-del-modelo-vs-hiperparámetros)
7. [Generalización vs. Sobreajuste (Overfitting)](#7-generalización-vs-sobreajuste-overfitting)
8. [División de Datos](#8-división-de-datos)
9. [Sesgo de Datos (Bias)](#9-sesgo-de-datos-bias)
10. [Métricas de Evaluación](#10-métricas-de-evaluación)
11. [Inferencia](#11-inferencia)
12. [AutoML e Interpretabilidad](#12-automl-e-interpretabilidad)

---

## 1. Paradigma ML vs. Programación Tradicional

En la **Programación Tradicional**, el desarrollador define explícitamente las reglas que transforman los datos de entrada en respuestas:

```
Programación Tradicional:
  Reglas + Datos → Respuestas
```

El humano escribe las instrucciones paso a paso y el programa las ejecuta de forma determinista.

En **Machine Learning (ML)**, el enfoque se invierte. En lugar de programar reglas, se proporcionan datos históricos junto con las respuestas conocidas, y el algoritmo descubre los patrones por sí mismo:

```
Machine Learning:
  Datos + Respuestas (Históricas) → Reglas
```

El resultado de este proceso de aprendizaje es un **Modelo**: la representación matemática de los patrones aprendidos por el algoritmo a partir de los datos históricos. El modelo es el artefacto resultante del proceso de entrenamiento que permite hacer predicciones sobre datos nuevos.

En este laboratorio, proporcionaremos datos meteorológicos históricos (temperatura, humedad, presión, etc.) junto con la información de si llovió o no cada día. El algoritmo de ML descubrirá las reglas que relacionan las condiciones climáticas con la ocurrencia de lluvia.

---

## 2. Tipos de Aprendizaje Automático

Existen tres tipos principales de aprendizaje automático:

### Aprendizaje Supervisado

Tipo de ML donde el modelo aprende de un dataset "etiquetado", es decir, donde se conoce la respuesta correcta histórica para cada observación. En este laboratorio, el dataset contiene la columna `Lluvia` que indica qué días llovió (1) y qué días no (0). El modelo aprende la relación entre las variables meteorológicas y esta etiqueta.

Este laboratorio utiliza Aprendizaje Supervisado.

### Aprendizaje No Supervisado

Tipo de ML donde el modelo encuentra patrones ocultos en datos sin etiquetas predefinidas. Por ejemplo, agrupar patrones climáticos similares sin saber de antemano a qué categoría pertenecen. No se utiliza en este laboratorio, pero es importante para contextualizar el panorama del aprendizaje automático.

### Aprendizaje Por Refuerzo

Tipo de ML donde el modelo aprende mediante prueba y error, recibiendo recompensas o penalizaciones por sus acciones. Se utiliza en robótica, juegos y sistemas de recomendación. No se utiliza en este laboratorio.

Amazon SageMaker Canvas se enfoca en **Aprendizaje Supervisado**, permitiendo construir modelos predictivos a partir de datos etiquetados sin necesidad de escribir código.

---

## 3. Tipo de Problema — Clasificación Binaria

En este laboratorio, el problema a resolver es de **Clasificación Binaria**: el modelo debe predecir una de dos clases mutuamente excluyentes:

- **0** = No llueve
- **1** = Llueve

Es importante distinguir la Clasificación Binaria de otros tipos de problemas:

- **Regresión**: Predice números continuos. Por ejemplo, predecir la temperatura exacta en grados Celsius para mañana (25.3°C, 18.7°C, etc.).
- **Clasificación Multiclase**: Predice entre tres o más categorías. Por ejemplo, predecir el tipo de precipitación: lluvia, nieve o granizo.

La Clasificación Binaria es el tipo de problema más directo y es ideal para responder preguntas de sí/no como "¿Lloverá mañana?".

---

## 4. Roles de los Datos

Dentro de un proyecto de ML, los datos cumplen roles específicos:

### Target (Variable Objetivo)

La columna que el modelo intentará predecir. En este laboratorio, la variable objetivo es `Lluvia`, que contiene valores 0 (no llueve) o 1 (llueve).

### Features (Características)

Las variables de entrada que el modelo utiliza como insumo para encontrar patrones y hacer predicciones. En este laboratorio, las features son:

- `Temperatura`: Temperatura promedio del día en grados Celsius
- `Humedad`: Porcentaje de humedad relativa del aire
- `Presion_Atmosferica`: Presión atmosférica en hectopascales (hPa)
- `Velocidad_Viento`: Velocidad promedio del viento en km/h
- `Nubosidad`: Porcentaje de cobertura nubosa del cielo
- `Mes`: Mes del año, captura patrones estacionales

### Dataset

El conjunto total de datos históricos estructurados. En este laboratorio se utiliza el archivo `weather-forecast-data.csv`, que contiene 400 observaciones meteorológicas diarias con las features y la variable objetivo.

---

## 5. Ciclo de Vida del ML

El desarrollo de un modelo de ML sigue un ciclo de fases que Amazon SageMaker Canvas automatiza en gran medida:

### Preprocesamiento (Data Wrangling)

Limpieza de datos, manejo de valores nulos y normalización de escalas. Antes de entrenar un modelo, es fundamental asegurar que los datos estén completos y en el formato correcto. En SageMaker Canvas, el perfilado de datos permite identificar problemas de calidad.

### Ingeniería de Características (Feature Engineering)

Proceso creativo de transformar datos brutos en atributos matemáticos que facilitan el aprendizaje del modelo. En este laboratorio, se crea la columna `Punto_Rocio_Aproximado` a partir de la temperatura y la humedad, proporcionando al modelo un indicador meteorológico adicional que mejora su capacidad predictiva.

### Entrenamiento (Training)

Proceso iterativo donde el algoritmo ajusta sus parámetros internos para minimizar el error de predicción. El modelo analiza los datos de entrenamiento repetidamente, refinando su comprensión de los patrones que relacionan las features con la variable objetivo.

### Evaluación

Medición del desempeño del modelo frente a datos que nunca ha visto durante el entrenamiento. Esta fase determina si el modelo es capaz de generalizar sus predicciones a situaciones nuevas.

---

## 6. Parámetros del Modelo vs. Hiperparámetros

### Parámetros del Modelo

Valores internos que el modelo ajusta automáticamente durante el entrenamiento para capturar los patrones de los datos. Por ejemplo, los pesos asignados a cada variable que determinan cuánto influye la humedad o la temperatura en la predicción de lluvia. El participante no los configura directamente; son el resultado del proceso de aprendizaje.

### Hiperparámetros

Configuraciones externas que controlan cómo aprende el modelo. Ejemplos incluyen el número de iteraciones de entrenamiento, la profundidad de un árbol de decisión o la tasa de aprendizaje. Estos valores se definen antes de iniciar el entrenamiento y afectan directamente la calidad del modelo resultante.

En Amazon SageMaker Canvas, el **AutoML** ajusta los hiperparámetros automáticamente, eliminando la necesidad de configuración manual por parte del participante. El servicio prueba múltiples combinaciones de hiperparámetros y selecciona la configuración que produce el mejor desempeño.

---

## 7. Generalización vs. Sobreajuste (Overfitting)

### Generalización

Capacidad del modelo de predecir correctamente en datos nuevos del mundo real que no formaron parte del entrenamiento. Un modelo que generaliza bien ha aprendido los patrones subyacentes de los datos, no las particularidades de los ejemplos específicos.

### Sobreajuste (Overfitting)

Cuando el modelo "memoriza" los datos de entrenamiento, incluyendo el ruido y las anomalías, en lugar de aprender el patrón general. Un modelo sobreajustado tiene un desempeño excelente en los datos de entrenamiento pero falla al predecir nuevos casos.

Por ejemplo, si el modelo memoriza que "el 15 de marzo llovió", en lugar de aprender que "cuando la humedad supera el 80% y la nubosidad es alta, es probable que llueva", estará sobreajustado.

### Train/Validation Split

Para detectar y evitar el sobreajuste, se separan los datos en subconjuntos. Una división común es 80% para entrenamiento y 20% para validación. Si el modelo tiene buen desempeño en los datos de entrenamiento pero malo en los de validación, es señal de sobreajuste.

---

## 8. División de Datos

Los datos se dividen en tres subconjuntos fundamentales:

### Datos de Entrenamiento (Training Set)

Subconjunto usado para que el modelo aprenda los patrones. Típicamente representa el 70-80% del dataset total. El algoritmo ajusta sus parámetros internos utilizando exclusivamente estos datos.

### Datos de Validación (Validation Set)

Subconjunto usado durante el entrenamiento para ajustar hiperparámetros y detectar sobreajuste. Típicamente representa el 10-20% del dataset. Permite evaluar el desempeño del modelo en datos que no usó para aprender, guiando la selección de la mejor configuración.

### Datos de Prueba (Test Set)

Subconjunto reservado que el modelo nunca ve durante el entrenamiento ni la validación. Se utiliza como evaluación final independiente de la capacidad de generalización del modelo. Proporciona una estimación imparcial del desempeño en el mundo real.

Amazon SageMaker Canvas gestiona automáticamente esta división de datos, asegurando que el modelo sea evaluado de forma rigurosa sin intervención manual del participante.

---

## 9. Sesgo de Datos (Bias)

El sesgo de datos ocurre cuando el dataset no representa equitativamente la realidad, causando que el modelo favorezca ciertas predicciones sobre otras.

En el contexto meteorológico de este laboratorio, si el dataset contiene mayoritariamente días sin lluvia (desbalance de clases), el modelo puede sesgarse hacia predecir "No llueve" con mayor frecuencia, subestimando los eventos de lluvia. Por ejemplo, si el 85% de los registros corresponden a días sin lluvia, el modelo podría aprender que la estrategia más "segura" es siempre predecir "No llueve".

Este concepto es especialmente relevante para entender por qué la métrica Accuracy (Exactitud) puede ser engañosa en datasets desbalanceados, como se explica en la siguiente sección de métricas de evaluación.

---

## 10. Métricas de Evaluación

### Matriz de Confusión

Tabla de 2x2 que cruza la realidad con la predicción del modelo. En el contexto meteorológico de este laboratorio:

|  | **Predicción: Llueve (1)** | **Predicción: No Llueve (0)** |
|---|---|---|
| **Realidad: Llovió (1)** | Verdadero Positivo (VP) | Falso Negativo (FN) |
| **Realidad: No Llovió (0)** | Falso Positivo (FP) | Verdadero Negativo (VN) |

- **Verdadero Positivo (VP)**: El modelo predijo "Llueve" y efectivamente llovió. Predicción correcta.
- **Verdadero Negativo (VN)**: El modelo predijo "No llueve" y efectivamente no llovió. Predicción correcta.
- **Falso Positivo (FP)**: El modelo predijo "Llueve" pero no llovió. Error que genera alertas innecesarias y desperdicio de recursos.
- **Falso Negativo (FN)**: El modelo predijo "No llueve" pero sí llovió. Error de mayor impacto para planificación agrícola, prevención de inundaciones y seguridad de la aviación.

### Precision (Precisión)

De todos los días que el modelo predijo "Llueve", cuántos realmente llovieron. Mide la confiabilidad de las alertas de lluvia.

```
Precision = VP / (VP + FP)
```

### Recall (Sensibilidad / Exhaustividad)

De todos los días que realmente llovió, cuántos detectó el modelo. Mide la capacidad de no dejar pasar eventos de lluvia.

```
Recall = VP / (VP + FN)
```

### Accuracy (Exactitud)

Porcentaje total de predicciones correctas sobre el total de predicciones.

```
Accuracy = (VP + VN) / (VP + VN + FP + FN)
```

⚠️ **Advertencia**: La Accuracy puede ser una métrica engañosa en datasets desbalanceados. Si el 85% de los días no llueve, un modelo que siempre prediga "No llueve" tendría 85% de exactitud pero nulo valor predictivo para detectar lluvia. Por esta razón, es fundamental complementar la Accuracy con Precision, Recall y F1 Score.

### F1 Score

Media armónica de Precision y Recall. Es el estándar para medir el equilibrio del modelo, especialmente útil cuando existe desbalance entre las clases.

```
F1 Score = 2 * (Precision * Recall) / (Precision + Recall)
```

Un F1 Score alto indica que el modelo tiene buen desempeño tanto en Precision como en Recall, logrando un balance entre la confiabilidad de las alertas y la capacidad de detectar todos los eventos de lluvia.

---

## 11. Inferencia

La inferencia es el proceso de utilizar el modelo ya entrenado para hacer predicciones sobre datos nuevos que no formaron parte del entrenamiento. Una vez que el modelo ha aprendido los patrones de los datos históricos, puede aplicar ese conocimiento para predecir si lloverá dado un nuevo conjunto de condiciones meteorológicas.

En Amazon SageMaker Canvas, la inferencia se realiza de dos formas:

- **Predicción individual**: Se ingresan los valores de las features para una observación específica y el modelo devuelve su predicción junto con un nivel de confianza.
- **Predicción por lotes (Batch Prediction)**: Se proporciona un archivo con múltiples observaciones y el modelo genera predicciones para todas ellas de forma simultánea.

---

## 12. AutoML e Interpretabilidad

### AutoML

Amazon SageMaker Canvas utiliza AutoML para automatizar las tareas más complejas del proceso de ML:

- **Selección de algoritmos**: Prueba múltiples algoritmos de clasificación y selecciona el que mejor se adapta a los datos.
- **Ajuste de hiperparámetros**: Optimiza automáticamente las configuraciones de cada algoritmo para maximizar el desempeño.
- **Optimización del modelo**: Combina las mejores configuraciones para producir el modelo final.

### Train/Validate Split

SageMaker Canvas realiza automáticamente la división de los datos en conjuntos de entrenamiento y validación, evitando que el modelo memorice los datos (Overfitting) y asegurando una evaluación objetiva del desempeño.

### Feature Importance (Importancia de Características)

Después del entrenamiento, SageMaker Canvas asigna un peso porcentual a cada variable según cuánto influye en la decisión final del modelo. Esta información permite comprender qué factores meteorológicos son más determinantes para la predicción de lluvia.

Por ejemplo, el modelo podría revelar que la `Humedad` y la `Nubosidad` tienen los pesos más altos, confirmando la intuición meteorológica de que estas variables son las más relevantes para predecir precipitación. La columna derivada `Punto_Rocio_Aproximado`, creada durante el Feature Engineering, también debería mostrar un peso relevante, validando la utilidad de la ingeniería de características.
