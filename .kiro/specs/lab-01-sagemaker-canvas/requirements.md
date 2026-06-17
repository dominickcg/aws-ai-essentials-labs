# Documento de Requerimientos

## Introducción

Laboratorio 1: Machine Learning Low-Code con Amazon SageMaker Canvas, enfocado en pronóstico meteorológico. Este laboratorio guía al participante en la construcción de un modelo de clasificación binaria para predecir la ocurrencia de lluvia utilizando datos meteorológicos históricos, aplicando ingeniería de características para calcular indicadores derivados y auditando el código Python generado automáticamente.

Este es el primero de una serie de 5 laboratorios (Lab 01 a Lab 05) que exploran progresivamente los servicios de inteligencia artificial, aprendizaje automático e IA generativa de AWS.

Duración estimada: 40 minutos.

Objetivo principal: Construir un modelo de referencia (Benchmark) de predicción de lluvia utilizando la interfaz visual de SageMaker Canvas, aplicando ingeniería de características para calcular un indicador meteorológico derivado (Punto de Rocío Aproximado) y auditando el código Python generado para comprender la transparencia del algoritmo.

Nota sobre el modelo simplificado: Este laboratorio utiliza un modelo simplificado con fines didácticos. Los modelos meteorológicos operacionales reales de agencias como SENAMHI, NOAA y ECMWF incorporan datos de mayor resolución: series temporales horarias, datos de radar, imágenes satelitales y modelos numéricos de predicción del tiempo. El laboratorio demuestra el flujo de trabajo de ML y las capacidades de SageMaker Canvas utilizando un dataset simplificado pero representativo. El enfoque de clasificación (lluvia sí/no) es una simplificación válida del problema real más complejo de predecir cuándo, cuánto y dónde lloverá.

## Glosario

- **Aprendizaje_No_Supervisado**: Tipo de aprendizaje automático donde el modelo encuentra patrones ocultos en datos sin etiquetas predefinidas.
- **Aprendizaje_Por_Refuerzo**: Tipo de aprendizaje automático donde el modelo aprende mediante prueba y error, recibiendo recompensas o penalizaciones.
- **Aprendizaje_Supervisado**: Tipo de aprendizaje automático donde el modelo aprende de un dataset etiquetado, es decir, donde se conoce la respuesta correcta histórica para cada observación.
- **Archivo_Soporte**: Archivo complementario proporcionado en la carpeta del laboratorio que el Participante utiliza durante la ejecución (ej. `weather-forecast-data.csv`).
- **Clasificacion_Binaria**: Tipo de problema de aprendizaje automático donde el modelo predice una de dos clases mutuamente excluyentes.
- **Dataset_Meteorologico**: Conjunto de datos históricos estructurados con 400 observaciones meteorológicas diarias contenido en el archivo `weather-forecast-data.csv`, superando el mínimo de 250 filas recomendado por SageMaker Canvas para un entrenamiento confiable.
- **Directrices_Laboratorio**: Conjunto de reglas y estándares definidos en `directrices-laboratorios.md` que gobiernan la estructura, formato y contenido de toda la documentación del laboratorio.
- **Documentacion_AWS**: Documentación oficial de AWS utilizada como fuente de verdad para validar la precisión del contenido del laboratorio.
- **Documento_Troubleshooting**: Documento separado (`TROUBLESHOOTING.md`) que contiene soluciones a errores comunes organizados por laboratorio.
- **Falso_Negativo**: Error donde el modelo predice "No llueve" (0) cuando en realidad llovió (1).
- **Falso_Positivo**: Error donde el modelo predice "Llueve" (1) cuando en realidad no llovió (0).
- **Feature_Engineering**: Proceso de transformar datos brutos en atributos matemáticos que facilitan el aprendizaje del modelo.
- **Guia_Conceptos_ML**: Documento separado (`CONCEPTOS-ML.md`) ubicado en la carpeta del laboratorio que contiene el marco teórico fundamental de Machine Learning, incluyendo definiciones, tipos de aprendizaje, métricas de evaluación y conceptos clave necesarios para interpretar los resultados del laboratorio. Tiene estructura similar al README del laboratorio (título con emoji, índice con anclas, secciones organizadas pedagógicamente).
- **Guia_Laboratorio**: Documento README del laboratorio que contiene las instrucciones paso a paso y el diccionario de datos. El marco teórico de Machine Learning se encuentra en el documento separado Guia_Conceptos_ML.
- **Hiperparametros**: Configuraciones externas que controlan cómo aprende el modelo, ajustados automáticamente por AutoML en SageMaker Canvas.
- **Inferencia**: Proceso de utilizar un modelo entrenado para hacer predicciones sobre datos nuevos.
- **Matriz_Confusion**: Tabla de 2x2 que cruza las predicciones del modelo con los valores reales para evaluar el desempeño.
- **MCP_Server_AWS_Docs**: Servidor MCP de documentación de AWS utilizado para verificar y validar el contenido del laboratorio contra la documentación oficial.
- **Modelo_Predictivo**: Algoritmo de aprendizaje automático entrenado para predecir la ocurrencia de lluvia a partir de variables meteorológicas.
- **Parametros_Modelo**: Valores internos que el modelo ajusta automáticamente durante el entrenamiento para capturar los patrones de los datos.
- **Participante**: Usuario que ejecuta el laboratorio siguiendo las instrucciones de la guía.
- **Precision_Metrica**: Proporción de predicciones positivas correctas sobre el total de predicciones positivas. Fórmula: VP / (VP + FP).
- **Punto_Rocio_Aproximado**: Característica derivada calculada mediante la aproximación de Magnus (`Temperatura - ((100 - Humedad) / 5)`), que estima la temperatura a la cual el aire se satura y el vapor de agua comienza a condensarse. Un Punto_Rocio_Aproximado superior a 18°C combinado con un diferencial pequeño respecto a la temperatura ambiente indica alta probabilidad de precipitación. Es un indicador real utilizado por agencias meteorológicas a nivel mundial.
- **Quick_Build**: Modo de entrenamiento rápido de SageMaker Canvas que permite obtener un modelo funcional en minutos para prototipado.
- **Recall_Metrica**: Proporción de positivos reales correctamente identificados. Fórmula: VP / (VP + FN).
- **SageMaker_Canvas**: Servicio de AWS que proporciona una interfaz visual para construir modelos de aprendizaje automático sin escribir código.
- **Sesgo_Datos**: Cuando el dataset no representa equitativamente la realidad, causando que el modelo favorezca ciertas predicciones sobre otras.
- **Variable_Objetivo**: Columna `Lluvia` del dataset que el modelo intentará predecir (0 = No llueve, 1 = Llueve).
- **Verdadero_Negativo**: Predicción correcta donde el modelo predice "No llueve" (0) y efectivamente no llovió.
- **Verdadero_Positivo**: Predicción correcta donde el modelo predice "Llueve" (1) y efectivamente llovió.

