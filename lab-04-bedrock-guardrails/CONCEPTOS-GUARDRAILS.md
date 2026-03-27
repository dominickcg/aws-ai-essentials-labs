# 🛡️ Conceptos Fundamentales: Guardrails con Amazon Bedrock

Documento de referencia teórica para el Laboratorio 4 de la serie AWS AI Essentials. Consulte este material antes y durante la ejecución del laboratorio para familiarizarse con los conceptos de Guardrails, filtros de PII, temas denegados, filtros de contenido y su integración con RAG. Este documento complementa los conceptos de RAG y Knowledge Bases introducidos en el [Lab 03 — CONCEPTOS-RAG.md](../lab-03-bedrock-rag/CONCEPTOS-RAG.md), que es un prerrequisito conceptual para este laboratorio. Se recomienda revisar el documento de conceptos del Lab 03 antes de continuar, especialmente las secciones sobre Knowledge Bases y arquitectura de RAG.

---

## Indice

1. [Guardrails para Amazon Bedrock](#1-guardrails-para-amazon-bedrock)
2. [Integración de Guardrails con RAG](#2-integración-de-guardrails-con-rag)
3. [Terminología AWS](#3-terminología-aws)

---

## 1. Guardrails para Amazon Bedrock

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

## 2. Integración de Guardrails con RAG

### Flujo Completo

Cuando se integra un Guardrail con una Knowledge Base, el flujo de evaluación se extiende para cubrir tanto la entrada como la salida del proceso RAG completo. Para una revisión detallada de la arquitectura de RAG y Knowledge Bases, consulte las Secciones 2 y 4 de [CONCEPTOS-RAG.md](../lab-03-bedrock-rag/CONCEPTOS-RAG.md).

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

## 3. Terminología AWS

La siguiente tabla resume los términos clave de Amazon Bedrock Guardrails utilizados en este laboratorio, con su equivalente en la interfaz de AWS y su definición:

| Término técnico | Nombre en interfaz AWS | Definición |
|----------------|------------------------|------------|
| Guardrail | Guardrails | Capa de seguridad configurable que evalúa entrada y salida contra políticas definidas (temas denegados, PII, contenido) |
| Denied Topic (Tema denegado) | Denied topics | Política en lenguaje natural que bloquea áreas de conversación específicas |
| PII Filter (Filtro de PII) | PII | Filtro que detecta información personal identificable en prompts y respuestas |
| Content Filter (Filtro de contenido) | Content filters | Filtro que evalúa contenido contra categorías predefinidas (odio, insultos, sexual, violencia, conducta inapropiada) |
| Mask (Enmascarar) | Mask | Acción del filtro PII que reemplaza datos sensibles con etiquetas seguras (ej. `{EMAIL}`) sin bloquear la respuesta completa |
| Block (Bloquear) | Block | Acción que impide la entrega de toda la respuesta cuando se detecta una violación |
| Trace (Trazabilidad) | Trace | Información de diagnóstico que muestra qué filtro del Guardrail actuó sobre cada prompt o respuesta |

Toda la terminología de este documento es consistente con la documentación oficial de Amazon Bedrock disponible en [docs.aws.amazon.com/bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html).
