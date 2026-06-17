# Plan de Implementación: Lab 01 — Machine Learning Low-Code con Amazon SageMaker Canvas

## Visión General

Implementación incremental de los tres entregables del Laboratorio 01: el documento de conceptos ML (`CONCEPTOS-ML.md`), la guía paso a paso (`README.md`) y el dataset meteorológico (`weather-forecast-data.csv`), junto con pruebas basadas en propiedades usando fast-check y validación contra documentación oficial de AWS.

## Tareas

- [x] 1. Crear la estructura del proyecto y el dataset meteorológico
  - [x] 1.1 Generar el archivo `weather-forecast-data.csv` con exactamente 400 filas de observaciones meteorológicas diarias
    - Crear archivo CSV con encabezados: `Fecha,Mes,Temperatura,Humedad,Presion_Atmosferica,Velocidad_Viento,Nubosidad,Precipitacion,Lluvia`
    - Generar 400 registros con datos realistas: Fecha (YYYY-MM-DD), Mes (1-12), Temperatura (~5-40°C), Humedad (0-100%), Presion_Atmosferica (~980-1040 hPa), Velocidad_Viento (≥0 km/h), Nubosidad (0-100%), Precipitacion (≥0 mm), Lluvia (0 o 1)
    - Asegurar correlación estadística positiva entre Humedad, Nubosidad, Precipitacion y la variable objetivo Lluvia
    - Sin valores nulos en columnas críticas (Temperatura, Humedad, Presion_Atmosferica)
    - Superar el mínimo de 250 filas recomendado por SageMaker Canvas
    - _Requerimientos: 2.1, 2.4, 3.2, 3.3_

  - [x] 1.2 Escribir prueba de propiedad para cantidad de registros del dataset
    - **Propiedad 3: Invariante de cantidad de registros del dataset**
    - **Valida: Requerimiento 2.4**

  - [x] 1.3 Escribir prueba de propiedad para ausencia de valores nulos en columnas críticas
    - **Propiedad 4: Ausencia de valores nulos en columnas críticas del dataset**
    - **Valida: Requerimiento 3.2**

  - [x] 1.4 Escribir prueba de propiedad para correlación estadística del dataset
    - **Propiedad 5: Validez estadística del dataset — correlación con variable objetivo**
    - **Valida: Requerimiento 3.3**

  - [x] 1.5 Escribir prueba de propiedad para la fórmula del Punto de Rocío Aproximado
    - **Propiedad 6: Correctitud de la fórmula del Punto de Rocío Aproximado**
    - Generar pares aleatorios (Temperatura, Humedad) y validar que `Temperatura - ((100 - Humedad) / 5)` produce resultado correcto y ≤ Temperatura
    - **Valida: Requerimiento 4.2**

  - [x] 1.6 Escribir pruebas unitarias para casos de borde de la fórmula del Punto de Rocío
    - Humedad = 0 produce `Temperatura - 20`
    - Humedad = 100 produce `Temperatura` (punto de rocío = temperatura)
    - Fila con valor nulo en Temperatura debe ser rechazada
    - _Requerimientos: 4.2, 3.2_

- [x] 2. Checkpoint — Verificar dataset y pruebas de datos
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Crear el documento CONCEPTOS-ML.md
  - [x] 3.1 Escribir `CONCEPTOS-ML.md` con las 12 secciones pedagógicas requeridas
    - Título con emoji único: `📘 Conceptos Fundamentales de Machine Learning`
    - Índice con enlaces de ancla a cada sección
    - Sección 1: Paradigma ML vs. Programación Tradicional (Reglas+Datos→Respuestas vs. Datos+Respuestas→Reglas, definición de Modelo)
    - Sección 2: Tipos de Aprendizaje Automático (Supervisado, No Supervisado mención breve, Por Refuerzo mención breve, nota sobre SageMaker Canvas)
    - Sección 3: Tipo de Problema — Clasificación Binaria (distinguir de Regresión y Multiclase)
    - Sección 4: Roles de los Datos (Target, Features, Dataset)
    - Sección 5: Ciclo de Vida del ML (Preprocesamiento, Feature Engineering, Entrenamiento, Evaluación)
    - Sección 6: Parámetros del Modelo vs. Hiperparámetros (AutoML en SageMaker Canvas)
    - Sección 7: Generalización vs. Sobreajuste (Overfitting, Train/Validation Split)
    - Sección 8: División de Datos (Training Set, Validation Set, Test Set, nota SageMaker Canvas)
    - Sección 9: Sesgo de Datos (Bias) en contexto meteorológico
    - Sección 10: Métricas de Evaluación (Matriz de Confusión con VP/VN/FP/FN, Precision, Recall, Accuracy engañosa, F1 Score)
    - Sección 11: Inferencia (predicción individual y por lotes)
    - Sección 12: AutoML e Interpretabilidad (Feature Importance)
    - Terminología consistente con documentación oficial de AWS para SageMaker Canvas
    - _Requerimientos: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.12, 1.13, 1.14_

  - [x] 3.2 Escribir prueba de propiedad para estructura de CONCEPTOS-ML.md
    - **Propiedad 1: Estructura válida de CONCEPTOS-ML.md**
    - Validar: emoji único en título, índice con anclas funcionales, 12 secciones en orden pedagógico
    - **Valida: Requerimiento 1.1**

  - [x] 3.3 Escribir pruebas unitarias para contenido de CONCEPTOS-ML.md
    - Verificar presencia de cada una de las 12 secciones requeridas (paradigma ML, tipos de aprendizaje, clasificación binaria, roles de datos, ciclo de vida, parámetros vs hiperparámetros, generalización, división de datos, sesgo, métricas, inferencia, AutoML)
    - _Requerimientos: 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.12, 1.13_