## Requerimientos

### Requerimiento 1: Nivelación Conceptual y Glosario Técnico de Machine Learning (Documento Separado)

**User Story:** Como participante del laboratorio, quiero disponer de un documento de referencia separado con los conceptos fundamentales de aprendizaje automático, para poder consultarlo antes y durante la ejecución del laboratorio sin interrumpir el flujo de las instrucciones prácticas.

#### Criterios de Aceptación

1. THE Guia_Conceptos_ML SHALL existir como un archivo separado `CONCEPTOS-ML.md` dentro de la carpeta del laboratorio, con la siguiente estructura:
   - Título con un único emoji al inicio (ej. "📘 Conceptos Fundamentales de Machine Learning")
   - Índice (tabla de contenidos) con enlaces de ancla a cada sección
   - Secciones organizadas en orden pedagógico de lo básico a lo avanzado
   - Formato consistente con el estilo del README del laboratorio según las Directrices_Laboratorio

2. THE Guia_Conceptos_ML SHALL definir el Paradigma de Machine Learning frente a la Programación Tradicional, incluyendo:
   - Programación Tradicional: El humano ingresa Reglas + Datos para obtener Respuestas.
   - Machine Learning (ML): El humano ingresa Datos + Respuestas (Históricas) para que la máquina descubra las Reglas.
   - Modelo: Representación matemática de los patrones aprendidos por el algoritmo a partir de los datos históricos. Es el artefacto resultante del proceso de entrenamiento que permite hacer predicciones sobre datos nuevos.

