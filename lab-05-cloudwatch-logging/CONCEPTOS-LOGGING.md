# 📋 Conceptos Fundamentales: Logging y Auditoría con Amazon Bedrock

Documento de referencia teórica para el Laboratorio 5 de la serie AWS AI Essentials. Consulte este material antes y durante la ejecución del laboratorio para familiarizarse con los conceptos de Model Invocation Logging, Amazon CloudWatch, políticas de retención, campos de auditoría y casos de uso de gobernanza y cumplimiento. Este documento complementa los conceptos de Guardrails introducidos en el [Lab 04 — CONCEPTOS-GUARDRAILS.md](../lab-04-bedrock-guardrails/CONCEPTOS-GUARDRAILS.md). Se recomienda revisar el documento de conceptos del Lab 04 antes de continuar, especialmente las secciones sobre trazabilidad y evaluación de entrada/salida.

---

## Indice

1. [Model Invocation Logging en Amazon Bedrock](#1-model-invocation-logging-en-amazon-bedrock)
2. [Amazon CloudWatch: Log Groups y Log Streams](#2-amazon-cloudwatch-log-groups-y-log-streams)
3. [Políticas de Retención de Registros](#3-políticas-de-retención-de-registros)
4. [Campos de Auditoría en Registros de Invocación](#4-campos-de-auditoría-en-registros-de-invocación)
5. [Casos de Uso de Gobernanza y Cumplimiento](#5-casos-de-uso-de-gobernanza-y-cumplimiento)
6. [Terminología AWS](#6-terminología-aws)

---

## 1. Model Invocation Logging en Amazon Bedrock

### Definición

**Model Invocation Logging** es una característica nativa de Amazon Bedrock que captura automáticamente los metadatos, datos de entrada (prompts) y datos de salida (completions) de todas las invocaciones realizadas a los modelos fundacionales dentro de una cuenta y región específicas. Esta funcionalidad es esencial para garantizar la trazabilidad, el cumplimiento normativo y la gobernanza del uso de IA generativa en una organización.

### ¿Por qué es necesario?

Sin Model Invocation Logging, las interacciones con los modelos de IA generativa no dejan rastro auditable. Esto representa un riesgo significativo en entornos empresariales donde se requiere:

- **Trazabilidad**: Saber quién invocó qué modelo, cuándo y con qué datos.
- **Cumplimiento normativo**: Demostrar ante auditores que el uso de IA se realiza dentro de políticas aprobadas.
- **Detección de uso indebido**: Identificar patrones de uso inapropiado o no autorizado.
- **Análisis de costos**: Correlacionar invocaciones con el consumo de recursos y costos asociados.

### Tipos de datos capturados

Model Invocation Logging registra tres categorías de datos por cada invocación:

| Categoría | Descripción | Ejemplo |
|-----------|-------------|---------|
| **Metadatos** | Información contextual de la invocación: cuenta, región, modelo utilizado, identificador de solicitud y timestamps | `accountId`, `modelArn`, `region`, `requestId` |
| **Datos de entrada (Prompts)** | El texto o contenido enviado al modelo por el usuario o la aplicación | `input.inputText`: "Explica qué es un sismógrafo" |
| **Datos de salida (Completions)** | La respuesta generada por el modelo fundacional | `output.outputText`: "Un sismógrafo es un instrumento..." |

### Flujo de datos: Bedrock → CloudWatch

El siguiente diagrama muestra cómo fluyen los datos desde la invocación del usuario hasta su almacenamiento en CloudWatch:

```
Flujo de Model Invocation Logging:

  Usuario / Aplicación
        │
        │  Envía prompt
        ▼
  ┌─────────────────────┐
  │ Amazon Bedrock       │
  │ (Modelo Fundacional) │
  │                      │
  │  • Procesa prompt    │
  │  • Genera completion │
  └─────────┬───────────┘
            │
            │  Captura automática
            │  (metadatos + input + output)
            ▼
  ┌─────────────────────────────────┐
  │ Model Invocation Logging         │
  │                                  │
  │  Empaqueta registro JSON:        │
  │  • accountId, modelArn, region   │
  │  • requestId, timestamps         │
  │  • input.inputText               │
  │  • output.outputText             │
  └─────────┬───────────────────────┘
            │
            │  Envía al destino configurado
            ▼
  ┌─────────────────────────────────┐
  │ Amazon CloudWatch Logs           │
  │                                  │
  │  Log Group:                      │
  │  /aws/bedrock/model-invocations  │
  │                                  │
  │  └─ Log Stream (automático)      │
  │       └─ Log Event (JSON)        │
  └─────────────────────────────────┘
```

Una vez habilitado, el logging se aplica de forma global a todos los modelos habilitados en la región y cuenta configuradas. No es necesario configurar cada modelo individualmente.

---

## 2. Amazon CloudWatch: Log Groups y Log Streams

### Estructura jerárquica

Amazon CloudWatch Logs organiza los registros en una jerarquía de tres niveles que facilita la organización, búsqueda y gestión de grandes volúmenes de eventos:

| Nivel | Componente | Descripción |
|-------|-----------|-------------|
| 1 | **Log Group** | Contenedor lógico principal que agrupa registros de un mismo origen o propósito. Define políticas de retención y permisos de acceso. |
| 2 | **Log Stream** | Secuencia de eventos dentro de un Log Group. Se crea automáticamente por el servicio emisor y representa una fuente específica de registros. |
| 3 | **Log Event** | Registro individual con timestamp y mensaje (payload). En el caso de Bedrock, cada evento es un objeto JSON con los datos de una invocación. |

### Diagrama de jerarquía

```
Jerarquía de Amazon CloudWatch Logs:

  ┌──────────────────────────────────────────┐
  │ Amazon CloudWatch Logs                    │
  │                                           │
  │  ┌──────────────────────────────────────┐ │
  │  │ Log Group                             │ │
  │  │ /aws/bedrock/model-invocations        │ │
  │  │                                       │ │
  │  │  ┌──────────────────────────────────┐ │ │
  │  │  │ Log Stream (automático)           │ │ │
  │  │  │ aws/bedrock/model-invocations/... │ │ │
  │  │  │                                   │ │ │
  │  │  │  ┌─────────────────────────────┐  │ │ │
  │  │  │  │ Log Event 1 (JSON)          │  │ │ │
  │  │  │  │ timestamp + payload         │  │ │ │
  │  │  │  └─────────────────────────────┘  │ │ │
  │  │  │  ┌─────────────────────────────┐  │ │ │
  │  │  │  │ Log Event 2 (JSON)          │  │ │ │
  │  │  │  │ timestamp + payload         │  │ │ │
  │  │  │  └─────────────────────────────┘  │ │ │
  │  │  │  ┌─────────────────────────────┐  │ │ │
  │  │  │  │ Log Event N (JSON)          │  │ │ │
  │  │  │  │ timestamp + payload         │  │ │ │
  │  │  │  └─────────────────────────────┘  │ │ │
  │  │  └──────────────────────────────────┘ │ │
  │  └──────────────────────────────────────┘ │
  └──────────────────────────────────────────┘
```

### Navegación en la consola de AWS

Para acceder a los registros de invocación en la consola de AWS:

1. Abra la consola de **CloudWatch** utilizando la barra de búsqueda global.
2. En el panel de navegación de la izquierda, haga clic en **Logs** y luego en **Log groups**.
3. Busque el Log Group `/aws/bedrock/model-invocations` en la lista.
4. Haga clic en el nombre del Log Group para ver los Log Streams disponibles.
5. Seleccione un Log Stream para inspeccionar los Log Events individuales en formato JSON.

Cada Log Event contiene el registro completo de una invocación, incluyendo los campos de auditoría descritos en la [Sección 4](#4-campos-de-auditoría-en-registros-de-invocación).

---

## 3. Políticas de Retención de Registros

### Definición

Una **Log Retention Policy** (política de retención) determina la cantidad de días que los eventos de registro se mantienen almacenados en CloudWatch antes de ser eliminados automáticamente. Esta configuración se aplica a nivel de Log Group y afecta directamente los costos de almacenamiento.

### Opciones de retención disponibles

Amazon CloudWatch ofrece las siguientes opciones de retención:

| Período de retención | Caso de uso típico |
|---------------------|-------------------|
| **1 día** | Entornos de laboratorio, pruebas rápidas, desarrollo |
| **3 días** | Depuración a corto plazo |
| **5 días** | Monitoreo temporal de aplicaciones |
| **1 semana** | Análisis de incidentes recientes |
| **2 semanas** | Revisión de métricas operativas |
| **1 mes** | Auditoría mensual de operaciones |
| **2 meses** | Análisis de tendencias bimensuales |
| **3 meses** | Cumplimiento trimestral |
| **4 meses** | Retención extendida trimestral |
| **5 meses** | Análisis de medio año parcial |
| **6 meses** | Auditoría semestral |
| **1 año** | Cumplimiento anual estándar |
| **13 meses** | Retención anual con margen |
| **18 meses** | Cumplimiento regulatorio extendido |
| **2 años** | Retención a largo plazo |
| **3 años** | Cumplimiento regulatorio prolongado |
| **5 años** | Requisitos de retención empresarial |
| **6 años** | Cumplimiento financiero (SOX) |
| **7 años** | Retención regulatoria extendida |
| **8 años** | Requisitos de archivo prolongado |
| **9 años** | Retención pre-década |
| **10 años** | Máxima retención con expiración |
| **Never expire** | Retención permanente sin eliminación automática |

### Impacto en costos

El almacenamiento de registros en CloudWatch tiene un costo asociado por GB almacenado por mes. A mayor período de retención, mayor será el costo acumulado:

- **Retención corta (1-7 días)**: Costo mínimo. Los registros se eliminan rápidamente, ideal para entornos de prueba.
- **Retención media (1-6 meses)**: Costo moderado. Adecuado para entornos de desarrollo y staging.
- **Retención larga (1-10 años)**: Costo significativo. Reservado para requisitos de cumplimiento normativo.
- **Never expire**: Costo creciente indefinido. Solo cuando la regulación exige retención permanente.

### Recomendación para entornos de laboratorio

Para este laboratorio se recomienda configurar una retención de **1 día**. Esta configuración:

- Minimiza los costos de almacenamiento en la cuenta de AWS del laboratorio.
- Permite verificar los registros de auditoría durante la sesión de laboratorio.
- Elimina automáticamente los registros al día siguiente, manteniendo la cuenta limpia.
- Es suficiente para completar todos los ejercicios de validación del laboratorio.

---

## 4. Campos de Auditoría en Registros de Invocación

### Estructura del registro

Cada evento de registro generado por Model Invocation Logging es un objeto JSON que contiene campos de auditoría estandarizados. Estos campos permiten identificar de forma única cada invocación y reconstruir la interacción completa entre el usuario y el modelo.

### Tabla de campos de auditoría

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `accountId` | String | Identificador único de la cuenta de AWS que realizó la invocación. Permite asociar cada registro con la cuenta responsable. |
| `modelArn` | String | Amazon Resource Name (ARN) del modelo fundacional invocado. Identifica exactamente qué modelo generó la respuesta (ej. `arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-text-express-v1`). |
| `region` | String | Región de AWS donde se ejecutó la invocación (ej. `us-east-1`). Útil para auditorías multi-región. |
| `requestId` | String | Identificador único de la solicitud. Permite correlacionar registros con solicitudes específicas para depuración y trazabilidad. |
| `input.inputText` | String | Texto del prompt enviado al modelo por el usuario o la aplicación. Captura la entrada exacta que recibió el modelo. |
| `output.outputText` | String | Texto de la respuesta (completion) generada por el modelo. Captura la salida exacta que produjo el modelo. |
| `timestamp` | String (ISO 8601) | Marca temporal del momento en que se registró la invocación. Formato ISO 8601 (ej. `2025-01-15T14:30:00Z`). |
| `inputTokenCount` | Number | Cantidad de tokens procesados en la entrada. Útil para análisis de costos y uso. |
| `outputTokenCount` | Number | Cantidad de tokens generados en la salida. Útil para análisis de costos y uso. |

### Ejemplo de registro JSON

```json
{
  "schemaType": "ModelInvocationLog",
  "schemaVersion": "1.0",
  "timestamp": "2025-01-15T14:30:00Z",
  "accountId": "123456789012",
  "region": "us-east-1",
  "requestId": "a1b2c3d4-5678-90ab-cdef-EXAMPLE11111",
  "operation": "InvokeModel",
  "modelId": "amazon.titan-text-express-v1",
  "modelArn": "arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-text-express-v1",
  "input": {
    "inputContentType": "application/json",
    "inputTokenCount": 15,
    "inputText": "Explica qué es un sismógrafo y cómo funciona."
  },
  "output": {
    "outputContentType": "application/json",
    "outputTokenCount": 120,
    "outputText": "Un sismógrafo es un instrumento científico diseñado para detectar y registrar las ondas sísmicas generadas por terremotos..."
  }
}
```

Los campos `input.inputText` y `output.outputText` son especialmente relevantes para auditoría, ya que permiten reconstruir la conversación completa entre el usuario y el modelo.

---

## 5. Casos de Uso de Gobernanza y Cumplimiento

Model Invocation Logging habilita múltiples casos de uso de gobernanza y cumplimiento que son fundamentales para organizaciones que adoptan IA generativa de forma responsable.

### Auditoría de uso de IA

Los registros de invocación permiten responder preguntas clave de auditoría:

- **¿Quién usó el modelo?** El campo `accountId` identifica la cuenta responsable de cada invocación.
- **¿Qué modelo se utilizó?** El campo `modelArn` identifica el modelo específico invocado.
- **¿Cuándo se realizó la invocación?** El campo `timestamp` proporciona la marca temporal exacta.
- **¿Qué se preguntó y qué se respondió?** Los campos `input.inputText` y `output.outputText` capturan la interacción completa.

Esta información es esencial para generar reportes de uso, demostrar cumplimiento ante auditores y mantener un historial completo de las interacciones con modelos de IA.

### Detección de uso indebido

Los registros permiten identificar patrones de uso inapropiado o no autorizado:

- **Prompts inapropiados**: Detectar intentos de generar contenido dañino, sesgado o fuera de las políticas de la organización.
- **Volumen anómalo**: Identificar picos inusuales de invocaciones que podrían indicar abuso o acceso no autorizado.
- **Modelos no autorizados**: Verificar que solo se utilizan los modelos aprobados por la organización mediante el campo `modelArn`.

Combinado con Amazon CloudWatch Alarms, es posible configurar alertas automáticas cuando se detectan patrones sospechosos.

### Trazabilidad de costos

Cada invocación registrada incluye información que permite calcular y atribuir costos:

- **Tokens consumidos**: Los campos `inputTokenCount` y `outputTokenCount` permiten calcular el costo por invocación.
- **Modelo utilizado**: Diferentes modelos tienen diferentes tarifas. El campo `modelArn` permite segmentar costos por modelo.
- **Volumen de uso**: La cantidad total de invocaciones por período permite proyectar costos futuros.

Esta trazabilidad es fundamental para equipos de finanzas que necesitan asignar costos de IA a centros de costo específicos.

### Cumplimiento normativo

En industrias reguladas, los registros de invocación ayudan a cumplir con requisitos normativos:

- **Retención de registros**: Las políticas de retención de CloudWatch permiten cumplir con requisitos de retención de datos (ej. 1 año, 7 años según la regulación aplicable).
- **Evidencia de auditoría**: Los registros JSON proporcionan evidencia inmutable de cada interacción con modelos de IA.
- **Control de acceso**: Combinado con AWS IAM, se puede demostrar que solo usuarios autorizados accedieron a los modelos.
- **Protección de datos**: Los registros permiten verificar que no se procesaron datos sensibles sin las protecciones adecuadas (complementando los Guardrails del Lab 04).

---

## 6. Terminología AWS

La siguiente tabla resume los términos clave de Amazon CloudWatch y Model Invocation Logging utilizados en este laboratorio, con su equivalente en la interfaz de AWS y su definición:

| Término técnico | Nombre en interfaz AWS | Definición |
|----------------|------------------------|------------|
| Model Invocation Logging | Model invocation logging | Característica de Amazon Bedrock que captura automáticamente metadatos, prompts y completions de todas las invocaciones a modelos fundacionales |
| CloudWatch Log Group | Log groups | Contenedor lógico en Amazon CloudWatch que agrupa registros de un mismo origen, con políticas de retención y permisos configurables |
| Log Stream | Log streams | Secuencia de eventos de registro dentro de un Log Group, creada automáticamente por el servicio emisor |
| Log Event | Log events | Registro individual dentro de un Log Stream, compuesto por un timestamp y un mensaje (payload en formato JSON) |
| Log Retention Policy | Retention setting | Configuración que determina cuántos días se mantienen los registros en CloudWatch antes de su eliminación automática |
| Service Role | Service role | Rol de IAM que permite a Amazon Bedrock escribir registros en CloudWatch en nombre del usuario |
| ARN (Amazon Resource Name) | ARN | Identificador único global de un recurso en AWS, utilizado para referenciar modelos, Log Groups y otros recursos |
| Log Destination | Log destination | Destino configurado para recibir los registros de invocación (CloudWatch Logs o Amazon S3) |

Toda la terminología de este documento es consistente con la documentación oficial de Amazon Bedrock disponible en [docs.aws.amazon.com/bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html) y Amazon CloudWatch en [docs.aws.amazon.com/cloudwatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html).