- [x] 4. Checkpoint — Verificar CONCEPTOS-ML.md y pruebas de estructura
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Crear el README.md del laboratorio — Secciones iniciales
  - [x] 5.1 Escribir encabezado, índice, objetivos y prerrequisitos del README
    - Título con emoji único: `🌦️ Laboratorio 1: Machine Learning Low-Code con Amazon SageMaker Canvas`
    - Índice con enlaces de ancla a cada sección
    - Tiempo estimado: 40 minutos
    - Objetivos de aprendizaje (3-4 puntos)
    - Sección de prerrequisitos (acceso a SageMaker Canvas, dataset, referencia explícita a CONCEPTOS-ML.md)
    - Referencia a CONCEPTOS-ML.md antes de instrucciones: "Antes de comenzar, revise la [Guía de Conceptos Fundamentales de ML](CONCEPTOS-ML.md)..."
    - _Requerimientos: 8.2, 8.9, 8.10, 8.11, 1.15_

  - [x] 5.2 Escribir el diccionario de datos, contexto de aplicación y nota de modelo simplificado
    - Diccionario de datos documentando las 9 columnas del CSV con tipos, rangos y descripciones
    - Contexto de aplicación: planificación agrícola, prevención de desastres, seguridad en aviación, gestión de recursos hídricos
    - Nota aclaratoria sobre modelo simplificado vs. modelos operacionales reales (SENAMHI, NOAA, ECMWF)
    - _Requerimientos: 2.1, 2.2, 2.3_

- [x] 6. Crear el README.md del laboratorio — Instrucciones paso a paso
  - [x] 6.1 Escribir Paso 1 (Verificación de región) y Paso 2 (Acceso a SageMaker Canvas)
    - Paso 1 DEBE ser verificación de región AWS (esquina superior derecha de la consola)
    - Paso 2: navegación a SageMaker Canvas con ruta explícita en la interfaz
    - Puntos de verificación visual (`✓ Verificación`) después de cada paso
    - Usar placeholder `{nombre-participante}` en nombrado de recursos
    - _Requerimientos: 8.1, 3.4, 8.6, 8.7_

  - [x] 6.2 Escribir Paso 3 (Importación del dataset) y Paso 4 (Perfilado y validación)
    - Paso 3: importar `weather-forecast-data.csv` referenciando el archivo por nombre y ruta relativa
    - Verificar que SageMaker Canvas reconoce tipos de datos correctamente
    - Verificar 400 filas tras importación
    - Paso 4: perfilado de datos, confirmar ausencia de nulos, revisar matriz de correlación
    - Enlace contextual a sección de Métricas en CONCEPTOS-ML.md donde sea relevante
    - Puntos de verificación visual después de cada paso
    - _Requerimientos: 3.1, 3.2, 3.3, 3.4, 3.5, 8.5, 8.7, 1.15_

  - [x] 6.3 Escribir Paso 5 (Feature Engineering: Punto_Rocio_Aproximado)
    - Crear columna calculada `Punto_Rocio_Aproximado` con fórmula `Temperatura - ((100 - Humedad) / 5)`
    - Explicar sustento técnico-meteorológico (aproximación de Magnus, punto de rocío > 18°C)
    - Enlace contextual a sección de Ciclo de Vida ML / Feature Engineering en CONCEPTOS-ML.md
    - Punto de verificación visual
    - _Requerimientos: 4.1, 4.2, 4.3, 1.15_

  - [x] 6.4 Escribir Paso 6 (Entrenamiento Quick Build) y Paso 7 (Evaluación del modelo)
    - Paso 6: Quick Build seleccionando `Lluvia` como variable objetivo
    - Estimación de tiempo de espera (`⏱️ Nota`) para el entrenamiento
    - Paso 7: interpretar Matriz de Confusión, identificar Falsos Negativos como error de mayor impacto
    - Verificar peso del Punto_Rocio_Aproximado en Feature Importance
    - Enlace contextual a sección de Métricas de Evaluación en CONCEPTOS-ML.md
    - Puntos de verificación visual
    - _Requerimientos: 5.1, 5.2, 5.3, 5.4, 8.7, 8.8, 1.15_

  - [x] 6.5 Escribir Paso 8 (Auditoría de código — View Notebook)
    - Acceder al notebook Python generado mediante "View Notebook"
    - Localizar código Pandas que ejecuta la fórmula del Punto_Rocio_Aproximado
    - Explicar que el enfoque Low-Code es auditable y convertible en código de producción
    - Punto de verificación visual
    - _Requerimientos: 6.1, 6.2, 6.3_

