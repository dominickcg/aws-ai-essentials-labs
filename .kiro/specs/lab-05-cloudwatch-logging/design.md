# Documento de Diseño — Lab 05: Gobernanza y Auditoría con CloudWatch

## Visión General

Implementación del Laboratorio 5 — el laboratorio final del programa AWS AI Essentials. Se crean archivos de documentación, archivos de soporte y tests automatizados dentro de `lab-05-cloudwatch-logging/`, y se actualiza el README principal del proyecto.

El Lab 05 es independiente: NO hereda recursos de laboratorios anteriores. Todos los recursos AWS se crean desde cero y pueden eliminarse al finalizar.

---

## Arquitectura de Archivos

```
lab-05-cloudwatch-logging/
├── README.md                          # Guía paso a paso del laboratorio
├── CONCEPTOS-LOGGING.md               # Documento de conceptos teóricos
├── bedrock-logging-policy.json        # Política IAM de ejemplo para el Service Role
├── package.json                       # Infraestructura de tests
├── tsconfig.json                      # Configuración TypeScript
├── vitest.config.ts                   # Configuración Vitest
└── tests/
    ├── readme-structure.test.ts       # Validación de estructura del README del lab
    ├── readme-content.test.ts         # Validación de contenido del README del lab
    ├── conceptos-logging.test.ts      # Validación de CONCEPTOS-LOGGING.md
    ├── main-readme.test.ts            # Validación del README principal
    ├── cross-references.test.ts       # Validación de referencias cruzadas
    ├── readme-anchors.property.test.ts    # PBT: anchor links válidos en índice
    └── readme-steps.property.test.ts      # PBT: numeración secuencial de pasos

Archivos modificados:
├── README.md (raíz)                   # Actualizar tabla, objetivos, enlaces
```

---

## Componentes

### 1. README.md del Lab 05

Guía paso a paso siguiendo el patrón de `lab-04-bedrock-guardrails/README.md`.

#### Estructura de Secciones

```markdown
# 📋 Laboratorio 5 — Gobernanza y Auditoría con CloudWatch

[Descripción introductoria]

---

## Indice
1. Objetivos de Aprendizaje
2. Prerrequisitos
3. Configuración de CloudWatch
   - Paso 1: Verificación de Región AWS
   - Paso 2: Crear Log Group en CloudWatch
   - Paso 3: Configurar Política de Retención
4. Configuración de Model Invocation Logging
   - Paso 4: Habilitar Logging en Amazon Bedrock
   - Paso 5: Verificar Configuración de Logging
5. Validación de Registros de Auditoría
   - Paso 6: Generar Invocación de Prueba
   - Paso 7: Inspeccionar Registros en CloudWatch
   - Paso 8: Identificar Campos de Auditoría
6. Ciclo de Vida de Recursos
7. Solución de Problemas

---

⏱️ **Tiempo estimado**: 20 minutos
```

#### Pasos Detallados

| Paso | Sección | Acción Principal | Servicio AWS | Checkpoint |
|------|---------|-----------------|--------------|------------|
| 1 | Configuración de CloudWatch | Verificar región AWS | Consola AWS | Región correcta visible |
| 2 | Configuración de CloudWatch | Crear Log Group `/aws/bedrock/model-invocations` | CloudWatch | Log Group aparece en lista |
| 3 | Configuración de CloudWatch | Configurar retención a 1 día | CloudWatch | Retención muestra "1 day" |
| 4 | Model Invocation Logging | Habilitar logging en Bedrock Settings | Amazon Bedrock | Logging status activo |
| 5 | Model Invocation Logging | Verificar configuración guardada | Amazon Bedrock | Configuración persistida |
| 6 | Validación | Enviar prompt de prueba en Playground | Amazon Bedrock | Respuesta generada |
| 7 | Validación | Navegar a CloudWatch e inspeccionar logs | CloudWatch | Log Stream con eventos |
| 8 | Validación | Identificar campos `accountId`, `modelArn`, `input`, `output` | CloudWatch | Campos visibles en JSON |

#### Prerrequisitos

- Acceso a la cuenta de AWS proporcionada por el instructor
- Un modelo de la familia Anthropic Claude habilitado en Amazon Bedrock
- NO se requieren recursos de laboratorios anteriores

#### Ciclo de Vida de Recursos

| Recurso | Acción al finalizar |
|---------|---------------------|
| CloudWatch Log Group `/aws/bedrock/model-invocations` | Eliminar (último lab) |
| Configuración de Model Invocation Logging | Desactivar (último lab) |

---

### 2. CONCEPTOS-LOGGING.md

Documento de conceptos teóricos siguiendo el patrón de `CONCEPTOS-GUARDRAILS.md`.

#### Estructura de Secciones

```markdown
# 📋 Conceptos Fundamentales: Logging y Auditoría en Amazon Bedrock

[Descripción introductoria]

---

## Indice
1. Model Invocation Logging en Amazon Bedrock
2. Amazon CloudWatch: Log Groups y Log Streams
3. Políticas de Retención de Registros
4. Campos de Auditoría en Registros de Invocación
5. Casos de Uso de Gobernanza y Cumplimiento
6. Terminología AWS
```

