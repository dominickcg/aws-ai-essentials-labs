# **Requerimientos del Día 4 \- Workshop BCRP**

La duración del laboratorio del día 1 se especifica en este documento.

### **Laboratorio 4.1: Machine Learning Low-Code (SageMaker Canvas)**

**Duración:** 40 minutos.

**Descripción:** Implementación de un modelo de aprendizaje automático para la supervisión de la estabilidad financiera, enfocado en detectar proactivamente carteras de crédito con alto riesgo de incumplimiento (Default) dentro del sistema financiero.

**Objetivo principal:** Construir un modelo de referencia (Benchmark) de riesgo crediticio utilizando una interfaz visual, aplicando ingeniería de características para calcular ratios de solvencia y auditando el código Python generado para asegurar la transparencia del algoritmo ante auditorías técnicas.

**Requerimiento 1: Nivelación Conceptual y Glosario Técnico de Machine Learning (Ubiquitous)**  
El sistema deberá proveer un marco teórico fundamental en la guía del laboratorio que defina el paradigma de aprendizaje automático y las fases de su ciclo de vida para nivelar el conocimiento del equipo técnico, así como estandarizar el conocimiento sobre tipos de modelos y métricas de evaluación antes de la construcción del prototipo.

* **Criterio de Aceptación 1.1:** La guía debe definir el Paradigma de Machine Learning frente a la Programación Tradicional:  
  * Programación Tradicional: El humano ingresa Reglas \+ Datos para obtener Respuestas.  
  * Machine Learning (ML): El humano ingresa Datos \+ Respuestas (Históricas) para que la máquina descubra las Reglas.  
  * Aprendizaje Supervisado: Tipo de ML donde el modelo aprende de un dataset "etiquetado" (conocemos la respuesta correcta histórica, en este caso, quién cayó en default y quién no).  
* **Criterio de Aceptación 1.2:** Se deben detallar las fases del Ciclo de Vida del ML (ML Pipeline) que SageMaker Canvas automatiza:  
  * 1\. Preprocesamiento (Data Wrangling): Limpieza de datos, manejo de valores nulos y normalización de escalas.  
  * 2\. Ingeniería de Características (Feature Engineering): Proceso creativo de transformar datos brutos en atributos matemáticos que facilitan el aprendizaje (ej. crear el ratio deuda/ingreso).  
  * 3\. Entrenamiento (Training): Proceso iterativo donde el algoritmo ajusta sus parámetros internos para minimizar el error de predicción.  
  *   
  * 4\. Evaluación: Medición del desempeño del modelo frente a datos que nunca ha visto.  
* **Criterio de Aceptación 1.3:** La guía debe explicar el concepto crítico de Generalización vs. Sobreajuste (Overfitting):  
  * Generalización: Capacidad del modelo de predecir correctamente en datos nuevos del mundo real.  
  * Sobreajuste (Overfitting): Cuando el modelo "memoriza" los datos de entrenamiento (ruido incluido) en lugar de aprender el patrón, fallando al predecir nuevos casos.  
  * División de Datos (Train/Validation Split): Técnica para evitar el sobreajuste, separando usualmente el 80% de datos para entrenar y el 20% para validar.  
* **Criterio de Aceptación 1.4:** La guía del laboratorio debe diferenciar los Roles de los Datos:  
  * Target (Variable Objetivo): La columna que el modelo intentará predecir (en este caso, Estado\_Credito).  
  * Features (Características): Las variables de entrada (edad, ingresos, mora) que el modelo utiliza como insumo para encontrar patrones.  
  * Dataset: El conjunto total de datos históricos estructurados.  
* **Criterio de Aceptación 1.5:** Se debe definir el Tipo de Problema:  
  * Clasificación Binaria: Modelo diseñado para predecir una de dos clases mutuamente excluyentes (0 o 1, Sí o No). Se debe distinguir de la "Regresión" (que predice números continuos como precios) y de la "Clasificación Multiclase".  
* **Criterio de Aceptación 1.6:** La guía debe explicar las Métricas de Evaluación críticas para modelos desbalanceados:  
  * Matriz de Confusión: Tabla de 2x2 que cruza la realidad con la predicción.  
    * Falso Negativo (FN): El modelo predijo "Sano" (0) pero el cliente era "Default" (1). Nota: Se debe enfatizar que este es el error más peligroso para el BCRP (riesgo invisible).  
  * Accuracy (Exactitud): Porcentaje total de aciertos. Nota: Se debe explicar que puede ser una métrica engañosa en fraude/riesgo (si el 99% paga bien, un modelo que diga "nadie debe nada" tiene 99% de exactitud pero nulo valor de negocio).  
  * F1 Score: Métrica que combina la precisión y la sensibilidad (Recall). Es el estándar para medir el equilibrio del modelo.  