- [x] 7. Completar el README.md — Secciones finales
  - [x] 7.1 Escribir secciones de cierre del README
    - Ciclo de vida de recursos: indicar si modelos/datasets deben conservarse para Labs 02-05 o eliminarse
    - Sección de Solución de Problemas con referencia a `TROUBLESHOOTING.md`
    - Errores que requieren asistencia del instructor (permisos IAM, límites de cuota)
    - _Requerimientos: 8.3, 8.4_

  - [ ]* 7.2 Escribir prueba de propiedad para estructura del README
    - **Propiedad 2: Estructura válida del README del laboratorio**
    - Validar: emoji único en título, índice con anclas, tiempo estimado, objetivos de aprendizaje
    - **Valida: Requerimientos 8.2, 8.9**

  - [ ]* 7.3 Escribir prueba de propiedad para primer paso como verificación de región
    - **Propiedad 7: Primer paso del README es verificación de región**
    - **Valida: Requerimiento 8.1**

  - [ ]* 7.4 Escribir prueba de propiedad para referencias cruzadas a CONCEPTOS-ML.md
    - **Propiedad 8: Referencias cruzadas a CONCEPTOS-ML.md presentes en README**
    - Validar: al menos una referencia en prerrequisitos y al menos un enlace contextual en instrucciones
    - **Valida: Requerimientos 1.15, 8.11**

  - [ ]* 7.5 Escribir prueba de propiedad para placeholder de participante
    - **Propiedad 9: Placeholder {nombre-participante} en nombrado de recursos**
    - **Valida: Requerimiento 8.6**

  - [ ]* 7.6 Escribir prueba de propiedad para puntos de verificación visual
    - **Propiedad 10: Puntos de verificación visual después de pasos mayores**
    - Validar que pasos de importación, feature engineering y entrenamiento tienen `✓ Verificación`
    - **Valida: Requerimiento 8.7**

  - [x] 7.7 Escribir pruebas unitarias para contenido del README
    - Verificar diccionario de datos con 9 columnas, contexto de aplicación, nota modelo simplificado
    - Verificar explicación sustento meteorológico del punto de rocío
    - Verificar guía de interpretación de Falsos Negativos en matriz de confusión
    - Verificar indicación de verificar peso del Punto_Rocio_Aproximado
    - Verificar indicación de localizar código Pandas en notebook
    - Verificar sección de Solución de Problemas con enlace a TROUBLESHOOTING.md
    - Verificar ciclo de vida de recursos, referencia a `weather-forecast-data.csv`, estimaciones de tiempo, prerrequisitos
    - _Requerimientos: 2.1, 2.2, 2.3, 4.3, 5.2, 5.3, 6.2, 8.3, 8.4, 8.5, 8.8, 8.10_

- [x] 8. Checkpoint — Verificar README.md y todas las pruebas de estructura/contenido
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Validación contra documentación oficial de AWS
  - [x] 9.1 Validar pasos de navegación y terminología con MCP Server de documentación AWS
    - Usar MCP Server AWS Docs para verificar rutas de navegación en consola de SageMaker Canvas
    - Verificar nombres de botones, opciones de menú y flujos de interfaz
    - Validar flujos de importación de datos, Feature Engineering, Quick Build y View Notebook
    - Verificar terminología en español consistente con interfaz de AWS
    - Verificar configuraciones contra mejores prácticas documentadas por AWS
    - Documentar desviaciones con justificación explícita si las hubiera
    - Actualizar cualquier información desactualizada descubierta
    - _Requerimientos: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

- [ ] 11. Corregir sección Ciclo de Vida de Recursos — limpieza obligatoria
  - Reemplazar la sección "Ciclo de Vida de Recursos" del README.md para indicar que la limpieza de recursos SÍ es obligatoria al finalizar este laboratorio
  - Incluir pasos numerados para eliminar: modelo, dataset y perfil de usuario en SageMaker Canvas
  - Seguir formato de directrices-laboratorios.md para limpieza
  - _Requerimientos: 8.4_

- [x] 10. Checkpoint final — Verificar todos los entregables y pruebas
  - Ensure all tests pass, ask the user if questions arise.

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requerimientos específicos para trazabilidad
- Los checkpoints aseguran validación incremental
- Las pruebas de propiedad validan propiedades universales de correctitud usando fast-check (JavaScript/TypeScript)
- Las pruebas unitarias validan ejemplos específicos y casos de borde
- Toda la documentación debe estar en español; código, nombres de API y servicios AWS permanecen en inglés
- El placeholder `{nombre-participante}` debe usarse en todos los ejemplos de nombrado de recursos