3. THE Guia_Conceptos_ML SHALL explicar los Tipos de Aprendizaje Automático, incluyendo:
   - Aprendizaje_Supervisado: Tipo de ML donde el modelo aprende de un dataset "etiquetado" (conocemos la respuesta correcta histórica, en este caso, qué días llovió y qué días no). Este laboratorio utiliza este tipo de aprendizaje.
   - Aprendizaje_No_Supervisado (mención breve): Tipo de ML donde el modelo encuentra patrones ocultos en datos sin etiquetas (ej. agrupación de patrones climáticos similares). No se utiliza en este laboratorio pero es importante para contextualizar el panorama del aprendizaje automático.
   - Aprendizaje_Por_Refuerzo (mención breve): Tipo de ML donde el modelo aprende mediante prueba y error, recibiendo recompensas o penalizaciones por sus acciones. No se utiliza en este laboratorio.
   - Nota: SageMaker_Canvas se enfoca en Aprendizaje_Supervisado.

4. THE Guia_Conceptos_ML SHALL definir el Tipo de Problema como Clasificacion_Binaria, incluyendo:
   - Clasificacion_Binaria: Modelo diseñado para predecir una de dos clases mutuamente excluyentes (0 = No llueve, 1 = Llueve).
   - Distinguir de Regresión: Tipo de problema que predice números continuos (como la temperatura exacta en grados Celsius).
   - Distinguir de Clasificación Multiclase: Tipo de problema que predice entre tres o más categorías (como tipo de precipitación: lluvia, nieve, granizo).

5. THE Guia_Conceptos_ML SHALL diferenciar los Roles de los Datos dentro del modelo:
   - Target (Variable_Objetivo): La columna que el modelo intentará predecir (en este caso, `Lluvia`).
   - Features (Características): Las variables de entrada (`Temperatura`, `Humedad`, `Presion_Atmosferica`, `Velocidad_Viento`, `Nubosidad`, `Mes`) que el modelo utiliza como insumo para encontrar patrones.
   - Dataset: El conjunto total de datos históricos estructurados (`weather-forecast-data.csv`).

6. THE Guia_Conceptos_ML SHALL detallar las fases del Ciclo de Vida del ML (ML Pipeline) que SageMaker_Canvas automatiza:
   - Preprocesamiento (Data Wrangling): Limpieza de datos, manejo de valores nulos y normalización de escalas.
   - Ingeniería de Características (Feature_Engineering): Proceso creativo de transformar datos brutos en atributos matemáticos que facilitan el aprendizaje (ej. crear el Punto_Rocio_Aproximado a partir de temperatura y humedad).
   - Entrenamiento (Training): Proceso iterativo donde el algoritmo ajusta sus parámetros internos para minimizar el error de predicción.
   - Evaluación: Medición del desempeño del modelo frente a datos que nunca ha visto.

7. THE Guia_Conceptos_ML SHALL explicar la diferencia entre Parametros_Modelo e Hiperparametros:
   - Parametros_Modelo: Valores internos que el modelo ajusta automáticamente durante el entrenamiento (ej. pesos asignados a cada variable). El Participante no los configura directamente.
   - Hiperparametros: Configuraciones externas que controlan cómo aprende el modelo (ej. número de iteraciones, profundidad del árbol de decisión). En SageMaker_Canvas, el AutoML ajusta los Hiperparametros automáticamente, eliminando la necesidad de configuración manual por parte del Participante.

8. THE Guia_Conceptos_ML SHALL explicar el concepto de Generalización frente a Sobreajuste (Overfitting), incluyendo:
   - Generalización: Capacidad del modelo de predecir correctamente en datos nuevos del mundo real.
   - Sobreajuste (Overfitting): Cuando el modelo "memoriza" los datos de entrenamiento (ruido incluido) en lugar de aprender el patrón, fallando al predecir nuevos casos.
   - División de Datos (Train/Validation Split): Técnica para evitar el sobreajuste, separando usualmente el 80% de datos para entrenar y el 20% para validar.

9. THE Guia_Conceptos_ML SHALL explicar la División de Datos en los tres subconjuntos fundamentales:
   - Datos de Entrenamiento (Training Set): Subconjunto usado para que el modelo aprenda los patrones (típicamente 70-80% del dataset total).
   - Datos de Validación (Validation Set): Subconjunto usado durante el entrenamiento para ajustar Hiperparametros y detectar sobreajuste (típicamente 10-20%).
   - Datos de Prueba (Test Set): Subconjunto reservado que el modelo nunca ve durante el entrenamiento ni la validación, usado como evaluación final independiente de la capacidad de generalización.
   - Nota: SageMaker_Canvas gestiona automáticamente esta división de datos.