* **Criterio de Aceptación 1.7:** Se deben aclarar los conceptos de AutoML e Interpretabilidad:  
  * Train/Validate Split: División automática de los datos (ej. 80% para aprender, 20% para examinarse) para evitar que el modelo memorice los datos (Overfitting).  
  * Feature Importance (Importancia de Características): Asignación de un peso porcentual a cada variable según cuánto influye en la decisión final, vital para la explicabilidad regulatoria.

**Requerimiento 2: Alineación Conceptual y Diccionario de Datos de Negocio (Ubiquitous)**  
El sistema deberá proporcionar una base conceptual detallada mediante un diccionario de datos y contexto de negocio en la guía del laboratorio para asegurar que el equipo técnico comprenda las variables antes de la manipulación de datos.

* **Criterio de Aceptación 2.1:** La guía del laboratorio debe definir explícitamente el Diccionario de Datos del archivo bcrp-credit-risk.csv:  
  * ID\_Prestamo: Identificador técnico de la operación.  
  * Ingreso\_Mensual: Flujo de caja neto del cliente (Capacidad de generación de recursos).  
  * Monto\_Cuota: Obligación periódica de pago (Carga de la deuda).  
  * Dias\_Mora: Variable de comportamiento; días de retraso a la fecha de corte.  
  * Historial\_Crediticio: Calificación cualitativa del comportamiento pasado.  
  * Estado\_Credito: Variable objetivo (0 \= Normal / 1 \= Default).  
* **Criterio de Aceptación 2.2:** La guía debe establecer el Contexto de Negocio: La entidad utiliza estos modelos para realizar "Pruebas de Estrés", identificando si un aumento en el incumplimiento (Default) podría comprometer la estabilidad del sistema financiero peruano.

**Requerimiento 3: Ingesta e Interpretación Técnica de Datos (Ubiquitous)**  
El sistema deberá permitir la carga de datos masivos y el perfilado estadístico para validar la calidad de la información financiera.

* **Criterio de Aceptación 3.1:** El participante debe importar con éxito el dataset en SageMaker Canvas, verificando que el sistema reconozca correctamente los tipos de datos (numéricos y categóricos).  
* **Criterio de Aceptación 3.2:** Se debe realizar un perfilado de datos para confirmar la ausencia de valores nulos en columnas críticas como Monto\_Cuota e Ingreso\_Mensual.  
* **Criterio de Aceptación 3.3:** El participante debe validar en la matriz de correlación que existe una relación estadística entre Dias\_Mora y Estado\_Credito, confirmando la viabilidad técnica del modelo.

**Requerimiento 4: Ingeniería de Características con Sustento Financiero (Event-driven)**  
Cuando el usuario transforme los datos, el sistema deberá permitir la creación de indicadores de solvencia mediante fórmulas basadas en el sustento técnico del ratio de endeudamiento.

* **Criterio de Aceptación 4.1:** El participante debe crear una nueva columna calculada para medir el Ratio de Endeudamiento (DTI \- Debt to Income).  
* **Criterio de Aceptación 4.2:** La fórmula aplicada debe ser: Monto\_Cuota / Ingreso\_Mensual.  
* **Criterio de Aceptación 4.3:** El participante debe validar el siguiente sustento técnico-financiero del ratio:  
  * Explicación: Si el ratio supera el 0.40 (40%), indica que el deudor destina una porción excesiva de sus ingresos al servicio de la deuda, aumentando exponencialmente su vulnerabilidad ante choques económicos.

**Requerimiento 5: Entrenamiento y Evaluación de Riesgo Sistémico (Ubiquitous)**  
El sistema deberá entrenar un modelo predictivo y presentar métricas de error que permitan evaluar el riesgo de subestimar el incumplimiento financiero.

* **Criterio de Aceptación 5.1:** Ejecutar un "Quick Build" (entrenamiento rápido) seleccionando Estado\_Credito como la variable objetivo.  
* **Criterio de Aceptación 5.2:** El participante debe interpretar la Matriz de Confusión, identificando los Falsos Negativos (Créditos en incumplimiento que el modelo clasificó como sanos), comprendiendo que este error es el de mayor impacto negativo para la supervisión de estabilidad.  
* **Criterio de Aceptación 5.3:** Verificar en el análisis de importancia de variables que el Ratio\_Endeudamiento creado tiene un peso relevante en la decisión del modelo.

**Requerimiento 6: Auditoría de Código y Transparencia Regulatoria (State-driven)**  
Mientras el modelo sea un prototipo funcional, el sistema deberá generar el código fuente en Python para permitir la revisión de la lógica por parte de los desarrolladores de TI.

* **Criterio de Aceptación 6.1:** El participante debe utilizar la función "View Notebook" para acceder a la lógica automatizada.  
* **Criterio de Aceptación 6.2:** En el notebook generado, el participante debe localizar el código de la librería Pandas que ejecuta la fórmula del ratio de endeudamiento, validando que el enfoque "Low-Code" es auditable y convertible en código de producción.