#### Contenido por Sección

| Sección | Contenido | Elementos Visuales |
|---------|-----------|-------------------|
| 1. Model Invocation Logging | Qué captura, por qué es necesario, tipos de datos (metadatos, prompts, completions), flujo de datos | Diagrama ASCII: Bedrock → CloudWatch |
| 2. CloudWatch: Log Groups y Streams | Jerarquía Log Group → Log Stream → Log Event, navegación en consola | Diagrama ASCII de jerarquía |
| 3. Políticas de Retención | Opciones disponibles (1 día a 10 años, Never expire), impacto en costos, recomendación para labs (1 día) | Tabla de opciones |
| 4. Campos de Auditoría | `accountId`, `modelArn`, `region`, `requestId`, `input.inputText`, `output.outputText`, timestamps | Tabla de campos con descripción |
| 5. Gobernanza y Cumplimiento | Auditoría de uso, detección de uso indebido, trazabilidad de costos, cumplimiento normativo | Tabla de casos de uso |
| 6. Terminología AWS | Términos técnicos con nombre en interfaz AWS y definición | Tabla de terminología |

---

### 3. bedrock-logging-policy.json

Política IAM de ejemplo para el Service Role que permite a Amazon Bedrock escribir en CloudWatch.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:log-group:/aws/bedrock/*"
    }
  ]
}
```

---

### 4. Infraestructura de Tests

#### package.json

```json
{
  "name": "lab-05-cloudwatch-logging-tests",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "vitest --run"
  },
  "devDependencies": {
    "vitest": "^3.2.1",
    "fast-check": "^4.1.1"
  }
}
```

#### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "types": ["vitest/globals"]
  },
  "include": ["tests/**/*.ts"]
}
```

#### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
```

---

### 5. Actualización del README Principal

#### Cambios Requeridos

| Sección | Cambio |
|---------|--------|
| Objetivos de Aprendizaje | Agregar: "Configurar Model Invocation Logging en Amazon Bedrock con CloudWatch para auditar y rastrear invocaciones a modelos de IA generativa" |
| Tabla de Laboratorios | Reemplazar fila placeholder `Lab 05 \| Próximamente` con enlace real a `lab-05-cloudwatch-logging/` |
| Contenido Adicional > AWS Documentation | Agregar enlaces a CloudWatch Logs y Model Invocation Logging |

#### Fila de Lab 05 en Tabla

```markdown
| [Lab 05](lab-05-cloudwatch-logging/) | Gobernanza y Auditoría con CloudWatch | Configure Model Invocation Logging en Amazon Bedrock para auditar invocaciones a modelos de IA generativa con CloudWatch | 20 min |
```

#### Enlaces de Documentación a Agregar

- [Amazon CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html)
- [Amazon Bedrock Model Invocation Logging](https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html)

---

## Especificación de Tests

### Tests Unitarios

#### readme-structure.test.ts
Valida la estructura del README del Lab 05 según las directrices.

| Test | Validación | Req |
|------|-----------|-----|
| Título con emoji único | Regex: `^# .{1,2} Laboratorio 5` | R8-AC12 |
| Índice presente | Contiene sección "Indice" o "Índice" | R8-AC2 |
| Tiempo estimado | Contiene "20 minutos" | R8-AC4 |
| Objetivos de aprendizaje | Sección con 2-4 bullets sobre logging/auditoría | R8-AC5 |
| Prerrequisitos sin dependencias | Menciona que NO requiere recursos anteriores | R8-AC6 |
| Verificación de región como paso 1 | Primer paso contiene "región" | R8-AC1 |
| Checkpoints de verificación | Contiene múltiples "✓ Verificación" | R8-AC8 |
| Ciclo de vida de recursos | Sección presente mencionando "último laboratorio" | R8-AC9 |
| Solución de problemas | Sección con referencia a TROUBLESHOOTING.md | R8-AC10 |
| Escrito en español | No contiene frases comunes en inglés como "Prerequisites", "Learning Objectives" | R8-AC11 |

#### readme-content.test.ts
Valida el contenido específico del README del Lab 05.

| Test | Validación | Req |
|------|-----------|-----|
| Instrucciones de CloudWatch Log Group | Contiene `/aws/bedrock/model-invocations` | R1-AC4 |
| Instrucciones de retención | Menciona retención de 1 día | R1-AC5 |
| Instrucciones de Model Invocation Logging | Contiene pasos para habilitar logging | R2-AC4 |
| Instrucciones de Playground | Contiene pasos para enviar prompt de prueba | R3-AC4 |
| Campos de auditoría | Menciona `accountId`, `modelArn`, `input.inputText`, `output.outputText` | R3-AC5 |
| Referencia a CONCEPTOS-LOGGING.md | Enlace relativo en prerrequisitos | R6-AC8 |
| Patrón {nombre-participante} | No aplica (Lab 05 no crea recursos con nombre de participante) | R8-AC3 |