10. THE Guia_Conceptos_ML SHALL explicar el concepto de Sesgo_Datos (Bias) en el contexto del dataset meteorológico:
    - Sesgo_Datos (Bias): Cuando el dataset no representa equitativamente la realidad. En el contexto meteorológico, si el dataset contiene mayoritariamente días sin lluvia (desbalance de clases), el modelo puede sesgarse hacia predecir "No llueve" con mayor frecuencia, subestimando los eventos de lluvia.
    - Nota: Este concepto es especialmente relevante para entender por qué la Accuracy puede ser una métrica engañosa (se profundiza en la sección de métricas de evaluación).

11. THE Guia_Conceptos_ML SHALL explicar las Métricas de Evaluación críticas para modelos desbalanceados, incluyendo:
    - Matriz_Confusion: Tabla de 2x2 que cruza la realidad con la predicción, compuesta por cuatro cuadrantes:
      - Verdadero_Positivo (VP): El modelo predijo "Llueve" y efectivamente llovió. Predicción correcta.
      - Verdadero_Negativo (VN): El modelo predijo "No llueve" y efectivamente no llovió. Predicción correcta.
      - Falso_Positivo (FP): El modelo predijo "Llueve" pero no llovió. Error que genera alertas innecesarias y desperdicio de recursos.
      - Falso_Negativo (FN): El modelo predijo "No llueve" pero sí llovió. Error de mayor impacto para planificación agrícola, prevención de inundaciones y seguridad de la aviación.
    - Precision_Metrica (Precisión): De todos los días que el modelo predijo "Llueve", cuántos realmente llovieron. Fórmula: VP / (VP + FP). Mide la confiabilidad de las alertas de lluvia.
    - Recall_Metrica (Sensibilidad/Exhaustividad): De todos los días que realmente llovió, cuántos detectó el modelo. Fórmula: VP / (VP + FN). Mide la capacidad de no dejar pasar eventos de lluvia.
    - Accuracy (Exactitud): Porcentaje total de aciertos. Explicar que puede ser una métrica engañosa en datasets desbalanceados (si el 85% de los días no llueve, un modelo que siempre diga "No llueve" tendría 85% de exactitud pero nulo valor predictivo).
    - F1 Score: Media armónica de Precision_Metrica y Recall_Metrica, siendo el estándar para medir el equilibrio del modelo. Fórmula: 2 * (Precision * Recall) / (Precision + Recall).

12. THE Guia_Conceptos_ML SHALL explicar el concepto de Inferencia (Predicción):
    - Inferencia: Proceso de utilizar el modelo ya entrenado para hacer predicciones sobre datos nuevos que no formaron parte del entrenamiento. En SageMaker_Canvas, esto se realiza mediante la funcionalidad de predicción individual o por lotes (batch prediction).

13. THE Guia_Conceptos_ML SHALL aclarar los conceptos de AutoML e Interpretabilidad:
    - AutoML: SageMaker_Canvas automatiza la selección de algoritmos, ajuste de Hiperparametros y optimización del modelo.
    - Train/Validate Split: División automática de los datos para evitar que el modelo memorice los datos (Overfitting).
    - Feature Importance (Importancia de Características): Asignación de un peso porcentual a cada variable según cuánto influye en la decisión final del modelo, permitiendo comprender qué factores meteorológicos son más determinantes para la predicción de lluvia.

14. THE Guia_Conceptos_ML SHALL utilizar terminología de Machine Learning consistente con la Documentacion_AWS oficial de SageMaker Canvas, verificando que los nombres de funcionalidades, métricas y conceptos coincidan con los utilizados en la documentación del servicio.

15. THE Guia_Laboratorio SHALL referenciar la Guia_Conceptos_ML en los siguientes puntos:
    - Al inicio del README, antes de las instrucciones paso a paso, indicando: "Antes de comenzar, revise la [Guía de Conceptos Fundamentales de ML](CONCEPTOS-ML.md) para familiarizarse con los términos y conceptos que se utilizarán durante el laboratorio."
    - En cada paso del laboratorio donde un concepto teórico sea relevante, incluir un enlace contextual a la sección correspondiente de la Guia_Conceptos_ML (ej. al llegar a la Matriz de Confusión, enlazar a la sección de Métricas de Evaluación).

### Requerimiento 2: Alineación Conceptual y Diccionario de Datos Meteorológicos

