# 🧠 Conceptos Fundamentales de IA Generativa

Documento de referencia teórica para el Laboratorio 2 de la serie AWS AI Essentials. Consulte este material antes y durante la ejecución del laboratorio para familiarizarse con los términos y conceptos clave de inteligencia artificial generativa.

---

## Indice

1. [Qué es la IA Generativa](#1-qué-es-la-ia-generativa)
2. [Conceptos Arquitectónicos](#2-conceptos-arquitectónicos)
3. [Predicción de Siguiente Token](#3-predicción-de-siguiente-token)
4. [Prompt y System Prompt](#4-prompt-y-system-prompt)
5. [Familias de Modelos en Amazon Bedrock](#5-familias-de-modelos-en-amazon-bedrock)
6. [Unidades y Métricas](#6-unidades-y-métricas)
7. [Parámetros de Inferencia](#7-parámetros-de-inferencia)
8. [Estrategias de Prompting](#8-estrategias-de-prompting)
9. [Seguridad y Riesgos](#9-seguridad-y-riesgos)
10. [IA Generativa vs. ML Tradicional](#10-ia-generativa-vs-ml-tradicional)
11. [Embeddings y Multimodalidad](#11-embeddings-y-multimodalidad)
12. [Terminología AWS](#12-terminología-aws)

---

## 1. Qué es la IA Generativa

La **IA Generativa** es una rama de la inteligencia artificial que produce contenido nuevo y original — texto, código, imágenes, audio — a partir de instrucciones en lenguaje natural. A diferencia del ML tradicional, que clasifica o predice sobre datos existentes, un modelo generativo crea algo que no existía antes.

### Distinción con el Machine Learning Tradicional

La diferencia más clara se aprecia comparando el tipo de pregunta que responde cada enfoque:

```
ML Tradicional (Lab 01):
  Pregunta: "¿Lloverá mañana?"
  Respuesta: Sí / No  (clasificación binaria)

IA Generativa (Lab 02):
  Instrucción: "Escribe un informe técnico sobre las condiciones sísmicas de la región andina."
  Respuesta: Texto completamente nuevo, generado en el momento
```

En el Lab 01, el modelo de SageMaker Canvas aprendió a predecir lluvia a partir de datos meteorológicos históricos etiquetados. En este laboratorio, los modelos de Amazon Bedrock ya vienen preentrenados con enormes volúmenes de datos y pueden responder instrucciones abiertas sin necesidad de entrenamiento adicional por parte del usuario.

### Nota importante sobre la "comprensión" de la IA

La IA Generativa no "entiende" el contenido como lo haría un ser humano. Lo que hace es generar respuestas estadísticamente probables basadas en los patrones aprendidos durante el preentrenamiento con grandes volúmenes de datos. Esta distinción es fundamental para interpretar correctamente las respuestas del modelo y detectar sus limitaciones, como las alucinaciones que se explorarán en la Sección 9.

---

## 2. Conceptos Arquitectónicos

### Foundation Model (FM)

Un **Foundation Model** es un modelo de IA de propósito general entrenado con grandes volúmenes de datos — texto, imágenes, código — que puede adaptarse a diversas tareas sin necesidad de reentrenamiento completo. Es la base sobre la que se construyen las aplicaciones de IA Generativa.

Características principales:
- Entrenado una sola vez con datos masivos (preentrenamiento)
- Reutilizable para múltiples tareas distintas
- Accesible a través de APIs sin gestionar infraestructura

### LLM (Large Language Model)

Un **LLM** es un tipo específico de Foundation Model especializado en entender y generar texto en lenguaje natural. Los LLMs son el corazón de los asistentes de IA conversacionales.

Ejemplos de LLMs disponibles en Amazon Bedrock:
- **Anthropic Claude**: familia de modelos reconocida por razonamiento y seguimiento de instrucciones complejas
- **Meta Llama**: familia de código abierto con buen balance entre rendimiento y eficiencia

### Context Window (Ventana de Contexto)

El **Context Window** es el límite máximo de información — medido en tokens — que el modelo puede procesar en una sola interacción. Incluye tanto el prompt de entrada como la respuesta generada.

```
Context Window = tokens del prompt + tokens de la respuesta

Ejemplo:
  Modelo con Context Window de 200,000 tokens
  → Puede procesar aproximadamente 150,000 palabras en inglés en una sola interacción
```

Si el texto enviado supera el Context Window, el modelo no puede "ver" la información que queda fuera del límite, lo que puede afectar la coherencia de la respuesta.

### Inferencia

La **Inferencia** es el proceso de enviar un prompt al modelo entrenado y recibir una respuesta generada en tiempo de ejecución. Es importante distinguirla del entrenamiento:

| Concepto | Descripción | Quién lo hace |
|----------|-------------|---------------|
| Entrenamiento | Ajusta los parámetros internos del modelo con datos masivos | El proveedor del modelo (Anthropic, Meta, etc.) |
| Inferencia | Usa el modelo tal como está para producir una respuesta | El usuario, a través de Amazon Bedrock |

En este laboratorio, toda la interacción con los modelos es inferencia. No se modifica ni reentrena ningún modelo.

---

## 3. Predicción de Siguiente Token

### El mecanismo fundamental

Los LLMs generan texto de una manera que puede parecer sorprendente: **predicen un token a la vez**, de forma iterativa. No "piensan" la respuesta completa y luego la escriben; la construyen token por token, como si escribieran una palabra a la vez.

```
Proceso de generación:
  Prompt: "Las ondas sísmicas P viajan a través de..."
  
  Paso 1: Modelo predice → "materiales"
  Paso 2: Modelo predice → "sólidos"
  Paso 3: Modelo predice → "y"
  Paso 4: Modelo predice → "líquidos"
  ...y así sucesivamente hasta completar la respuesta
```

### Distribución de probabilidad sobre el vocabulario

En cada paso, el modelo calcula una distribución de probabilidad sobre todo su vocabulario — que puede contener decenas de miles de tokens posibles — y selecciona uno. Por ejemplo, dado el contexto "Las ondas sísmicas P viajan a través de...", el modelo podría asignar probabilidades como:

```
"materiales"  → 32%
"rocas"       → 28%
"la"          → 15%
"medios"      → 12%
otros tokens  → 13%
```

Es aquí donde los parámetros **Temperature** y **Top-P** intervienen directamente, controlando cómo se realiza esa selección.

### Implicación práctica

Este mecanismo explica dos comportamientos importantes que observará en el laboratorio:

- **Con Temperature > 0**: el mismo prompt puede producir respuestas diferentes en cada ejecución, porque la selección de tokens introduce aleatoriedad controlada.
- **Con Temperature = 0**: la respuesta tiende a ser determinista, ya que el modelo siempre selecciona el token de mayor probabilidad en cada paso.

---

## 4. Prompt y System Prompt

### Prompt (Prompt de usuario)

El **Prompt** es la instrucción o entrada de texto que el usuario envía al modelo para obtener una respuesta. La calidad, claridad y estructura del prompt determina directamente la calidad de la respuesta generada. Esta es la base de la disciplina conocida como "Prompt Engineering", que se practica a lo largo de este laboratorio.

```
Ejemplo de prompt de usuario:
"Explica el concepto de magnitud sísmica en la escala de Richter
 como si fuera para un estudiante de secundaria."
```

### System Prompt (Prompt de sistema)

El **System Prompt** son instrucciones de comportamiento que configuran el rol, tono, restricciones y contexto del modelo antes de que comience la conversación con el usuario. En Amazon Bedrock Playgrounds, el system prompt se configura en un campo separado y persiste durante toda la sesión.

```
Ejemplo de system prompt para este laboratorio:
"Eres un geofísico experto en sismología. Responde siempre con
 datos técnicos y cita fuentes cuando sea posible."
```

### Diferencia clave

| Concepto | Define | Cuándo se configura | Persistencia |
|----------|--------|---------------------|--------------|
| System Prompt | "Quién es" el modelo y cómo debe comportarse | Al inicio de la sesión | Toda la sesión |
| Prompt de usuario | "Qué debe hacer" en cada interacción específica | En cada mensaje | Solo ese turno |

El system prompt establece el marco de comportamiento general; el prompt del usuario define la tarea concreta dentro de ese marco. Un modelo configurado como "geofísico experto" responderá de manera diferente a uno sin system prompt, incluso ante la misma pregunta.

---

## 5. Familias de Modelos en Amazon Bedrock

### Amazon Bedrock como marketplace unificado

Amazon Bedrock actúa como un marketplace unificado que proporciona acceso a Foundation Models de múltiples proveedores a través de una sola API, sin necesidad de gestionar infraestructura, servidores ni contratos separados con cada proveedor.

```
Sin Amazon Bedrock:
  Desarrollador → API de Anthropic
  Desarrollador → API de Meta
  Desarrollador → API de Amazon
  (contratos, credenciales y SDKs separados para cada uno)

Con Amazon Bedrock:
  Desarrollador → Amazon Bedrock API → Anthropic Claude
                                     → Meta Llama
                                     → Amazon Titan
                                     → (otros proveedores)
```

### Familias principales utilizadas en este laboratorio

#### Anthropic Claude

Familia de modelos reconocida por:
- Capacidad de razonamiento complejo y seguimiento de instrucciones detalladas
- Generación de texto extenso y coherente
- Buen desempeño en tareas de análisis técnico y síntesis de información
- Respeto a restricciones de comportamiento definidas en el system prompt

#### Meta Llama

Familia de modelos de código abierto con:
- Buen balance entre rendimiento y eficiencia computacional
- Disponible en múltiples tamaños (parámetros) para distintos casos de uso
- Transparencia en arquitectura al ser de código abierto

### Criterios de selección de modelo

La elección del modelo depende del caso de uso específico:

| Criterio | Descripción | Relevancia en geofísica |
|----------|-------------|------------------------|
| Razonamiento | Capacidad para resolver problemas complejos paso a paso | Alta: cálculos de distancia epicentral, análisis de mecanismos focales |
| Velocidad de respuesta | Tiempo hasta el primer token (Latencia) | Media: consultas interactivas en tiempo real |
| Costo por token | Precio por millón de tokens de entrada/salida | Alta: procesamiento masivo de reportes sísmicos |
| Context Window | Máximo de tokens procesables en una interacción | Alta: análisis de catálogos sísmicos extensos |

### Nota sobre otros proveedores

Amazon Bedrock también ofrece modelos de Amazon (Titan), Cohere, AI21 Labs, Stability AI y otros proveedores. Este laboratorio se enfoca en Anthropic Claude y Meta Llama por su amplia disponibilidad y capacidades de razonamiento técnico.

---

## 6. Unidades y Métricas

### Token: la unidad fundamental

El **Token** es la unidad básica de procesamiento de texto en los modelos de lenguaje. No equivale exactamente a una palabra; puede ser una palabra completa, parte de una palabra, o un signo de puntuación.

```
Regla aproximada:
  1,000 tokens ≈ 750 palabras en inglés
  1,000 tokens ≈ 600-700 palabras en español
  (el español tiende a requerir más tokens por palabra)
```

El token es también la **unidad de facturación** en Amazon Bedrock. El costo se calcula por millón de tokens de entrada (prompt) más tokens de salida (respuesta generada).

```
Costo total de una inferencia =
  (tokens del prompt × precio por token de entrada)
  + (tokens de la respuesta × precio por token de salida)
```

### Latencia vs. Throughput

Estas dos métricas miden aspectos distintos del rendimiento de un modelo:

| Métrica | Definición | Unidad | Caso de uso relevante |
|---------|-----------|--------|----------------------|
| Latencia | Tiempo hasta que aparece el primer token de la respuesta | Milisegundos (ms) | Chatbots interactivos, consultas en tiempo real |
| Throughput | Velocidad total de generación de tokens | Tokens por segundo | Procesamiento por lotes, generación de reportes masivos |

En el contexto de este laboratorio, la **Latencia** es la métrica más relevante, ya que se trabaja de forma interactiva en el Chat Playground. Para un sistema de alerta temprana de tsunamis, por ejemplo, una Latencia baja sería crítica.

---

## 7. Parámetros de Inferencia

Los parámetros de inferencia controlan el comportamiento del modelo en el momento de generar una respuesta. En Amazon Bedrock Playgrounds, estos controles se encuentran en el panel lateral derecho de la interfaz.

### Temperature

La **Temperature** controla la aleatoriedad de las respuestas. Actúa sobre la distribución de probabilidad del vocabulario en cada paso de predicción de token.

```
Rango: 0.0 — 1.0

Temperature = 0.0  →  Determinista
  El modelo siempre selecciona el token de mayor probabilidad.
  Ideal para: código SQL, cálculos de distancia epicentral,
              reportes técnicos estandarizados.

Temperature = 0.5  →  Balance
  Mezcla de consistencia y variedad.
  Ideal para: resúmenes técnicos, análisis moderadamente creativos.

Temperature = 0.9  →  Alta variabilidad
  El modelo explora tokens menos probables con mayor frecuencia.
  Ideal para: descripciones narrativas de eventos sísmicos,
              contenido educativo divulgativo.
```

### Top-P (Nucleus Sampling)

El **Top-P** limita la selección de tokens a un subconjunto acumulativo de alta probabilidad. En lugar de considerar todo el vocabulario, el modelo solo considera los tokens cuyas probabilidades acumuladas suman hasta el valor de Top-P.

```
Rango: 0.0 — 1.0

Top-P = 0.9  →  El modelo considera solo los tokens que juntos
               representan el 90% de la probabilidad acumulada.
               Elimina tokens muy improbables (ruido).

Top-P = 1.0  →  El modelo considera todo el vocabulario
               (sin restricción por Top-P).
```

Top-P y Temperature se utilizan en conjunto para afinar la coherencia y diversidad del texto generado. En la práctica, se recomienda ajustar uno a la vez para entender el efecto de cada parámetro.

### Max Generation (Longitud Máxima)

El **Max Generation** establece el límite máximo de tokens de salida que el modelo puede generar en una respuesta. Es un límite forzado: el modelo se detiene al alcanzarlo, aunque la respuesta no esté completa.

```
Rango: varía según el modelo (típicamente 1 — 4,096+ tokens)

Max Generation = 256   →  Respuestas cortas y precisas
  Ideal para: clasificaciones sísmicas, respuestas de sí/no,
              extracción de datos específicos.

Max Generation = 2,048  →  Respuestas extensas
  Necesario para: análisis detallados, reportes completos,
                  razonamiento Chain-of-Thought paso a paso.
```

⚠️ **Nota sobre costos**: Max Generation controla el límite máximo de tokens de salida, lo que permite evitar costos inesperados por respuestas excesivamente largas.

---

## 8. Estrategias de Prompting

El **Prompt Engineering** es la disciplina de diseñar instrucciones efectivas para obtener respuestas de alta calidad de los modelos de lenguaje. Existen tres técnicas fundamentales que se practican en este laboratorio.

### Zero-Shot

La técnica **Zero-Shot** consiste en enviar una instrucción directa al modelo sin proporcionar ejemplos previos. El modelo responde basándose únicamente en su conocimiento preentrenado.

```
Ejemplo Zero-Shot en geofísica:
"Clasifica este reporte sísmico: Se registró un evento de magnitud 4.2
 con epicentro a 15 km de profundidad en la zona de subducción de la
 costa central."
```

Cuándo usarla: tareas generales donde el formato de respuesta no es crítico, o cuando se quiere evaluar el conocimiento base del modelo sin guía adicional.

### Few-Shot

La técnica **Few-Shot** incluye ejemplos de entrada/salida en el prompt para enseñar al modelo un formato o patrón de respuesta específico antes de solicitar la clasificación o generación de un nuevo caso.

```
Ejemplo Few-Shot en geofísica (estructura):

Ejemplo 1:
{"reporte": "Magnitud 6.1, profundidad 35 km, zona de falla transformante",
 "clasificacion": "Sismo_Tectonico", "nivel_alerta": "Moderado"}

Ejemplo 2:
{"reporte": "Magnitud 2.3, profundidad 5 km, bajo cono volcánico activo",
 "clasificacion": "Sismo_Volcanico", "nivel_alerta": "Vigilancia"}

Ejemplo 3:
{"reporte": "Magnitud 3.1, profundidad 2 km, zona de extracción de fluidos",
 "clasificacion": "Sismo_Inducido", "nivel_alerta": "Monitoreo"}

Ahora clasifica: "Magnitud 5.4, profundidad 80 km, zona de subducción..."
```

Cuándo usarla: cuando se necesita que el modelo imite un formato específico (JSON, tabla, estructura de reporte) o cuando la tarea requiere un patrón de respuesta consistente.

### Chain-of-Thought (CoT)

La técnica **Chain-of-Thought** solicita al modelo que "piense paso a paso" antes de dar la respuesta final. Esto mejora significativamente el razonamiento lógico-matemático al descomponer problemas complejos en pasos intermedios auditables.

```
Ejemplo Chain-of-Thought en geofísica:
"Un sismógrafo registra la llegada de ondas P a las 14:32:10 UTC
 y la llegada de ondas S a las 14:32:18 UTC. Sabiendo que las ondas P
 viajan a 6 km/s y las ondas S a 3.5 km/s en corteza continental,
 calcula la distancia aproximada al epicentro.
 Piensa paso a paso y explica cada parte del cálculo antes de dar
 el resultado final."
```

El modelo debería desglosar: (a) el intervalo S-P, (b) la fórmula de distancia usando la diferencia de velocidades, y (c) el resultado con unidades. Esto permite al geofísico auditar la lógica de razonamiento de la IA.

Cuándo usarla: problemas matemáticos, razonamiento lógico complejo, análisis de múltiples variables donde se necesita verificar el proceso, no solo el resultado.

### Tabla comparativa

| Técnica | Cuándo usarla | Ventaja principal | Limitación principal | Ejemplo en geofísica |
|---------|--------------|-------------------|---------------------|----------------------|
| Zero-Shot | Tareas generales, evaluación del modelo | Simple, rápida, sin preparación | Formato de respuesta impredecible | Clasificación libre de un reporte sísmico |
| Few-Shot | Formato de salida específico requerido | Controla el formato con precisión | Requiere diseñar ejemplos de calidad | Clasificación JSON de eventos sísmicos |
| Chain-of-Thought | Razonamiento matemático o lógico complejo | Permite auditar el proceso de razonamiento | Respuestas más largas, mayor costo en tokens | Cálculo de distancia epicentral paso a paso |

---

## 9. Seguridad y Riesgos

### Alucinación (Hallucination)

La **Alucinación** es una respuesta factualmente incorrecta generada por el modelo con alta confianza y coherencia gramatical. El modelo presenta información falsa como si fuera verdadera, sin señales de incertidumbre.

En el contexto de la geofísica, las alucinaciones son especialmente peligrosas porque el modelo puede:

- Inventar datos de magnitud sísmica o coordenadas de epicentros con aparente precisión
- Atribuir terremotos a fallas geológicas inexistentes con total convicción
- Citar estudios científicos o catálogos sísmicos que no existen
- Proporcionar fechas, profundidades o mecanismos focales incorrectos

```
Ejemplo de alucinación potencial:
Pregunta: "¿Cuál fue la magnitud exacta del terremoto de Pisco, Perú, 2007?"

Respuesta alucinada (ejemplo):
"El terremoto de Pisco del 15 de agosto de 2007 tuvo una magnitud
 de 7.9 Mw según el USGS, con epicentro a 39.1°S, 72.6°W..."
 (datos inventados con aparente precisión)

Respuesta correcta verificable:
Magnitud 8.0 Mw, epicentro aproximado a 60 km al oeste-noroeste
de Chincha Alta, según registros del IGP y USGS.
```

Las alucinaciones son especialmente peligrosas en aplicaciones críticas como sistemas de alerta temprana de tsunamis, evaluación de riesgo sísmico estructural o investigación científica.

### Prompt Injection / Jailbreaking

El **Prompt Injection** es un intento malicioso de manipular el prompt para que el modelo ignore sus directrices de seguridad, revele información prohibida o ejecute instrucciones no autorizadas. El **Jailbreaking** es una variante que busca eludir las restricciones de seguridad del modelo mediante instrucciones creativas o engañosas.

En el contexto de aplicaciones geofísicas, un Prompt Injection podría intentar que el modelo genere alertas sísmicas falsas o proporcione información técnica restringida. La mitigación incluye el uso de system prompts robustos y la validación de las entradas del usuario antes de enviarlas al modelo.

### PII (Personally Identifiable Information)

El **PII** (Información de Identificación Personal) son datos personales sensibles — nombres, direcciones, números de identificación, datos médicos — que deben ser protegidos y ofuscados antes o después de la inferencia con modelos de IA. Enviar datos PII a modelos de IA generativa puede representar un riesgo de privacidad, especialmente en entornos de producción donde los datos de los usuarios son procesados por modelos de terceros.

---

## 10. IA Generativa vs. ML Tradicional

Este laboratorio es el segundo de la serie AWS AI Essentials. Comparar ambos enfoques ayuda a entender cuándo usar cada tecnología.

### ML Tradicional (Lab 01 — SageMaker Canvas)

- **Tarea**: Predecir si lloverá mañana (clasificación binaria)
- **Datos requeridos**: Dataset etiquetado con datos meteorológicos históricos
- **Proceso**: Entrenamiento personalizado con datos propios → modelo específico para esa tarea
- **Resultado**: Modelo que responde "Sí/No" con un nivel de confianza
- **Herramienta AWS**: Amazon SageMaker Canvas (AutoML sin código)

### IA Generativa (Lab 02 — Amazon Bedrock)

- **Tarea**: Responder instrucciones abiertas en lenguaje natural
- **Datos requeridos**: Ninguno — el modelo ya viene preentrenado
- **Proceso**: El usuario envía un prompt → el modelo genera una respuesta
- **Resultado**: Texto, código, análisis o cualquier contenido generado
- **Herramienta AWS**: Amazon Bedrock (acceso a Foundation Models preentrenados)

### Comparativa

| Aspecto | ML Tradicional (Lab 01) | IA Generativa (Lab 02) |
|---------|------------------------|------------------------|
| Tipo de salida | Predicción numérica o categórica | Texto, código, imágenes generadas |
| Datos necesarios | Dataset etiquetado propio | Ninguno (modelo preentrenado) |
| Entrenamiento | Requerido por el usuario | Realizado por el proveedor |
| Flexibilidad | Alta para la tarea específica | Alta para tareas generales |
| Herramienta AWS | SageMaker Canvas | Amazon Bedrock |
| Caso de uso en geofísica | Predecir magnitud de un sismo dado un conjunto de variables | Explicar conceptos sísmicos, generar reportes, clasificar eventos |

**Nota**: Amazon Bedrock proporciona acceso a Foundation Models preentrenados, mientras que SageMaker Canvas (Lab 01) permite entrenar modelos personalizados con datos propios. Ambos enfoques son complementarios y se utilizan en diferentes etapas de un proyecto de IA.

---

## 11. Embeddings y Multimodalidad

### Embedding (Representación Vectorial)

Un **Embedding** es una representación numérica de un texto en un espacio matemático de alta dimensión. Los modelos de lenguaje representan internamente cada palabra, frase o documento como un vector de números — típicamente con cientos o miles de dimensiones.

```
Ejemplo conceptual de embedding:
  "terremoto"  → [0.82, -0.31, 0.67, 0.12, ...]  (vector de alta dimensión)
  "sismo"      → [0.79, -0.28, 0.71, 0.15, ...]  (vector similar al de "terremoto")
  "receta"     → [-0.45, 0.92, -0.18, 0.63, ...]  (vector muy diferente)
```

La distancia entre vectores captura la similitud semántica: los vectores de "terremoto" y "sismo" estarán cercanos en este espacio, mientras que "terremoto" y "receta de cocina" estarán distantes. Esto permite al modelo "comprender" que ambas palabras se refieren al mismo fenómeno geológico.

Los embeddings son el puente conceptual entre el mundo numérico del ML (Lab 01) y el mundo textual de la IA Generativa (Lab 02): en ambos casos, el modelo trabaja con números, pero en la IA Generativa esos números representan significado semántico.

### Multimodalidad

La **Multimodalidad** es la capacidad de un modelo de procesar y generar múltiples tipos de datos — texto, imágenes, audio, video — en una misma interacción. Algunos Foundation Models disponibles en Amazon Bedrock son multimodales.

Aunque este laboratorio se enfoca en modelos de texto (LLMs), la multimodalidad es una tendencia creciente con aplicaciones relevantes en geofísica:

- **Análisis de imágenes satelitales**: un modelo multimodal podría analizar imágenes de deformación del terreno post-sismo
- **Interpretación de sismogramas visuales**: procesar la imagen de un sismograma y extraer información sobre el evento sísmico
- **Generación de reportes con visualizaciones**: combinar análisis textual con generación de gráficos de distribución de réplicas

---

## 12. Terminología AWS

La siguiente tabla resume los términos clave de Amazon Bedrock utilizados en este laboratorio, con su equivalente en la interfaz de AWS y su definición:

| Término técnico | Nombre en interfaz AWS | Definición |
|----------------|------------------------|------------|
| Foundation Model (FM) | Model catalog | Modelo de IA de propósito general preentrenado con grandes volúmenes de datos |
| Model Access | Model access | Sección de la consola de Amazon Bedrock donde se habilita el acceso a modelos de terceros |
| Chat Playground | Playground → Chat | Interfaz interactiva para enviar prompts y recibir respuestas en formato conversacional |
| Compare mode | Compare mode | Funcionalidad del Chat Playground que permite comparar respuestas de dos modelos simultáneamente |
| System Prompt | System prompt | Campo separado en el Playground para configurar el rol y comportamiento del modelo |
| Temperature | Temperature | Parámetro de inferencia que controla la aleatoriedad de las respuestas (rango: 0.0 – 1.0) |
| Top-P | Top P | Parámetro de inferencia de Nucleus Sampling (rango: 0.0 – 1.0) |
| Max Generation | Maximum length / Max tokens | Límite máximo de tokens de salida por respuesta |
| Inference | — | Proceso de enviar un prompt al modelo y recibir una respuesta generada |
| Token | — | Unidad básica de procesamiento de texto; ~1,000 tokens ≈ 750 palabras en inglés |

Toda la terminología de este documento es consistente con la documentación oficial de Amazon Bedrock disponible en [docs.aws.amazon.com/bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html).