#### conceptos-logging.test.ts
Valida la estructura y contenido de CONCEPTOS-LOGGING.md.

| Test | Validación | Req |
|------|-----------|-----|
| Sección Model Invocation Logging | Contiene sección sobre qué captura y tipos de datos | R6-AC2 |
| Sección CloudWatch Log Groups | Contiene sección sobre jerarquía y navegación | R6-AC3 |
| Sección Log Retention Policy | Contiene sección sobre opciones y costos | R6-AC4 |
| Sección campos de auditoría | Menciona `accountId`, `modelArn`, `requestId`, timestamps | R6-AC5 |
| Sección gobernanza | Contiene sección sobre cumplimiento y casos de uso | R6-AC6 |
| Escrito en español | Validación de idioma | R6-AC7 |

#### main-readme.test.ts
Valida que el README principal refleja el Lab 05.

| Test | Validación | Req |
|------|-----------|-----|
| Fila Lab 05 en tabla | Contiene enlace a `lab-05-cloudwatch-logging/` | R5-AC1 |
| Título correcto | Contiene "Gobernanza" o "Auditoría" y "CloudWatch" | R5-AC1 |
| Tiempo estimado | Contiene "20 min" en fila de Lab 05 | R5-AC1 |
| No placeholder | No contiene "Próximamente" en fila Lab 05 | R5-AC1 |
| Enlaces de documentación | Contiene enlaces a CloudWatch Logs y Model Invocation Logging | R5-AC2 |
| Objetivo de aprendizaje | Sección incluye logging/gobernanza/auditoría | R5-AC3 |
| Labs 01-04 intactos | Filas de Lab 01-04 presentes sin cambios | R5-AC5 |
| Contribuciones intactas | Sección de Contribuciones presente | R5-AC4 |
| Licencia intacta | Sección de Licencia con "AMBER CLOUD GLOBAL LLC" | R5-AC4 |

#### cross-references.test.ts
Valida referencias cruzadas entre archivos.

| Test | Validación | Req |
|------|-----------|-----|
| README Lab05 → CONCEPTOS-LOGGING.md | Enlace relativo existe y archivo destino existe | R7-AC4 |
| README Principal → lab-05-cloudwatch-logging/ | Enlace relativo existe y directorio destino existe | R7-AC4 |
| README Lab05 → TROUBLESHOOTING.md | Enlace relativo a guía de troubleshooting | R7-AC4 |

### Tests de Propiedades (Property-Based)

#### readme-anchors.property.test.ts

**Propiedad**: Todo anchor link listado en el índice del README del Lab 05 debe corresponder a un heading real en el documento.

```
Para todo anchor_link en índice del README:
  existe heading H2 o H3 cuyo slug coincide con anchor_link
```

Implementación: Extraer todos los `[texto](#anchor)` del índice, generar slugs de todos los headings H2/H3, verificar que cada anchor existe en el conjunto de slugs.

#### readme-steps.property.test.ts

**Propiedad**: Los pasos numerados en el README del Lab 05 deben seguir una secuencia estrictamente creciente dentro de cada sección.

```
Para toda sección con pasos "### Paso N":
  los números N forman una secuencia creciente sin saltos
```

Implementación: Extraer todos los headings `### Paso N:`, agrupar por sección padre, verificar que la secuencia es [1, 2, 3, ...] o [N, N+1, N+2, ...] continua.

---

## Manejo de Errores y Casos Especiales

| Escenario | Manejo en README |
|-----------|-----------------|
| Log Group ya existe | Paso 2 incluye nota sobre conflicto de nombre |
| Permisos IAM insuficientes | Sección de troubleshooting con diagnóstico |
| Logs no aparecen en CloudWatch | Nota de espera (⏱️ 1-2 minutos) + troubleshooting |
| Límite de 256 KB excedido | Mención en CONCEPTOS-LOGGING.md sobre truncamiento/S3 |

---

## Trazabilidad Requerimientos → Diseño

| Requerimiento | Componentes |
|---------------|-------------|
| R1: CloudWatch Log Group | README Pasos 1-3, CONCEPTOS sección 2-3 |
| R2: Model Invocation Logging | README Pasos 4-5, bedrock-logging-policy.json, CONCEPTOS sección 1 |
| R3: Validación de Registros | README Pasos 6-8, CONCEPTOS sección 4 |
| R4: Estructura de Directorio | Todos los archivos en lab-05-cloudwatch-logging/ |
| R5: README Principal | Cambios en README.md raíz |
| R6: CONCEPTOS-LOGGING.md | CONCEPTOS-LOGGING.md completo |
| R7: Tests de Validación | 7 archivos en tests/, package.json, tsconfig.json, vitest.config.ts |
| R8: Conformidad con Directrices | README.md del lab (estructura, formato, idioma) |