**User Story:** Como participante del laboratorio, quiero comprender el significado de cada variable del dataset meteorológico y su contexto de aplicación, para poder interpretar los datos correctamente antes de construir el modelo predictivo.

#### Criterios de Aceptación

1. THE Guia_Laboratorio SHALL definir explícitamente el Diccionario de Datos del archivo `weather-forecast-data.csv` con las siguientes columnas:
   - `Fecha`: Fecha de la observación meteorológica en formato YYYY-MM-DD.
   - `Mes`: Mes del año de la observación (1-12), captura patrones estacionales de precipitación.
   - `Temperatura`: Temperatura promedio del día en grados Celsius.
   - `Humedad`: Porcentaje de humedad relativa del aire (0-100).
   - `Presion_Atmosferica`: Presión atmosférica en hectopascales (hPa).
   - `Velocidad_Viento`: Velocidad promedio del viento en kilómetros por hora (km/h).
   - `Nubosidad`: Porcentaje de cobertura nubosa del cielo (0-100).
   - `Precipitacion`: Cantidad de precipitación acumulada en milímetros (mm).
   - `Lluvia`: Variable_Objetivo (0 = No llueve / 1 = Llueve).

2. THE Guia_Laboratorio SHALL establecer el Contexto de Aplicación del pronóstico meteorológico, explicando que los modelos de predicción de lluvia son utilizados en:
   - Planificación agrícola: Decisiones de riego y cosecha basadas en pronósticos.
   - Prevención de desastres: Alertas tempranas ante posibles inundaciones o tormentas.
   - Seguridad en aviación y transporte: Planificación de rutas y operaciones seguras.
   - Gestión de recursos hídricos: Administración de embalses y sistemas de drenaje.

3. THE Guia_Laboratorio SHALL incluir una nota aclaratoria indicando que este laboratorio utiliza un modelo simplificado con fines didácticos, y que los modelos meteorológicos operacionales reales de agencias como SENAMHI, NOAA y ECMWF incorporan datos de mayor resolución (series temporales horarias, datos de radar, imágenes satelitales y modelos numéricos de predicción del tiempo). El enfoque de clasificación binaria (lluvia sí/no) es una simplificación válida del problema real más complejo de predecir cuándo, cuánto y dónde lloverá.

4. THE Dataset_Meteorologico SHALL contener exactamente 400 registros de observaciones meteorológicas diarias, superando el mínimo de 250 filas recomendado por SageMaker Canvas para un entrenamiento de modelo confiable.

### Requerimiento 3: Ingesta e Interpretación Técnica de Datos Meteorológicos

**User Story:** Como participante del laboratorio, quiero cargar el dataset meteorológico en SageMaker Canvas y validar la calidad de los datos, para asegurar que la información es adecuada para entrenar un modelo predictivo confiable.

#### Criterios de Aceptación

1. WHEN el Participante importe el Dataset_Meteorologico en SageMaker_Canvas, THE SageMaker_Canvas SHALL reconocer correctamente los tipos de datos (numéricos y categóricos) de todas las columnas del archivo `weather-forecast-data.csv`.

2. WHEN el Participante realice el perfilado de datos, THE Guia_Laboratorio SHALL indicar que se debe confirmar la ausencia de valores nulos en columnas críticas como `Temperatura`, `Humedad` y `Presion_Atmosferica`.

3. WHEN el Participante revise la matriz de correlación, THE Guia_Laboratorio SHALL indicar que se debe validar que existe una relación estadística entre variables clave (como `Humedad`, `Nubosidad` y `Precipitacion`) y la Variable_Objetivo `Lluvia`, confirmando la viabilidad técnica del modelo.

4. THE Guia_Laboratorio SHALL describir los pasos de navegación en la consola de SageMaker_Canvas para importar datos de manera consistente con la Documentacion_AWS actual del servicio, incluyendo la ruta de navegación explícita en la interfaz.

5. WHEN el Participante importe el Dataset_Meteorologico, THE Guia_Laboratorio SHALL indicar que se debe verificar que el dataset contiene 400 filas de observaciones meteorológicas diarias tras la importación.

### Requerimiento 4: Ingeniería de Características con Sustento Meteorológico

**User Story:** Como participante del laboratorio, quiero crear un indicador meteorológico derivado a partir de los datos existentes, para mejorar la capacidad predictiva del modelo y comprender el proceso de Feature_Engineering.

#### Criterios de Aceptación

