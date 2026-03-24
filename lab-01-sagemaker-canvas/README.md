# 🌦️ Laboratorio 1: Machine Learning Low-Code con Amazon SageMaker Canvas

Tiempo estimado: **40 minutos**

Construya un modelo de clasificación binaria para predecir la ocurrencia de lluvia utilizando la interfaz visual de Amazon SageMaker Canvas. Aplique ingeniería de características para calcular un indicador meteorológico derivado (Punto de Rocío Aproximado) y audite el código Python generado automáticamente para comprender la transparencia del algoritmo.

---

## Indice

1. [Objetivos de Aprendizaje](#objetivos-de-aprendizaje)
2. [Prerrequisitos](#prerrequisitos)
3. [Diccionario de Datos](#diccionario-de-datos)
4. [Contexto de Aplicación](#contexto-de-aplicación)
5. [Nota sobre el Modelo Simplificado](#nota-sobre-el-modelo-simplificado)
6. [Instrucciones Paso a Paso](#instrucciones-paso-a-paso)
   - [Paso 1: Verificación de Región AWS](#paso-1-verificación-de-región-aws)
   - [Paso 2: Acceso a Amazon SageMaker Canvas](#paso-2-acceso-a-amazon-sagemaker-canvas)
   - [Paso 3: Importación del Dataset](#paso-3-importación-del-dataset)
   - [Paso 4: Perfilado y Validación de Datos](#paso-4-perfilado-y-validación-de-datos)
   - [Paso 5: Feature Engineering — Punto de Rocío Aproximado](#paso-5-feature-engineering--punto-de-rocío-aproximado)
   - [Paso 6: Entrenamiento Quick Build](#paso-6-entrenamiento-quick-build)
   - [Paso 7: Evaluación del Modelo](#paso-7-evaluación-del-modelo)
   - [Paso 8: Auditoría de Código — View Notebook](#paso-8-auditoría-de-código--view-notebook)
7. [Ciclo de Vida de Recursos](#ciclo-de-vida-de-recursos)
8. [Solución de Problemas](#solución-de-problemas)

---

## Objetivos de Aprendizaje

Al completar este laboratorio, usted será capaz de:

- Importar y perfilar un dataset meteorológico en Amazon SageMaker Canvas, validando la calidad de los datos antes del entrenamiento.
- Aplicar ingeniería de características (Feature Engineering) para crear un indicador derivado con sustento meteorológico real.
- Entrenar y evaluar un modelo de clasificación binaria interpretando la matriz de confusión y las métricas de desempeño.
- Auditar el código Python generado automáticamente por SageMaker Canvas, comprendiendo que el enfoque low-code es transparente y reproducible.

---

## Prerrequisitos

Antes de iniciar este laboratorio, asegúrese de contar con lo siguiente:

- Acceso a la consola de AWS con permisos para utilizar Amazon SageMaker Canvas.
- El archivo de datos `weather-forecast-data.csv` ubicado en esta carpeta del laboratorio (400 observaciones meteorológicas diarias).
- Familiaridad con los conceptos básicos de Machine Learning descritos en la guía de referencia teórica.

Antes de comenzar, revise la [Guía de Conceptos Fundamentales de ML](CONCEPTOS-ML.md) para familiarizarse con los términos y conceptos que se utilizarán durante el laboratorio.

---

## Diccionario de Datos

El archivo [`weather-forecast-data.csv`](weather-forecast-data.csv) contiene 400 observaciones meteorológicas diarias. A continuación se describe cada columna del dataset:

| Columna | Tipo | Rango / Formato | Descripción |
|---------|------|-----------------|-------------|
| `Fecha` | String | YYYY-MM-DD | Fecha de la observación meteorológica. |
| `Mes` | Entero | 1–12 | Mes del año de la observación; captura patrones estacionales de precipitación. |
| `Temperatura` | Float | ~5–40 °C | Temperatura promedio del día en grados Celsius. |
| `Humedad` | Float | 0–100 % | Porcentaje de humedad relativa del aire. |
| `Presion_Atmosferica` | Float | ~980–1040 hPa | Presión atmosférica en hectopascales. |
| `Velocidad_Viento` | Float | ≥0 km/h | Velocidad promedio del viento en kilómetros por hora. |
| `Nubosidad` | Float | 0–100 % | Porcentaje de cobertura nubosa del cielo. |
| `Precipitacion` | Float | ≥0 mm | Cantidad de precipitación acumulada en milímetros. |
| `Lluvia` | Entero | 0 o 1 | Variable objetivo (0 = No llueve, 1 = Llueve). |

---

## Contexto de Aplicación

Los modelos de predicción de lluvia tienen aplicaciones directas en múltiples sectores críticos:

- **Planificación agrícola**: Decisiones de riego y cosecha basadas en pronósticos permiten optimizar el uso de recursos y proteger los cultivos ante eventos climáticos adversos.
- **Prevención de desastres**: Alertas tempranas ante posibles inundaciones o tormentas contribuyen a la evacuación oportuna y la protección de infraestructura.
- **Seguridad en aviación y transporte**: La planificación de rutas y operaciones seguras depende de pronósticos meteorológicos confiables para reducir riesgos operacionales.
- **Gestión de recursos hídricos**: La administración de embalses y sistemas de drenaje requiere anticipar volúmenes de precipitación para prevenir desbordamientos y garantizar el abastecimiento.

---

## Nota sobre el Modelo Simplificado

Este laboratorio utiliza un modelo simplificado con fines didácticos. Los modelos meteorológicos operacionales reales de agencias como SENAMHI, NOAA y ECMWF incorporan datos de mayor resolución: series temporales horarias, datos de radar, imágenes satelitales y modelos numéricos de predicción del tiempo.

El enfoque de clasificación binaria (lluvia sí/no) es una simplificación válida del problema real, que es considerablemente más complejo e involucra predecir cuándo, cuánto y dónde lloverá. El objetivo de este laboratorio es demostrar el flujo de trabajo de Machine Learning y las capacidades de Amazon SageMaker Canvas utilizando un dataset simplificado pero representativo.

---

## Instrucciones Paso a Paso

### Paso 1: Verificación de Región AWS

Antes de realizar cualquier acción en la consola de AWS, es fundamental confirmar que está trabajando en la región correcta. Utilizar una región incorrecta puede provocar que los recursos no sean visibles o que se incurra en costos inesperados.

1. En la esquina superior derecha de la consola de AWS, observe el nombre de la región actualmente seleccionada (por ejemplo, **US East (N. Virginia) us-east-1**).

2. Confirme que la región mostrada corresponde a la región estipulada por el instructor.

3. Si la región no es correcta, haga clic en el nombre de la región para desplegar la lista de regiones disponibles y seleccione la región indicada por el instructor.

**✓ Verificación**: Confirme que en la esquina superior derecha de la consola de AWS se muestra la región correcta indicada por el instructor antes de continuar con el siguiente paso.

---

### Paso 2: Acceso a Amazon SageMaker Canvas

En este paso navegará hasta Amazon SageMaker Canvas, la interfaz visual de Machine Learning sin código donde construirá el modelo de predicción de lluvia.

1. En la barra de búsqueda global (parte superior de la consola de AWS), escriba `SageMaker` y seleccione **Amazon SageMaker** de la lista de resultados.

2. En el panel de navegación de la izquierda de la consola de Amazon SageMaker, haga clic en **Canvas**.

3. Si es la primera vez que accede a SageMaker Canvas, es posible que se le solicite configurar un perfil de usuario. En ese caso, ingrese el nombre de usuario proporcionado por el instructor siguiendo el formato: `{nombre-participante}`.

4. Haga clic en **Abrir Canvas** junto al perfil de usuario correspondiente para iniciar la aplicación de SageMaker Canvas.

**✓ Verificación**: Confirme que se encuentra en la interfaz principal de Amazon SageMaker Canvas y que puede ver el panel de inicio con las opciones para crear modelos y gestionar datasets.

---

### Paso 3: Importación del Dataset

En este paso cargará el dataset meteorológico en Amazon SageMaker Canvas para que esté disponible como fuente de datos del modelo de predicción de lluvia.

Utilice el archivo `weather-forecast-data.csv` ubicado en esta carpeta del laboratorio. Este archivo contiene 400 observaciones meteorológicas diarias con las variables descritas en el [Diccionario de Datos](#diccionario-de-datos).

1. En la interfaz principal de Amazon SageMaker Canvas, haga clic en **Datasets** en el panel de navegación de la izquierda.

2. Haga clic en el botón **Import data**.

3. En el menú desplegable, seleccione **Tabular** como tipo de dataset.

4. En el cuadro de diálogo emergente, ingrese un nombre descriptivo para el dataset en el campo **Dataset name** siguiendo la convención de nombrado:
   - **Nombre**: `weather-forecast-{nombre-participante}`

5. Haga clic en **Create** para continuar con la configuración de importación.

6. En la página de creación del dataset, abra el menú desplegable **Data Source** y seleccione **Local upload** para cargar un archivo desde su máquina local.

7. Seleccione el archivo `weather-forecast-data.csv` desde la ubicación donde lo descargó y confirme la carga.

8. Haga clic en **Preview dataset** para verificar los datos antes de importarlos. Luego, haga clic en **Import data** para completar la importación del archivo.

9. Una vez completada la importación, SageMaker Canvas mostrará el dataset en la sección **Datasets**. Haga clic sobre el dataset para ver su contenido y verifique los siguientes puntos:
   - El dataset contiene **400 filas** de observaciones meteorológicas.
   - Las columnas numéricas (`Temperatura`, `Humedad`, `Presion_Atmosferica`, `Velocidad_Viento`, `Nubosidad`, `Precipitacion`) son reconocidas como tipo **Numeric**.
   - La columna `Lluvia` es reconocida como tipo **Numeric** (valores 0 y 1).
   - Las columnas `Fecha` y `Mes` son reconocidas correctamente por SageMaker Canvas.

**✓ Verificación**: En la sección **Datasets**, confirme que:
- El dataset `weather-forecast-{nombre-participante}` aparece en la lista de datasets disponibles.
- El conteo de filas muestra **400 rows**.
- Los tipos de datos (numéricos y categóricos) fueron reconocidos correctamente por SageMaker Canvas.

---

### Paso 4: Perfilado y Validación de Datos

Antes de entrenar un modelo, es fundamental comprender la distribución y calidad de los datos. En este paso realizará un perfilado del dataset para confirmar que la información es adecuada para construir un modelo predictivo confiable. Para profundizar en los conceptos de evaluación de datos y métricas, consulte la sección [Métricas de Evaluación](CONCEPTOS-ML.md#10-métricas-de-evaluación) de la Guía de Conceptos de ML.

1. En la sección **Datasets** del panel de navegación de la izquierda, haga clic sobre el dataset `weather-forecast-{nombre-participante}` para abrirlo.

2. SageMaker Canvas mostrará una vista previa tabular de los datos. Revise las primeras filas para confirmar que los valores son coherentes con las descripciones del [Diccionario de Datos](#diccionario-de-datos).

3. Verifique la ausencia de valores nulos en las columnas críticas del modelo:
   - Haga clic en la columna `Temperatura` para ver su distribución. Confirme que no existen valores faltantes (missing values).
   - Repita la verificación para las columnas `Humedad` y `Presion_Atmosferica`.
   - La ausencia de valores nulos en estas columnas es esencial para que el modelo pueda aprender patrones confiables sin necesidad de imputación de datos.

4. Revise la distribución de la variable objetivo `Lluvia`:
   - Haga clic en la columna `Lluvia` para visualizar la distribución de clases.
   - Observe la proporción entre días con lluvia (1) y días sin lluvia (0). Esta proporción es relevante para entender posibles sesgos del modelo, como se explica en la sección [Sesgo de Datos (Bias)](CONCEPTOS-ML.md#9-sesgo-de-datos-bias) de la Guía de Conceptos de ML.

5. Analice la matriz de correlación para validar la viabilidad técnica del modelo:
   - En la vista del dataset, explore las estadísticas de correlación entre las variables y la columna `Lluvia`.
   - Confirme que las variables `Humedad`, `Nubosidad` y `Precipitacion` presentan una **correlación positiva** con la variable objetivo `Lluvia`. Esto significa que a mayor humedad, nubosidad o precipitación, mayor es la probabilidad de que el valor de `Lluvia` sea 1.
   - Esta correlación positiva confirma que el dataset contiene señales estadísticas suficientes para que el modelo aprenda a distinguir entre días con lluvia y días sin lluvia.

6. Revise las estadísticas descriptivas generales del dataset:
   - Confirme que los rangos de valores son coherentes con datos meteorológicos reales (por ejemplo, `Temperatura` entre ~5°C y ~40°C, `Humedad` entre 0% y 100%).
   - Verifique que no existen valores atípicos extremos que puedan indicar errores en los datos.

**✓ Verificación**: Tras completar el perfilado, confirme que:
- Las columnas críticas (`Temperatura`, `Humedad`, `Presion_Atmosferica`) no contienen valores nulos.
- Las variables `Humedad`, `Nubosidad` y `Precipitacion` muestran correlación positiva con `Lluvia`.
- Los rangos de valores son coherentes con observaciones meteorológicas reales.
- El dataset está listo para proceder con la ingeniería de características en el siguiente paso.

---

### Paso 5: Feature Engineering — Punto de Rocío Aproximado

En este paso aplicará ingeniería de características (Feature Engineering) para crear una nueva columna derivada que mejore la capacidad predictiva del modelo. Para comprender el rol de esta fase dentro del flujo de trabajo de Machine Learning, consulte la sección [Ingeniería de Características (Feature Engineering)](CONCEPTOS-ML.md#5-ciclo-de-vida-del-ml) de la Guía de Conceptos de ML.

La ingeniería de características consiste en transformar datos brutos en atributos matemáticos que facilitan el aprendizaje del modelo. En este caso, combinará las columnas `Temperatura` y `Humedad` para calcular el **Punto de Rocío Aproximado**, un indicador meteorológico real utilizado por agencias como SENAMHI, NOAA y ECMWF a nivel mundial.

**Sustento técnico-meteorológico:**

El punto de rocío indica la temperatura a la cual el aire se satura y el vapor de agua comienza a condensarse. La fórmula utilizada en este laboratorio se basa en la **aproximación de Magnus**, un método simplificado ampliamente aceptado en meteorología para estimar el punto de rocío:

```
Punto_Rocio_Aproximado = Temperatura - ((100 - Humedad) / 5)
```

Esta aproximación captura la relación fundamental entre temperatura y humedad relativa:

- Cuando la **Humedad** es alta (cercana al 100%), el punto de rocío se aproxima a la temperatura ambiente, lo que significa que el aire está cerca de la saturación y la probabilidad de precipitación aumenta significativamente.
- Cuando la diferencia entre la temperatura ambiente y el punto de rocío es **menor a 2-3°C**, las condiciones son favorables para la formación de precipitación.
- Un **Punto_Rocio_Aproximado superior a 18°C** combinado con un diferencial pequeño respecto a la temperatura ambiente indica **alta probabilidad de precipitación**.
- Cuando la **Humedad** es baja, el punto de rocío desciende considerablemente por debajo de la temperatura ambiente, indicando aire seco con baja probabilidad de lluvia.

**Creación de la columna calculada en SageMaker Canvas:**

1. En el panel de navegación de la izquierda de SageMaker Canvas, haga clic en **My models**.

2. Haga clic en **New model** para iniciar la creación de un nuevo modelo.

3. En el cuadro de diálogo **Create new model**, configure lo siguiente:
   - **Model name**: `modelo-lluvia-{nombre-participante}`
   - **Problem type**: Seleccione **Predictive analysis**
   - Haga clic en **Create**.

4. En la pantalla de selección de dataset, seleccione el dataset `weather-forecast-{nombre-participante}` y haga clic en **Select dataset**.

5. En la pestaña **Build**, haga clic en **View all** en la barra de herramientas de transformaciones y seleccione **Custom formula** para abrir el panel de fórmulas personalizadas.

6. Configure la nueva columna con los siguientes parámetros:
   - **Formula**: `Temperatura - ((100 - Humedad) / 5)`
   - **New Column Name**: `Punto_Rocio_Aproximado`

7. Haga clic en **Preview** para verificar los valores calculados y luego haga clic en **Add** para agregar la columna al **Model Recipe**.

8. Verifique que la nueva columna `Punto_Rocio_Aproximado` aparece en el dataset con valores numéricos calculados. Revise algunos valores de ejemplo para confirmar la coherencia:
   - Para una fila con `Temperatura = 25°C` y `Humedad = 80%`, el valor esperado es: `25 - ((100 - 80) / 5) = 25 - 4 = 21°C`.
   - Para una fila con `Temperatura = 30°C` y `Humedad = 60%`, el valor esperado es: `30 - ((100 - 60) / 5) = 30 - 8 = 22°C`.
   - Confirme que todos los valores de `Punto_Rocio_Aproximado` son **menores o iguales** a la `Temperatura` correspondiente (el punto de rocío nunca puede superar la temperatura ambiente).

**✓ Verificación**: Tras crear la columna calculada, confirme que:
- La columna `Punto_Rocio_Aproximado` aparece en el dataset del modelo con valores numéricos.
- Los valores calculados son coherentes con la fórmula `Temperatura - ((100 - Humedad) / 5)`.
- Todos los valores de `Punto_Rocio_Aproximado` son menores o iguales a la `Temperatura` de la misma fila.
- El dataset ahora contiene **10 columnas** (las 9 originales más la columna derivada).

---

### Paso 6: Entrenamiento Quick Build

En este paso entrenará un modelo de clasificación binaria utilizando el modo Quick Build de Amazon SageMaker Canvas. Este modo permite obtener un modelo funcional en minutos, ideal para prototipado rápido y validación inicial de hipótesis antes de invertir en un entrenamiento completo. Para comprender cómo SageMaker Canvas automatiza la selección de algoritmos y el ajuste de hiperparámetros, consulte la sección [AutoML e Interpretabilidad](CONCEPTOS-ML.md#12-automl-e-interpretabilidad) de la Guía de Conceptos de ML.

1. Desde la pestaña **Build** del modelo `modelo-lluvia-{nombre-participante}`, verifique que el dataset contiene las 10 columnas esperadas (las 9 originales más `Punto_Rocio_Aproximado`).

2. En la parte superior de la pestaña **Build**, localice el menú desplegable **Target column**.

3. Seleccione la columna **`Lluvia`** como la variable objetivo (Target). SageMaker Canvas reconocerá automáticamente que se trata de un problema de **2 category prediction** (clasificación binaria) dado que la columna contiene únicamente valores 0 y 1.

4. Una vez seleccionada la variable objetivo, SageMaker Canvas mostrará las opciones de tipo de construcción del modelo en la parte inferior de la pantalla. Haga clic en el botón **Quick build** para iniciar un entrenamiento rápido de prototipado.

⏱️ **Nota**: El entrenamiento Quick Build típicamente tarda entre **2 y 20 minutos** dependiendo del tamaño del dataset y la carga del servicio. Durante este tiempo, SageMaker Canvas prueba automáticamente múltiples algoritmos y configuraciones de hiperparámetros para encontrar el modelo con mejor desempeño.

**Mientras espera**, puede revisar la [Guía de Conceptos Fundamentales de ML](CONCEPTOS-ML.md) para repasar los conceptos de [Métricas de Evaluación](CONCEPTOS-ML.md#10-métricas-de-evaluación) que utilizará en el siguiente paso para interpretar los resultados del modelo.

5. Una vez completado el entrenamiento, SageMaker Canvas mostrará automáticamente la pestaña **Analyze** del modelo con las métricas de desempeño.

**✓ Verificación**: Confirme que:
- El modelo `modelo-lluvia-{nombre-participante}` completó el entrenamiento exitosamente.
- El estado del modelo es **Ready** (Listo) en la página **My models**.
- La pestaña **Analyze** muestra métricas de desempeño y la sección de **Column impact** (importancia de columnas).

---

### Paso 7: Evaluación del Modelo

En este paso interpretará los resultados del modelo entrenado, analizando la matriz de confusión y las métricas de desempeño para comprender la capacidad predictiva del modelo. Para profundizar en los conceptos de evaluación, consulte la sección [Métricas de Evaluación](CONCEPTOS-ML.md#10-métricas-de-evaluación) de la Guía de Conceptos de ML.

**Interpretación de la pestaña Analyze:**

SageMaker Canvas presenta los resultados del modelo en la pestaña **Analyze**, que contiene dos sub-pestañas: **Overview** y **Advanced metrics**. La pestaña **Overview** muestra el puntaje de precisión del modelo y la sección **Column impact**, que indica el peso porcentual de cada variable en la predicción. La pestaña **Advanced metrics** contiene la **Matriz de Confusión** (Confusion Matrix) y métricas detalladas.

**Interpretación de la Matriz de Confusión:**

La matriz de confusión es una tabla de 2x2 que cruza las predicciones del modelo con los valores reales. Para acceder a ella, haga clic en la pestaña **Advanced metrics** dentro de la pestaña **Analyze**. SageMaker Canvas presenta esta matriz con los siguientes cuadrantes:

- **Verdadero Positivo (VP)**: El modelo predijo "Llueve" y efectivamente llovió. Predicción correcta.
- **Verdadero Negativo (VN)**: El modelo predijo "No llueve" y efectivamente no llovió. Predicción correcta.
- **Falso Positivo (FP)**: El modelo predijo "Llueve" pero no llovió. Este error genera alertas innecesarias y desperdicio de recursos preventivos.
- **Falso Negativo (FN)**: El modelo predijo "No llueve" pero sí llovió. **Este es el error de mayor impacto** para la prevención de desastres y la planificación agrícola, ya que significa que un evento de lluvia pasó desapercibido para el modelo, impidiendo la activación de alertas tempranas y medidas preventivas.

1. En la pestaña **Analyze** del modelo, haga clic en la sub-pestaña **Advanced metrics**. Localice la sección de la **Confusion matrix** (Matriz de Confusión). Identifique los cuatro cuadrantes (VP, VN, FP, FN) y observe la distribución de predicciones correctas e incorrectas.

2. Preste especial atención al valor de **Falsos Negativos (FN)**: este número representa los días en que el modelo predijo "No llueve" cuando en realidad sí llovió. En aplicaciones de prevención de desastres, gestión de recursos hídricos y planificación agrícola, minimizar los Falsos Negativos es prioritario porque una lluvia no detectada puede tener consecuencias graves.

3. Revise las métricas de desempeño del modelo en la tabla **Metrics** de la pestaña **Advanced metrics**:
   - **Accuracy (Exactitud)**: Porcentaje total de predicciones correctas. Tenga en cuenta que esta métrica puede ser engañosa en datasets desbalanceados, como se explica en la sección [Sesgo de Datos (Bias)](CONCEPTOS-ML.md#9-sesgo-de-datos-bias) de la Guía de Conceptos de ML.
   - **Precision (Precisión)**: De todos los días que el modelo predijo "Llueve", cuántos realmente llovieron. Fórmula: VP / (VP + FP).
   - **Recall (Sensibilidad)**: De todos los días que realmente llovió, cuántos detectó el modelo. Fórmula: VP / (VP + FN). Un Recall alto indica que el modelo es efectivo detectando eventos de lluvia.
   - **F1 Score**: Media armónica de Precision y Recall. Fórmula: 2 * (Precision * Recall) / (Precision + Recall). Es la métrica más equilibrada para evaluar el desempeño general del modelo.

4. Regrese a la sub-pestaña **Overview** dentro de la pestaña **Analyze**. Localice la sección de **Column impact** (Impacto de Columnas). SageMaker Canvas asigna un peso porcentual a cada variable según cuánto influye en la decisión final del modelo.

5. Verifique que la columna `Punto_Rocio_Aproximado` creada en el Paso 5 tiene un **peso relevante** en la sección de **Column impact**. Esto confirma que la ingeniería de características realizada aporta valor predictivo al modelo y que el indicador meteorológico derivado contribuye a la capacidad de predicción de lluvia.

6. Observe qué otras variables tienen mayor peso en la decisión del modelo (por ejemplo, `Humedad`, `Nubosidad`, `Precipitacion`). Esto permite comprender qué factores meteorológicos son más determinantes para la predicción de lluvia según el modelo entrenado.

**✓ Verificación**: Tras completar la evaluación del modelo, confirme que:
- La matriz de confusión en la pestaña **Advanced metrics** muestra los cuatro cuadrantes (VP, VN, FP, FN) con valores numéricos.
- Identificó los Falsos Negativos como el error de mayor impacto para prevención de desastres y planificación agrícola.
- Las métricas de Accuracy, Precision, Recall y F1 Score son visibles en la tabla de métricas avanzadas.
- La columna `Punto_Rocio_Aproximado` aparece con un peso relevante en la sección de **Column impact** de la pestaña **Overview**.

---

### Paso 8: Auditoría de Código — View Notebook

En este paso accederá al notebook Python generado automáticamente por Amazon SageMaker Canvas para auditar el código fuente del modelo. Aunque no escribió una sola línea de código durante el laboratorio, SageMaker Canvas documentó internamente cada operación — desde la importación de datos hasta el entrenamiento — en un notebook Python ejecutable. Esto demuestra que el enfoque Low-Code es completamente transparente, auditable y convertible en código de producción.

**Acceso al notebook generado:**

1. Desde la pestaña **Analyze** del modelo `modelo-lluvia-{nombre-participante}`, localice el icono de **More options** (tres puntos verticales ⋮) en la barra superior de la página del modelo. Haga clic en este icono para desplegar el menú de opciones.

2. En el menú desplegado, seleccione la opción **View Notebook**. SageMaker Canvas mostrará una ventana emergente con el contenido del notebook Python generado automáticamente.

3. Haga clic en **Download** para descargar el notebook a su máquina local, o en **Copy S3 URI** para copiar la ubicación del notebook en Amazon S3.

4. El notebook contiene el código Python completo que SageMaker Canvas utilizó para ejecutar todo el flujo de trabajo de Machine Learning, incluyendo:
   - Importación de librerías (`pandas`, `sagemaker`, `boto3`, entre otras).
   - Carga y preprocesamiento del dataset `weather-forecast-data.csv`.
   - Creación de las columnas derivadas, incluyendo `Punto_Rocio_Aproximado`.
   - Configuración y ejecución del entrenamiento del modelo con AutoML.
   - Evaluación del modelo y generación de métricas de desempeño.

**Localización del código de la fórmula del Punto de Rocío Aproximado:**

5. Desplácese por las celdas del notebook hasta localizar la sección de preprocesamiento o ingeniería de características (Feature Engineering). Busque el bloque de código de la librería Pandas que ejecuta la fórmula del `Punto_Rocio_Aproximado`.

6. Identifique la línea de código que implementa la fórmula. El código Pandas tendrá una estructura similar a la siguiente:

   ```python
   df["Punto_Rocio_Aproximado"] = df["Temperatura"] - ((100 - df["Humedad"]) / 5)
   ```

   Esta línea confirma que la operación de Feature Engineering que usted configuró visualmente en el Paso 5 fue traducida internamente por SageMaker Canvas a código Python ejecutable utilizando la librería Pandas.

7. Revise las celdas adicionales del notebook para observar cómo SageMaker Canvas estructuró el flujo completo de entrenamiento en código Python. Observe que cada paso que usted realizó mediante la interfaz visual tiene su equivalente en código: la carga de datos, la transformación de columnas, la selección de la variable objetivo, la división de datos y el entrenamiento del modelo.

**Importancia de la auditoría de código:**

El notebook generado demuestra un principio fundamental del enfoque Low-Code de SageMaker Canvas: la transparencia total del proceso. Aunque el participante interactuó exclusivamente con la interfaz visual, el código Python subyacente está disponible para:

- **Auditoría**: Verificar exactamente qué operaciones se ejecutaron sobre los datos y qué algoritmos se utilizaron para entrenar el modelo.
- **Reproducibilidad**: Ejecutar el mismo notebook en Amazon SageMaker Studio u otro entorno de desarrollo para reproducir los resultados de forma independiente.
- **Transición a producción**: Utilizar el código generado como punto de partida para construir pipelines de ML automatizados, adaptando y extendiendo el código según las necesidades del proyecto.

**✓ Verificación**: Tras revisar el notebook generado, confirme que:
- El notebook Python se abrió correctamente desde el icono **More options** (⋮) > **View Notebook**.
- Localizó el código Pandas que implementa la fórmula `Temperatura - ((100 - Humedad) / 5)` para la columna `Punto_Rocio_Aproximado`.
- El notebook contiene el código completo del flujo de trabajo: carga de datos, preprocesamiento, Feature Engineering, entrenamiento y evaluación del modelo.
- Comprende que el enfoque Low-Code de SageMaker Canvas es auditable y que el código generado es convertible en código de producción.


---

## Ciclo de Vida de Recursos

⚠️ **Importante**: NO elimine los modelos, datasets ni configuraciones de Amazon SageMaker Canvas creados durante este laboratorio. Estos recursos serán utilizados en los laboratorios posteriores (Lab 02 a Lab 05) de la serie AWS AI Essentials.

Los recursos que debe conservar incluyen:

- El dataset `weather-forecast-{nombre-participante}` importado en SageMaker Canvas.
- El modelo `modelo-lluvia-{nombre-participante}` entrenado con Quick Build.
- La columna derivada `Punto_Rocio_Aproximado` creada durante la ingeniería de características.
- Cualquier configuración de perfil de usuario en SageMaker Canvas.

---

## Solución de Problemas

Si encuentra dificultades durante este laboratorio, consulte la [Guía de Solución de Problemas](../TROUBLESHOOTING.md) que contiene soluciones a errores comunes.

**Errores que requieren asistencia del instructor:**
- Errores de permisos IAM
- Errores de límites de cuota de AWS
