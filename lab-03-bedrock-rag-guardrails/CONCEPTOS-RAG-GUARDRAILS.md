# 🗄️ Conceptos Fundamentales: RAG y Guardrails con Amazon Bedrock

Documento de referencia teórica para el Laboratorio 3 de la serie AWS AI Essentials. Consulte este material antes y durante la ejecución del laboratorio para familiarizarse con los conceptos de Generación Aumentada por Recuperación (RAG), Knowledge Bases, bases de datos vectoriales, Guardrails y filtros de seguridad. Este documento expande los conceptos de IA Generativa introducidos en el [Lab 02 — CONCEPTOS-IA-GENERATIVA.md](../lab-02-bedrock-playgrounds/CONCEPTOS-IA-GENERATIVA.md), especialmente los temas de embeddings, alucinaciones y modelos de lenguaje, aplicándolos ahora al dominio de la geofísica y sismología.

---

## Indice

1. [El Problema que RAG Resuelve](#1-el-problema-que-rag-resuelve)
2. [Arquitectura de RAG Paso a Paso](#2-arquitectura-de-rag-paso-a-paso)
3. [Embeddings en Práctica y Bases de Datos Vectoriales](#3-embeddings-en-práctica-y-bases-de-datos-vectoriales)
4. [Knowledge Bases en Amazon Bedrock](#4-knowledge-bases-en-amazon-bedrock)
5. [Guardrails para Amazon Bedrock](#5-guardrails-para-amazon-bedrock)
6. [Integración de Guardrails con RAG](#6-integración-de-guardrails-con-rag)
7. [Preparación del Entorno](#7-preparación-del-entorno)
8. [Terminología AWS](#8-terminología-aws)

---

## 1. El Problema que RAG Resuelve

### Limitación de los LLMs

Los Modelos de Lenguaje Grande (LLMs) como Anthropic Claude o Meta Llama son extremadamente capaces para generar texto coherente y responder preguntas generales. Sin embargo, tienen una limitación fundamental: solo conocen la información incluida en sus datos de entrenamiento. Este límite se conoce como **knowledge cutoff** — el punto en el tiempo donde termina el conocimiento del modelo.

Esto significa que un LLM:

- **No conoce datos posteriores** a su fecha de corte de entrenamiento
- **No tiene acceso a datos privados** de una organización, como reportes internos, catálogos especializados o bases de datos institucionales
- **Puede alucinar** datos específicos de dominio con alta confianza, inventando magnitudes sísmicas, coordenadas de epicentros o nombres de fallas geológicas que no existen

Como se exploró en la Sección 9 de [CONCEPTOS-IA-GENERATIVA.md](../lab-02-bedrock-playgrounds/CONCEPTOS-IA-GENERATIVA.md), las alucinaciones son respuestas factualmente incorrectas presentadas con aparente precisión. En el dominio geofísico, esto es especialmente peligroso.

### La Solución: Retrieval Augmented Generation (RAG)

**RAG** (Generación Aumentada por Recuperación) es un patrón arquitectónico que combina la capacidad generativa de un LLM con la recuperación de información de fuentes verificadas y actualizadas. En lugar de depender exclusivamente de lo que el modelo "recuerda" de su entrenamiento, RAG le proporciona documentos relevantes como contexto antes de generar la respuesta.

```
Sin RAG:
  Pregunta del usuario → LLM (solo memoria de entrenamiento) → Respuesta (posible alucinación)

Con RAG:
  Pregunta del usuario → Búsqueda en documentos verificados → Contexto relevante + Pregunta → LLM → Respuesta fundamentada con citas
```

El resultado es una respuesta fundamentada en datos reales, con referencias a las fuentes originales, reduciendo significativamente las alucinaciones.

### Analogía Geofísica

Imagine a un sismólogo del Instituto Geofísico del Perú (IGP) que debe emitir un reporte sobre la actividad sísmica reciente en la costa peruana:

- **Sin RAG**: El sismólogo confía solo en su memoria para citar magnitudes, profundidades y coordenadas de eventos recientes. Podría confundir datos, mezclar eventos o inventar cifras con aparente precisión.
- **Con RAG**: El sismólogo consulta siempre el catálogo sísmico oficial del IGP antes de emitir cualquier reporte. Busca los registros verificados, extrae los datos exactos y cita las fuentes instrumentales.

RAG convierte al LLM en ese sismólogo disciplinado que siempre consulta sus fuentes antes de responder, en lugar de confiar solo en su memoria.

---

## 2. Arquitectura de RAG Paso a Paso

La arquitectura de RAG se compone de tres fases secuenciales: Ingestión, Consulta y Generación.

### Fase de Ingestión

La fase de ingestión prepara los documentos para la búsqueda semántica. Este proceso ocurre una sola vez (o cuando se actualizan los documentos) y consta de tres pasos:

```
Fase de Ingestión:

  Documentos originales       Chunking              Embeddings           Vector Store
  (PDF, TXT, MD)         (División en fragmentos)  (Vectorización)    (Almacenamiento)
  ┌──────────────┐       ┌──────────────────┐     ┌──────────────┐   ┌──────────────┐
  │ Reporte      │       │ Chunk 1: "La     │     │ [0.82, -0.31,│   │              │
  │ sísmico      │──────>│ estación de Ñaña │────>│  0.67, ...]  │──>│  OpenSearch   │
  │ completo     │       │ registró..."     │     │              │   │  Serverless   │
  │ (50 páginas) │       │                  │     │              │   │              │
  │              │       │ Chunk 2: "El     │     │ [0.45, 0.12, │   │  (índice     │
  │              │       │ evento de mag.   │────>│  -0.89, ...] │──>│   vectorial) │
  │              │       │ 5.2 ocurrió..."  │     │              │   │              │
  └──────────────┘       └──────────────────┘     └──────────────┘   └──────────────┘
```

1. **Chunking** (División en fragmentos): Los documentos originales se dividen en fragmentos de texto más pequeños llamados "chunks". Cada chunk es una unidad de información que puede ser recuperada independientemente.

2. **Embeddings** (Vectorización): Cada chunk se transforma en un vector numérico de alta dimensión mediante un modelo de embeddings (en este laboratorio, Amazon Titan Text Embeddings v2). Este vector captura el significado semántico del texto.

3. **Vector Store** (Almacenamiento vectorial): Los vectores se almacenan en una base de datos vectorial (Amazon OpenSearch Serverless) optimizada para búsquedas de similitud.

### Fase de Consulta

Cuando el usuario envía una pregunta, el sistema busca los chunks más relevantes:

```
Fase de Consulta:

  Prompt del usuario          Embedding de consulta      Búsqueda semántica       Contexto recuperado
  ┌──────────────────┐       ┌──────────────────┐      ┌──────────────────┐     ┌──────────────────┐
  │ "¿Cuál fue la    │       │ [0.79, -0.28,    │      │ Comparar vector  │     │ Chunk 7: "El     │
  │  actividad       │──────>│  0.71, ...]      │─────>│ de consulta con  │────>│ evento de mag.   │
  │  sísmica en la   │       │                  │      │ vectores en      │     │ 5.2 en la costa  │
  │  costa peruana?" │       │                  │      │ OpenSearch       │     │ central..."      │
  └──────────────────┘       └──────────────────┘      └──────────────────┘     │                  │
                                                                                │ Chunk 12: "La    │
                                                                                │ estación costera │
                                                                                │ registró..."     │
                                                                                └──────────────────┘
```

1. El prompt del usuario se transforma en un embedding usando el mismo modelo de embeddings.
2. Se realiza una búsqueda por similitud semántica en la base de datos vectorial.
3. Los chunks con mayor similitud se recuperan como contexto relevante.

### Fase de Generación

El LLM genera la respuesta final combinando el contexto recuperado con la pregunta original:

```
Fase de Generación:

  Contexto recuperado + Pregunta original → LLM (Anthropic Claude) → Respuesta con citas

  ┌─────────────────────────────────────────────────────────┐
  │ Contexto: "El evento de magnitud 5.2 en la costa       │
  │ central ocurrió el 15 de marzo a 35 km de profundidad" │
  │                                                         │
  │ Pregunta: "¿Cuál fue la actividad sísmica reciente?"   │
  ├─────────────────────────────────────────────────────────┤
  │                    Anthropic Claude                      │
  ├─────────────────────────────────────────────────────────┤
  │ Respuesta: "Según los registros, se documentó un       │
  │ evento de magnitud 5.2 en la costa central peruana     │
  │ el 15 de marzo, con una profundidad de 35 km."         │
  │                                                         │
  │ Fuente: reporte-actividad-sismica.md [1]               │
  └─────────────────────────────────────────────────────────┘
```

El modelo genera una respuesta basada en el contexto recuperado y adjunta **citas** que referencian los documentos originales de donde se extrajo la información. Esto permite al usuario verificar la fuente de cada afirmación.

---

## 3. Embeddings en Práctica y Bases de Datos Vectoriales

### Embeddings: del concepto a la práctica en RAG

En la Sección 11 de [CONCEPTOS-IA-GENERATIVA.md](../lab-02-bedrock-playgrounds/CONCEPTOS-IA-GENERATIVA.md) se introdujo el concepto de **embedding** como una representación numérica (vector) de un texto en un espacio matemático de alta dimensión. En el Lab 02, este concepto se presentó de forma teórica. En este laboratorio, los embeddings se utilizan de forma concreta y práctica como el mecanismo central de RAG.

En el contexto de RAG, los embeddings cumplen dos funciones específicas:

1. **Representar chunks de documentos**: Cada fragmento de texto de los documentos geofísicos se convierte en un vector que captura su significado semántico.
2. **Representar consultas del usuario**: Cada pregunta del participante se convierte en un vector usando el mismo modelo de embeddings.

```
Embeddings en RAG:

  Chunk: "La estación sismológica de Ñaña       →  [0.82, -0.31, 0.67, 0.12, ...]
          registró un evento de magnitud 4.5"

  Chunk: "El protocolo de calibración de         →  [0.15, 0.78, -0.42, 0.56, ...]
          acelerómetros requiere verificación
          trimestral"

  Consulta: "¿Qué sismos se registraron          →  [0.79, -0.28, 0.71, 0.15, ...]
             en la estación de Ñaña?"

  La consulta tiene un vector SIMILAR al primer chunk (ambos tratan sobre
  registros sísmicos en Ñaña) y DISTANTE del segundo chunk (calibración
  de instrumentos).
```

### Similitud Semántica

La búsqueda vectorial encuentra chunks cuyo **significado** es similar a la consulta, no solo coincidencias de palabras exactas. Esta es la diferencia fundamental con una búsqueda de texto tradicional:

| Tipo de búsqueda | Consulta | Resultado |
|-------------------|----------|-----------|
| Búsqueda de texto exacto | "actividad sísmica en la costa peruana" | Solo encuentra documentos con esas palabras exactas |
| Búsqueda semántica (embeddings) | "actividad sísmica en la costa peruana" | También encuentra "terremotos en el litoral del Perú", "eventos telúricos en la zona costera" y "sismos registrados en la franja litoral peruana" |

Esto es posible porque los embeddings capturan el significado, no las palabras. Los vectores de "actividad sísmica" y "terremotos" estarán cercanos en el espacio vectorial porque se refieren al mismo fenómeno geológico.

### Amazon OpenSearch Serverless como Vector Store

En este laboratorio, **Amazon OpenSearch Serverless** actúa como la base de datos vectorial que almacena los embeddings generados a partir de los documentos geofísicos. OpenSearch Serverless está optimizado para:

- **Búsquedas de similitud a gran escala**: Puede comparar el vector de una consulta contra millones de vectores almacenados de forma eficiente.
- **Gestión automática de infraestructura**: Al ser serverless, no requiere aprovisionamiento ni administración de servidores por parte del participante.
- **Integración nativa con Amazon Bedrock**: Amazon Bedrock Knowledge Bases puede crear y gestionar automáticamente una colección de OpenSearch Serverless mediante la opción "Quick create".

Para una revisión del concepto teórico de embeddings y su relación con la representación semántica, consulte la Sección 11 (Embeddings y Multimodalidad) de [CONCEPTOS-IA-GENERATIVA.md](../lab-02-bedrock-playgrounds/CONCEPTOS-IA-GENERATIVA.md).

---

## 4. Knowledge Bases en Amazon Bedrock

### Definición

**Amazon Bedrock Knowledge Bases** es una funcionalidad gestionada que orquesta todo el flujo de RAG — ingestión, indexación, recuperación y generación — sin necesidad de código personalizado. El participante configura los componentes a través de la consola de AWS y Amazon Bedrock se encarga de coordinar el proceso completo.

### Componentes de una Knowledge Base

Una Knowledge Base en Amazon Bedrock integra cuatro componentes principales:

```
Componentes de una Knowledge Base:

  ┌─────────────────────────────────────────────────────────────────┐
  │                    Amazon Bedrock Knowledge Base                 │
  │                                                                 │
  │  ┌──────────────┐    ┌──────────────────────┐                  │
  │  │  Data Source  │    │  Modelo de Embeddings │                  │
  │  │  (Amazon S3)  │───>│  Amazon Titan Text    │                  │
  │  │              │    │  Embeddings v2        │                  │
  │  └──────────────┘    └──────────┬───────────┘                  │
  │                                 │                               │
  │                                 ▼                               │
  │                    ┌──────────────────────┐                    │
  │                    │    Vector Store       │                    │
  │                    │    Amazon OpenSearch   │                    │
  │                    │    Serverless         │                    │
  │                    └──────────────────────┘                    │
  │                                                                 │
  │  ┌──────────────────────────────────────────┐                  │
  │  │  Modelo de Generación                     │                  │
  │  │  Anthropic Claude                         │                  │
  │  │  (seleccionado en la interfaz de prueba)  │                  │
  │  └──────────────────────────────────────────┘                  │
  └─────────────────────────────────────────────────────────────────┘
```

| Componente | Servicio AWS | Función |
|------------|-------------|---------|
| Data Source | Amazon S3 | Almacena los documentos originales (reportes sísmicos, procedimientos, glosarios) |
| Modelo de Embeddings | Amazon Titan Text Embeddings v2 | Transforma chunks de texto en vectores numéricos |
| Vector Store | Amazon OpenSearch Serverless | Almacena y busca vectores por similitud semántica |
| Modelo de Generación | Anthropic Claude | Genera respuestas en lenguaje natural a partir del contexto recuperado |

### Chunking Strategy

Antes de generar embeddings, Amazon Bedrock divide los documentos en fragmentos (chunks). La estrategia de chunking afecta directamente la precisión de las respuestas:

| Estrategia | Descripción | Cuándo usarla |
|------------|-------------|---------------|
| **Default** | Amazon Bedrock aplica una estrategia de chunking optimizada automáticamente | Recomendada para la mayoría de casos. Ideal para este laboratorio. |
| **Fixed size** | Chunks de tamaño fijo (configurable en número de tokens) con solapamiento opcional | Cuando se necesita control preciso sobre el tamaño de los fragmentos |
| **None** | No se aplica chunking; cada documento se trata como un solo chunk | Solo para documentos muy cortos donde dividirlos perdería contexto |

- **Chunks muy pequeños**: Mayor precisión en la búsqueda pero pueden perder contexto. Una oración aislada puede no tener suficiente información para ser útil.
- **Chunks muy grandes**: Más contexto por fragmento pero menor precisión en la búsqueda. Un capítulo completo puede diluir la información relevante.

En este laboratorio se utiliza la estrategia **Default**, que permite a Amazon Bedrock optimizar automáticamente el tamaño de los chunks.

---

## 5. Guardrails para Amazon Bedrock

### Definición

**Amazon Bedrock Guardrails** es una capa de seguridad configurable que evalúa tanto la **entrada del usuario** (prompt) como la **salida del modelo** (completion) contra políticas definidas por el administrador. Los Guardrails actúan como filtros bidireccionales que interceptan contenido inapropiado, información sensible o temas prohibidos antes de que lleguen al usuario final.

```
Flujo de evaluación de un Guardrail:

  Prompt del usuario
        │
        ▼
  ┌─────────────────────┐
  │ Guardrail — Entrada  │  ← Evalúa: Temas denegados, PII, Contenido
  │ (Input Evaluation)   │
  └─────────┬───────────┘
            │
            ▼
  ┌─────────────────────┐
  │ Modelo / Knowledge   │  ← Genera respuesta
  │ Base                 │
  └─────────┬───────────┘
            │
            ▼
  ┌─────────────────────┐
  │ Guardrail — Salida   │  ← Evalúa: Temas denegados, PII, Contenido
  │ (Output Evaluation)  │
  └─────────┬───────────┘
            │
            ▼
  Respuesta al usuario
  (limpia, enmascarada o bloqueada)
```

### Temas Denegados (Denied Topics)

Los **Denied Topics** son políticas configuradas en lenguaje natural que instruyen al Guardrail sobre qué áreas de conversación deben ser bloqueadas. Cuando el Guardrail detecta que un prompt o una respuesta trata sobre un tema denegado, bloquea la interacción y muestra un mensaje personalizado.

En el contexto geofísico de este laboratorio, se configuran dos temas denegados:

| Tema Denegado | Justificación | Ejemplo de prompt bloqueado |
|---------------|---------------|----------------------------|
| **Predicción exacta de terremotos** | Ningún sistema de IA puede predecir terremotos con precisión temporal. Generar predicciones falsas podría causar pánico o negligencia. | "¿Cuándo será el próximo terremoto de magnitud 7 en Lima?" |
| **Diagnóstico de estabilidad estructural** | Evaluar la resistencia de edificios ante sismos requiere ingeniería estructural profesional certificada. Un diagnóstico erróneo de IA podría poner vidas en riesgo. | "¿Resistiría este edificio un terremoto de magnitud 8.0?" |

### Filtros de PII (Personally Identifiable Information)

Los **filtros de PII** detectan y procesan información personal identificable en los prompts y las respuestas. Amazon Bedrock Guardrails ofrece dos acciones para manejar PII detectado:

| Acción | Comportamiento | Ejemplo |
|--------|---------------|---------|
| **Block** | Bloquea toda la respuesta si se detecta PII. No se entrega ningún contenido al usuario. | Si la respuesta contiene un correo electrónico, se bloquea completamente. |
| **Mask** | Enmascara (reemplaza) solo el dato sensible, permitiendo que el resto de la respuesta se entregue al usuario. | `investigador@igp.gob.pe` se reemplaza por `{EMAIL}` |

En este laboratorio se configuran los siguientes filtros PII con acción **Mask**:

| Tipo de PII | Acción | Reemplazo | Ejemplo |
|-------------|--------|-----------|---------|
| Email (Correo electrónico) | Mask | `{EMAIL}` | `carlos.mendoza@igp.gob.pe` → `{EMAIL}` |
| Phone (Número de teléfono) | Mask | `{PHONE}` | `+51-999-888-777` → `{PHONE}` |
| Name (Nombre de persona) | Mask | `{NAME}` | `Dr. Carlos Mendoza` → `{NAME}` |

La acción **Mask** es preferible a **Block** en este contexto porque permite que el participante reciba la información geofísica relevante mientras se protegen los datos personales de los investigadores de campo.

### Filtros de Contenido (Content Filters)

Los **Content Filters** evalúan el contenido de prompts y respuestas contra categorías predefinidas de contenido inapropiado. Cada categoría tiene niveles de severidad configurables:

| Categoría | Descripción | Niveles disponibles |
|-----------|-------------|---------------------|
| **Hate** (Odio) | Contenido que promueve discriminación o violencia contra grupos | None, Low, Medium, High |
| **Insults** (Insultos) | Lenguaje ofensivo o denigrante dirigido a personas | None, Low, Medium, High |
| **Sexual** (Contenido sexual) | Contenido sexualmente explícito o sugestivo | None, Low, Medium, High |
| **Violence** (Violencia) | Contenido que glorifica o promueve violencia | None, Low, Medium, High |
| **Misconduct** (Conducta inapropiada) | Contenido que promueve actividades ilegales o poco éticas | None, Low, Medium, High |

Un nivel más alto (High) significa que el filtro es más estricto y bloquea contenido con menor severidad. Para un entorno de investigación geofísica, se recomienda configurar niveles moderados (Medium) que protejan contra contenido claramente inapropiado sin bloquear discusiones técnicas legítimas sobre fenómenos naturales destructivos.

### Mensaje de Bloqueo Personalizado

Cuando un Guardrail intercepta una violación, muestra un **mensaje de bloqueo personalizado** en lugar de la respuesta del modelo. Este mensaje se configura al crear el Guardrail y debe ser informativo y contextualizado:

```
Ejemplo de mensaje de bloqueo para este laboratorio:

"Lo siento, no puedo responder sobre este tema. Las predicciones
 sísmicas exactas requieren análisis instrumental especializado
 que está fuera del alcance de este sistema de IA."
```

---

## 6. Integración de Guardrails con RAG

### Flujo Completo

Cuando se integra un Guardrail con una Knowledge Base, el flujo de evaluación se extiende para cubrir tanto la entrada como la salida del proceso RAG completo:

```
Flujo completo: Guardrail + Knowledge Base RAG

  ┌──────────────────┐
  │ Prompt del        │
  │ usuario           │
  └────────┬─────────┘
           │
           ▼
  ┌──────────────────────────────┐
  │ GUARDRAIL — Evaluación de    │
  │ Entrada                      │
  │ • ¿Tema denegado?  → Bloqueo │
  │ • ¿PII en prompt?  → Mask   │
  │ • ¿Contenido inapropiado?    │
  └────────┬─────────────────────┘
           │ (prompt válido)
           ▼
  ┌──────────────────────────────┐
  │ KNOWLEDGE BASE               │
  │ • Embedding de consulta      │
  │ • Búsqueda semántica         │
  │ • Recuperación de contexto   │
  │ • Generación con Claude      │
  └────────┬─────────────────────┘
           │ (respuesta generada)
           ▼
  ┌──────────────────────────────┐
  │ GUARDRAIL — Evaluación de    │
  │ Salida                       │
  │ • ¿Tema denegado?  → Bloqueo │
  │ • ¿PII en respuesta? → Mask │
  │ • ¿Contenido inapropiado?    │
  └────────┬─────────────────────┘
           │
           ▼
  ┌──────────────────┐
  │ Respuesta final   │
  │ al usuario        │
  │ (protegida)       │
  └──────────────────┘
```

El Guardrail actúa en dos puntos:

1. **Evaluación de entrada**: Antes de que la Knowledge Base procese la consulta. Si el prompt contiene un tema denegado (ej. "predice el próximo terremoto"), se bloquea inmediatamente sin consultar la Knowledge Base.
2. **Evaluación de salida**: Después de que la Knowledge Base genera la respuesta. Si la respuesta contiene PII de investigadores extraído de los documentos indexados, el Guardrail lo enmascara antes de entregarlo al usuario.

### Caso de Uso Geofísico

En este laboratorio, la integración de Guardrails con RAG protege dos escenarios concretos:

**Protección de PII en documentos indexados**: Los documentos geofísicos cargados en S3 contienen datos de investigadores de campo (nombres, correos electrónicos, teléfonos). Cuando una consulta RAG recupera un chunk que contiene estos datos, el Guardrail los enmascara automáticamente en la respuesta:

```
Consulta: "¿Quién supervisó el monitoreo en la estación de Ñaña?"

Sin Guardrail:
  "El Dr. Carlos Mendoza (carlos.mendoza@igp.gob.pe, +51-999-888-777)
   supervisó el monitoreo en la estación de Ñaña durante el período..."

Con Guardrail (PII Mask):
  "{NAME} ({EMAIL}, {PHONE}) supervisó el monitoreo en la estación
   de Ñaña durante el período..."
```

**Bloqueo de temas denegados con KB activa**: Incluso cuando la Knowledge Base contiene información relevante sobre sismología, el Guardrail bloquea consultas que soliciten predicciones exactas de terremotos:

```
Consulta: "Según los datos de la Knowledge Base, ¿cuándo será el
           próximo terremoto de magnitud 7 en la costa peruana?"

Respuesta: "Lo siento, no puedo responder sobre este tema. Las
            predicciones sísmicas exactas requieren análisis
            instrumental especializado que está fuera del alcance
            de este sistema de IA."
```

### Trazabilidad (Trace)

La interfaz de Amazon Bedrock proporciona métricas de **trazabilidad (Trace)** que muestran exactamente qué filtro fue responsable de cada acción de bloqueo o enmascaramiento. Después de cada consulta, el participante puede examinar el Trace para identificar:

- **Topic**: Si un tema denegado fue detectado y cuál fue
- **PII**: Si se detectó información personal y qué tipo (Email, Phone, Name)
- **Content Filter**: Si un filtro de contenido fue activado y en qué categoría

Esta trazabilidad es fundamental para depurar y ajustar las políticas del Guardrail, permitiendo entender por qué una respuesta fue bloqueada o modificada.

---

## 7. Preparación del Entorno

Antes de crear la Knowledge Base y configurar los Guardrails, es necesario preparar la infraestructura base en AWS. Esta sección explica los conceptos de los recursos que se configurarán en la Parte 1 del laboratorio.

### IAM Service Role

Un **IAM Service Role** (Rol de Servicio IAM) es un rol vinculado a un servicio de AWS que permite a ese servicio realizar acciones en otros servicios en nombre del usuario. En este laboratorio, Amazon Bedrock necesita un rol que le permita:

- **Leer documentos de Amazon S3**: Para acceder a los documentos geofísicos almacenados en el bucket durante la ingestión.
- **Escribir en Amazon OpenSearch Serverless**: Para crear y poblar el índice vectorial con los embeddings generados. El permiso clave es `aoss:APIAccessAll`.

```
IAM Service Role para Amazon Bedrock:

  Entidad de confianza: bedrock.amazonaws.com
  
  Permisos:
  ├── Amazon S3: Lectura de objetos del bucket de documentos
  └── Amazon OpenSearch Serverless: aoss:APIAccessAll
```

Este rol se verifica (no se crea) al inicio del laboratorio, ya que típicamente es configurado por el instructor del taller.

### Bucket S3 como Data Source

El **bucket de Amazon S3** actúa como la fuente de datos (Data Source) para la Knowledge Base. Almacena los documentos geofísicos originales que serán procesados durante la ingestión:

- **Nombre del bucket**: `s3-lab03-knowledge-source-{nombre-participante}`
- **Contenido**: Documentos geofísicos en formato Markdown (reportes sísmicos, procedimientos de monitoreo, glosario técnico)
- **Formatos compatibles**: Amazon Bedrock Knowledge Bases soporta PDF, TXT, MD, HTML, DOC/DOCX y CSV

### Cifrado en Reposo (Encryption at Rest)

Todo bucket S3 utilizado como Data Source debe tener habilitado el **cifrado en reposo**. En este laboratorio se utiliza **SSE-S3** (Server-Side Encryption con claves gestionadas por Amazon S3), que es la opción más sencilla y no requiere configuración adicional de claves:

| Opción de cifrado | Descripción | Uso en este laboratorio |
|-------------------|-------------|------------------------|
| **SSE-S3** | Cifrado con claves gestionadas automáticamente por S3 | Sí — opción recomendada |
| SSE-KMS | Cifrado con claves gestionadas por AWS KMS | No — requiere configuración adicional |
| SSE-C | Cifrado con claves proporcionadas por el cliente | No — complejidad innecesaria |

### Convención de Nombres

Siguiendo las directrices del laboratorio, todos los recursos de AWS creados por el participante deben incluir el placeholder `{nombre-participante}` en su nombre para evitar conflictos en entornos compartidos:

| Recurso | Patrón de nombre |
|---------|-----------------|
| Bucket S3 | `s3-lab03-knowledge-source-{nombre-participante}` |
| Knowledge Base | Nombre descriptivo incluyendo `{nombre-participante}` |
| Guardrail | Nombre descriptivo incluyendo `{nombre-participante}` |

---

## 8. Terminología AWS

La siguiente tabla resume los términos clave de Amazon Bedrock Knowledge Bases y Guardrails utilizados en este laboratorio, con su equivalente en la interfaz de AWS y su definición:

| Término técnico | Nombre en interfaz AWS | Definición |
|----------------|------------------------|------------|
| Knowledge Base | Knowledge bases | Funcionalidad gestionada de Amazon Bedrock que orquesta el flujo completo de RAG (ingestión, indexación, recuperación y generación) |
| Data Source | Data source | Origen de datos conectado a una Knowledge Base; en este laboratorio, un bucket de Amazon S3 con documentos geofísicos |
| Sync (Sincronización) | Sync | Proceso que lee documentos de S3, aplica chunking, genera embeddings y puebla el índice vectorial en OpenSearch Serverless |
| Chunking Strategy | Chunking strategy | Método de división de documentos en fragmentos antes de la vectorización (Default, Fixed size, None) |
| Vector Store | Vector store | Base de datos vectorial que almacena embeddings para búsqueda por similitud; en este laboratorio, Amazon OpenSearch Serverless |
| Amazon OpenSearch Serverless | OpenSearch Serverless | Motor de búsqueda y análisis vectorial gestionado, utilizado como vector store por Amazon Bedrock Knowledge Bases |
| Amazon Titan Text Embeddings v2 | Titan Text Embeddings v2 | Modelo de embeddings de Amazon que transforma texto en representaciones vectoriales de alta dimensión |
| Guardrail | Guardrails | Capa de seguridad configurable que evalúa entrada y salida contra políticas definidas (temas denegados, PII, contenido) |
| Denied Topic (Tema denegado) | Denied topics | Política en lenguaje natural que bloquea áreas de conversación específicas |
| PII Filter (Filtro de PII) | PII | Filtro que detecta información personal identificable en prompts y respuestas |
| Content Filter (Filtro de contenido) | Content filters | Filtro que evalúa contenido contra categorías predefinidas (odio, insultos, sexual, violencia, conducta inapropiada) |
| Mask (Enmascarar) | Mask | Acción del filtro PII que reemplaza datos sensibles con etiquetas seguras (ej. `{EMAIL}`) sin bloquear la respuesta completa |
| Block (Bloquear) | Block | Acción que impide la entrega de toda la respuesta cuando se detecta una violación |
| Trace (Trazabilidad) | Trace | Información de diagnóstico que muestra qué filtro del Guardrail actuó sobre cada prompt o respuesta |
| RetrieveAndGenerate | — | Operación de la API de Amazon Bedrock que busca información relevante (Retrieve) y genera la respuesta (Generate) con citas |
| IAM Service Role | IAM roles | Rol vinculado al servicio de Amazon Bedrock que permite acceder a S3 y OpenSearch Serverless |
| SSE-S3 | Server-side encryption | Cifrado en reposo con claves gestionadas automáticamente por Amazon S3 |

Toda la terminología de este documento es consistente con la documentación oficial de Amazon Bedrock disponible en [docs.aws.amazon.com/bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html).