1. WHEN el Participante transforme los datos en SageMaker_Canvas, THE SageMaker_Canvas SHALL permitir la creación de una nueva columna calculada denominada `Punto_Rocio_Aproximado` como indicador de probabilidad de precipitación.

2. WHEN el Participante cree la columna `Punto_Rocio_Aproximado`, THE Guia_Laboratorio SHALL especificar la fórmula: `Temperatura - ((100 - Humedad) / 5)`, basada en la aproximación de Magnus para el cálculo del punto de rocío, una fórmula simplificada ampliamente utilizada en meteorología.

3. THE Guia_Laboratorio SHALL explicar el sustento técnico-meteorológico del Punto_Rocio_Aproximado:
   - El punto de rocío (punto de rocío) indica la temperatura a la cual el aire se satura y el vapor de agua comienza a condensarse. Cuando el punto de rocío se aproxima a la temperatura ambiente (diferencia menor a 2-3°C), la probabilidad de precipitación aumenta significativamente. Este es un indicador real utilizado por agencias meteorológicas a nivel mundial. Un Punto_Rocio_Aproximado superior a 18°C combinado con un diferencial pequeño respecto a la temperatura ambiente indica alta probabilidad de precipitación.

### Requerimiento 5: Entrenamiento y Evaluación del Modelo de Pronóstico

**User Story:** Como participante del laboratorio, quiero entrenar un modelo predictivo y evaluar sus métricas de desempeño, para comprender la capacidad del modelo de predecir correctamente la ocurrencia de lluvia.

#### Criterios de Aceptación

1. WHEN el Participante ejecute el entrenamiento, THE SageMaker_Canvas SHALL ejecutar un Quick_Build seleccionando `Lluvia` como la Variable_Objetivo.

2. WHEN el Modelo_Predictivo presente los resultados, THE Participante SHALL interpretar la Matriz_Confusion identificando los Falso_Negativo (días de lluvia que el modelo clasificó como "No llueve"), comprendiendo que este error es el de mayor impacto negativo para la prevención de desastres y la planificación agrícola.

3. WHEN el Participante revise la importancia de variables, THE Guia_Laboratorio SHALL indicar que se debe verificar que el `Punto_Rocio_Aproximado` creado tiene un peso relevante en la decisión del Modelo_Predictivo.

4. THE Guia_Laboratorio SHALL describir los pasos del proceso Quick_Build de manera consistente con la Documentacion_AWS actual de SageMaker_Canvas, verificando que los nombres de botones, opciones y flujos de la interfaz reflejen la versión vigente del servicio.

### Requerimiento 6: Auditoría de Código y Transparencia del Modelo

**User Story:** Como participante del laboratorio, quiero acceder al código Python generado automáticamente por SageMaker Canvas, para comprender la lógica interna del modelo y validar que el enfoque low-code es auditable y reproducible.

#### Criterios de Aceptación

1. WHILE el Modelo_Predictivo sea un prototipo funcional en SageMaker_Canvas, THE SageMaker_Canvas SHALL generar el código fuente en Python accesible mediante la función "View Notebook".

2. WHILE el Participante revise el notebook generado, THE Guia_Laboratorio SHALL indicar que se debe localizar el código de la librería Pandas que ejecuta la fórmula del Punto_Rocio_Aproximado (`Temperatura - ((100 - Humedad) / 5)`), validando que el enfoque "Low-Code" es auditable y convertible en código de producción.

3. THE Guia_Laboratorio SHALL verificar que la funcionalidad "View Notebook" existe y opera según lo descrito en la Documentacion_AWS actual de SageMaker_Canvas, confirmando la disponibilidad de esta característica en la versión vigente del servicio.

### Requerimiento 7: Validación de Contenido contra Documentación Oficial de AWS

**User Story:** Como participante del laboratorio, quiero que todas las instrucciones, pasos de navegación y configuraciones del laboratorio estén validadas contra la documentación oficial de AWS, para evitar confusiones causadas por información desactualizada o incorrecta.

#### Criterios de Aceptación

1. THE Guia_Laboratorio SHALL validar todos los pasos de navegación en la consola de SageMaker_Canvas contra la Documentacion_AWS utilizando el MCP_Server_AWS_Docs, verificando que las rutas de menú, nombres de botones y flujos de la interfaz reflejen la versión actual de la consola de AWS.

2. THE Guia_Laboratorio SHALL validar que la terminología en español utilizada en las instrucciones sea consistente con la interfaz en español de la consola de AWS y con la Documentacion_AWS oficial, incluyendo nombres de servicios, opciones de menú y mensajes del sistema.

3. THE Guia_Laboratorio SHALL validar que las configuraciones de SageMaker_Canvas descritas en el laboratorio (importación de datos, Feature_Engineering, Quick_Build, View Notebook) coincidan con las mejores prácticas actuales documentadas por AWS.

4. IF la Guia_Laboratorio contiene instrucciones que difieren de la Documentacion_AWS actual, THEN THE Guia_Laboratorio SHALL documentar la desviación con una justificación explícita del motivo de la diferencia.

5. THE Guia_Laboratorio SHALL utilizar el MCP_Server_AWS_Docs para buscar la documentación específica de Amazon SageMaker Canvas y verificar que los nombres de parámetros, valores de configuración y recomendaciones de seguridad sean precisos y estén actualizados.

6. THE Guia_Laboratorio SHALL cruzar las instrucciones del laboratorio con las guías oficiales de usuario y desarrollador de AWS para SageMaker Canvas, actualizando cualquier información desactualizada descubierta durante la validación.

### Requerimiento 8: Estructura y Cumplimiento de Directrices de Documentación

**User Story:** Como participante del laboratorio, quiero que la documentación del laboratorio cumpla con todas las directrices de estructura, formato y organización establecidas, para tener una experiencia de aprendizaje consistente, navegable y completa.

#### Criterios de Aceptación

1. THE Guia_Laboratorio SHALL iniciar las instrucciones paso a paso con la verificación de región de AWS como primer paso, indicando al Participante que confirme la región correcta en la esquina superior derecha de la consola de AWS antes de proceder con cualquier otra acción.

2. THE Guia_Laboratorio SHALL incluir un índice (tabla de contenidos) con enlaces de ancla a cada sección del documento, permitiendo la navegación directa a cualquier parte del laboratorio.

3. THE Guia_Laboratorio SHALL incluir al final una sección de "Solución de Problemas" que referencie al Documento_Troubleshooting separado (`TROUBLESHOOTING.md`), indicando que el Participante debe consultar dicho documento ante dificultades y que los errores de permisos IAM o límites de cuota requieren asistencia del instructor.

4. THE Guia_Laboratorio SHALL especificar el ciclo de vida de los recursos creados durante el laboratorio, indicando explícitamente si los modelos, datasets y configuraciones de SageMaker_Canvas deben conservarse para los laboratorios posteriores (Lab 02 a Lab 05) o si deben eliminarse al finalizar.

5. THE Guia_Laboratorio SHALL proporcionar el archivo de soporte `weather-forecast-data.csv` como un Archivo_Soporte separado dentro de la carpeta del laboratorio, y las instrucciones deben referenciar este archivo explícitamente por su nombre y ruta relativa.

6. THE Guia_Laboratorio SHALL utilizar el placeholder `{nombre-participante}` en todos los ejemplos de nombrado de recursos de AWS que requieran identificación del Participante, siguiendo el patrón de nomenclatura definido en las Directrices_Laboratorio.

7. THE Guia_Laboratorio SHALL incluir puntos de verificación visual después de cada paso mayor de creación o configuración de recursos, permitiendo al Participante confirmar que el resultado obtenido coincide con el esperado antes de continuar.

8. THE Guia_Laboratorio SHALL incluir estimaciones de tiempo de espera para operaciones de SageMaker_Canvas que requieran procesamiento prolongado (como el entrenamiento Quick_Build), indicando al Participante el tiempo aproximado y si puede continuar con otros pasos mientras espera.

9. THE Guia_Laboratorio SHALL incluir el título del laboratorio con un único emoji al inicio, seguido del tiempo estimado de finalización y los objetivos de aprendizaje, cumpliendo con las reglas de uso de emojis definidas en las Directrices_Laboratorio.

10. THE Guia_Laboratorio SHALL incluir una sección de prerrequisitos que liste los recursos necesarios antes de iniciar el laboratorio, incluyendo el acceso a SageMaker_Canvas y la disponibilidad del Dataset_Meteorologico.

11. THE Guia_Laboratorio SHALL incluir la Guia_Conceptos_ML (`CONCEPTOS-ML.md`) como un Archivo_Soporte dentro de la carpeta del laboratorio, referenciándolo explícitamente en la sección de prerrequisitos y al inicio de las instrucciones paso a paso.
