# Plan de Implementación: Lab 02 — IA Generativa con Amazon Bedrock Playgrounds

## Visión General

Implementación incremental de los cuatro entregables del Laboratorio 02: el documento de conceptos de IA Generativa (`CONCEPTOS-IA-GENERATIVA.md`), la guía paso a paso (`README.md`), el archivo de prompts de geofísica (`prompts-geofisica.md`) y el README principal del proyecto (`README.md` en raíz), junto con pruebas unitarias y basadas en propiedades usando Vitest y fast-check, y validación contra documentación oficial de AWS.

## Tareas

- [x] 1. Configurar la estructura del proyecto y el entorno de tests
  - [x] 1.1 Crear la carpeta `lab-02-bedrock-playgrounds/` con los archivos de configuración del proyecto
    - Crear `package.json` con `vitest` (^3.2.1) y `fast-check` (^4.1.1) como devDependencies, script `test` ejecutando `vitest --run`
    - Crear `vitest.config.ts` con `include: ['tests/**/*.test.ts']`
    - Crear `tsconfig.json` con target ES2022, module ESNext, moduleResolution bundler
    - Crear carpeta `tests/` vacía
    - _Requerimientos: 8.5, 8.9_

- [x] 2. Crear el archivo de prompts de geofísica (`prompts-geofisica.md`)
  - [x] 2.1 Escribir `prompts-geofisica.md` con todos los prompts del laboratorio
    - Título descriptivo del archivo
    - Sección: Prompt de comparación de modelos (ondas P y S para estudiante de 15 años)
    - Sección: Prompt SQL de eventos sísmicos (para Temperature 0.0 y 0.9)
    - Sección: System prompt de geofísico experto en sismología
    - Sección: Prompt Zero-Shot (clasificación de reporte sísmico con magnitud 4.2, profundidad 15 km, zona de subducción)
    - Sección: Prompt Few-Shot (3 ejemplos JSON: Sismo_Tectonico, Sismo_Volcanico, Sismo_Inducido + caso a clasificar magnitud 5.4)
    - Sección: Prompt Chain-of-Thought (cálculo distancia epicentral, ondas P 6 km/s, S 3.5 km/s, intervalo 8 segundos)
    - Sección: Prompt de alucinaciones (terremoto de Pisco, Perú, 15 de agosto de 2007)
    - Cada prompt en bloque de código para facilitar copia
    - _Requerimientos: 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.5, 5.1_

  - [ ]* 2.2 Escribir pruebas unitarias para contenido de `prompts-geofisica.md`
    - Verificar presencia de todos los prompts requeridos: comparación de modelos, SQL, system prompt, Zero-Shot, Few-Shot (3 ejemplos JSON), Chain-of-Thought, alucinaciones
    - Verificar que el archivo contiene los términos clave: ondas P, ondas S, Sismo_Tectonico, Sismo_Volcanico, Sismo_Inducido, Pisco
    - Archivo: `tests/prompts-geofisica-content.test.ts`
    - _Requerimientos: 3.5_

- [x] 3. Crear el documento CONCEPTOS-IA-GENERATIVA.md
  - [x] 3.1 Escribir `CONCEPTOS-IA-GENERATIVA.md` con las 12 secciones pedagógicas requeridas
    - Título con emoji único: `🧠 Conceptos Fundamentales de IA Generativa`
    - Índice con enlaces de ancla a cada sección
    - Sección 1: Qué es la IA Generativa (definición, distinción con ML tradicional, nota sobre generación estadística)
    - Sección 2: Conceptos Arquitectónicos (FM, LLM, Context Window, Inferencia)
    - Sección 3: Predicción de Siguiente Token (mecanismo iterativo, distribución de probabilidad, implicación de Temperature)
    - Sección 4: Prompt y System Prompt (definiciones, diferencia clave, ejemplo de system prompt geofísico)
    - Sección 5: Familias de Modelos en Amazon Bedrock (marketplace, Anthropic Claude, Meta Llama, criterios de selección)
    - Sección 6: Unidades y Métricas (Token ~750 palabras/1000 tokens, Latencia vs. Throughput)
    - Sección 7: Parámetros de Inferencia (Temperature, Top-P, Max Generation con rangos y casos de uso)
    - Sección 8: Estrategias de Prompting (Zero-Shot, Few-Shot, Chain-of-Thought con descripciones)
    - Sección 9: Seguridad y Riesgos (Alucinación en geofísica, Prompt Injection, PII)
    - Sección 10: IA Generativa vs. ML Tradicional (comparativa con Lab 01, SageMaker Canvas)
    - Sección 11: Embeddings y Multimodalidad (vectores, relaciones semánticas, mención de imágenes satelitales/sismogramas)
    - Sección 12: Terminología AWS (consistencia con documentación oficial de Amazon Bedrock)
    - Formato consistente con `CONCEPTOS-ML.md` del Lab 01 (separadores `---`, bloques de código, tablas)
    - _Requerimientos: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.12, 1.13_

  - [ ]* 3.2 Escribir prueba de propiedad para estructura de CONCEPTOS-IA-GENERATIVA.md
    - **Propiedad 1: Estructura válida de CONCEPTOS-IA-GENERATIVA.md**
    - Validar: emoji único en título, índice con anclas funcionales, 12 secciones en orden pedagógico
    - Archivo: `tests/conceptos-ia-generativa-structure.property.test.ts`
    - **Valida: Requerimiento 1.1**

  - [ ]* 3.3 Escribir pruebas unitarias para contenido de CONCEPTOS-IA-GENERATIVA.md
    - Verificar sección IA Generativa: definición, distinción con ML, nota sobre generación estadística
    - Verificar sección Conceptos Arquitectónicos: FM, LLM, Context Window, Inferencia
    - Verificar sección Predicción Siguiente Token: distribución de probabilidad, Temperature
    - Verificar sección Prompt y System Prompt: definiciones y diferencia clave
    - Verificar sección Familias de Modelos: Anthropic Claude, Meta Llama, Amazon Bedrock
    - Verificar sección Unidades y Métricas: Token, Latencia, Throughput
    - Verificar sección Parámetros de Inferencia: Temperature, Top-P, Max Generation
    - Verificar sección Estrategias de Prompting: Zero-Shot, Few-Shot, Chain-of-Thought
    - Verificar sección Seguridad y Riesgos: Alucinación, Prompt Injection, PII
    - Verificar sección IA Gen vs ML Tradicional: ML Tradicional, Lab 01, SageMaker Canvas
    - Verificar sección Embeddings y Multimodalidad: Embedding, vector, Multimodalidad
    - Archivo: `tests/conceptos-ia-generativa-content.test.ts`
    - _Requerimientos: 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.12_

- [x] 4. Checkpoint — Verificar CONCEPTOS-IA-GENERATIVA.md, prompts-geofisica.md y pruebas
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Crear el README.md del laboratorio — Secciones iniciales
  - [x] 5.1 Escribir encabezado, índice, objetivos, prerrequisitos del README
    - Título con emoji único: `🔬 Laboratorio 2: IA Generativa con Amazon Bedrock Playgrounds`
    - Índice con enlaces de ancla a cada sección
    - Tiempo estimado: 40 minutos
    - Objetivos de aprendizaje (3-4 puntos: comparar modelos, técnicas de prompting, parámetros de inferencia, alucinaciones)
    - Sección de prerrequisitos: acceso a Amazon Bedrock, modelos Meta Llama y Anthropic Claude habilitados, archivo `prompts-geofisica.md`
    - Referencia a CONCEPTOS-IA-GENERATIVA.md antes de instrucciones: "Antes de comenzar, revise la [Guía de Conceptos Fundamentales de IA Generativa](CONCEPTOS-IA-GENERATIVA.md)..."
    - Indicación de independencia del Lab 01 (no requiere recursos del Lab 01)
    - _Requerimientos: 8.1, 8.2, 8.5, 8.7, 8.8, 8.9, 8.10, 1.14_

- [x] 6. Crear el README.md del laboratorio — Instrucciones paso a paso (Pasos 1-4)
  - [x] 6.1 Escribir Paso 1 (Verificación de región) y Paso 2 (Acceso a Amazon Bedrock y habilitación de modelos)
    - Paso 1 DEBE ser verificación de región AWS (esquina superior derecha de la consola)
    - Paso 2: navegación a Amazon Bedrock, sección Model Access, habilitación de Meta Llama y Anthropic Claude
    - Instrucciones para solicitar acceso a modelos con nota sobre aprobación previa del instructor
    - Puntos de verificación visual (`✓ Verificación`) después de cada paso
    - _Requerimientos: 8.1, 8.6, 8.11, 2.1_

  - [x] 6.2 Escribir Paso 3 (Comparativa de modelos) y Paso 4 (Impacto de Temperature)
    - Paso 3: Abrir Chat Playground, seleccionar Meta Llama y Anthropic Claude en modo comparación
    - Enviar prompt de ondas P y S (referencia a `prompts-geofisica.md`)
    - Configurar system prompt de geofísico experto
    - Sección de análisis comparativo (precisión técnica, adaptación de tono, comportamiento)
    - Paso 4: Ajustar Temperature a 0.0, enviar prompt SQL de eventos sísmicos, verificar respuesta determinista
    - Repetir con Temperature 0.9, observar variabilidad
    - Enlace contextual a sección de Parámetros de Inferencia en CONCEPTOS-IA-GENERATIVA.md
    - Puntos de verificación visual después de cada paso
    - _Requerimientos: 2.1, 2.2, 2.3, 2.4, 2.5, 4.1, 4.2, 1.14_

- [-] 7. Crear el README.md del laboratorio — Instrucciones paso a paso (Pasos 5-9)
  - [x] 7.1 Escribir Paso 5 (Zero-Shot), Paso 6 (Few-Shot) y Paso 7 (Chain-of-Thought)
    - Paso 5: Técnica Zero-Shot con prompt de clasificación de reporte sísmico (referencia a `prompts-geofisica.md`)
    - Paso 6: Técnica Few-Shot con 3 ejemplos JSON sísmicos + caso a clasificar (referencia a `prompts-geofisica.md`)
    - Paso 7: Técnica Chain-of-Thought con cálculo de distancia epicentral (referencia a `prompts-geofisica.md`)
    - Tabla comparativa de técnicas de prompting (Técnica, Cuándo usarla, Ventaja, Limitación, Ejemplo geofísica)
    - Enlace contextual a sección de Estrategias de Prompting en CONCEPTOS-IA-GENERATIVA.md
    - Puntos de verificación visual después de cada paso
    - _Requerimientos: 3.1, 3.2, 3.3, 3.4, 8.5, 8.6, 1.14_

  - [x] 7.2 Escribir Paso 8 (Alucinaciones) y Paso 9 (Gestión de parámetros y costos)
    - Paso 8: Enviar prompt sobre terremoto de Pisco 2007 (referencia a `prompts-geofisica.md`)
    - Explicar peligros de alucinaciones en geofísica (alertas de tsunamis, riesgo sísmico, investigación)
    - Estrategias de mitigación: RAG con bases de datos sísmicas, validación contra IGP/USGS/ISC
    - Enlace contextual a sección de Seguridad y Riesgos en CONCEPTOS-IA-GENERATIVA.md
    - Paso 9: Resumen de parámetros de inferencia, ubicación de controles en la interfaz, nota de costos por tokens
    - Puntos de verificación visual
    - _Requerimientos: 5.1, 5.2, 5.3, 4.1, 4.2, 4.3, 1.14_

- [x] 8. Completar el README.md — Secciones finales
  - [x] 8.1 Escribir secciones de cierre del README
    - Ciclo de vida de recursos: Amazon Bedrock Playgrounds no crea recursos persistentes, nota sobre costos por tokens
    - Sección de Solución de Problemas con referencia a `TROUBLESHOOTING.md`
    - Errores que requieren asistencia del instructor (permisos IAM, límites de cuota)
    - _Requerimientos: 8.3, 8.4_

  - [ ]* 8.2 Escribir prueba de propiedad para estructura del README
    - **Propiedad 2: Estructura válida del README del laboratorio**
    - Validar: emoji único en título, índice con anclas, tiempo estimado, objetivos de aprendizaje
    - Archivo: `tests/readme-structure.property.test.ts`
    - **Valida: Requerimientos 8.2, 8.7**

  - [ ]* 8.3 Escribir prueba de propiedad para primer paso como verificación de región
    - **Propiedad 3: Primer paso del README es verificación de región**
    - Archivo: `tests/readme-structure.property.test.ts`
    - **Valida: Requerimiento 8.1**

  - [ ]* 8.4 Escribir prueba de propiedad para referencias cruzadas a CONCEPTOS-IA-GENERATIVA.md
    - **Propiedad 4: Referencias cruzadas a CONCEPTOS-IA-GENERATIVA.md presentes en README**
    - Validar: al menos una referencia en prerrequisitos y al menos un enlace contextual en instrucciones
    - Archivo: `tests/readme-structure.property.test.ts`
    - **Valida: Requerimientos 1.14, 8.9**

  - [ ]* 8.5 Escribir prueba de propiedad para puntos de verificación visual
    - **Propiedad 5: Puntos de verificación visual después de pasos mayores**
    - Validar que pasos de configuración y experimentación tienen `✓ Verificación`
    - Archivo: `tests/readme-structure.property.test.ts`
    - **Valida: Requerimiento 8.6**

  - [ ]* 8.6 Escribir pruebas unitarias para contenido del README
    - Verificar comparativa de modelos: Meta Llama, Anthropic Claude, prompt ondas P y S
    - Verificar Temperature 0.0 y 0.9 con prompt SQL
    - Verificar prompts Zero-Shot, Few-Shot (3 ejemplos JSON), Chain-of-Thought
    - Verificar tabla comparativa de técnicas de prompting
    - Verificar parámetros de inferencia: impacto práctico, ubicación de controles, nota de costos
    - Verificar alucinaciones: prompt Pisco 2007, peligros en geofísica, estrategias de mitigación (RAG)
    - Verificar sección de prerrequisitos con Amazon Bedrock y modelos habilitados
    - Verificar referencia explícita a `prompts-geofisica.md`
    - Verificar indicación de independencia del Lab 01
    - Verificar instrucciones para habilitar acceso a modelos (Model Access)
    - Verificar sección Solución de Problemas con referencia a TROUBLESHOOTING.md
    - Verificar ciclo de vida de recursos (sin recursos persistentes, costos por tokens)
    - Archivo: `tests/readme-content.test.ts`
    - _Requerimientos: 2.1-2.5, 3.1-3.4, 4.1-4.3, 5.1-5.3, 8.3, 8.4, 8.5, 8.8, 8.10, 8.11_

- [x] 9. Checkpoint — Verificar README.md del laboratorio y todas las pruebas
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Crear el README.md principal del proyecto (raíz)
  - [x] 10.1 Escribir `README.md` en la raíz del proyecto con la tabla de 5 laboratorios
    - Título: `☁️ AWS AI Essentials`
    - Descripción general del programa de laboratorios
    - Resumen de objetivos de aprendizaje
    - Prerrequisitos generales
    - Tabla de laboratorios con 5 entradas:
      - Lab 01: ML No-Code con SageMaker Canvas (40 min, enlace a `lab-01-sagemaker-canvas/`)
      - Lab 02: IA Generativa con Bedrock Playgrounds (40 min, enlace a `lab-02-bedrock-playgrounds/`)
      - Lab 03: Próximamente
      - Lab 04: Próximamente
      - Lab 05: Próximamente
    - Contenido adicional (AWS Documentation, Skill Builder, Certification)
    - Contribuciones
    - Licencia MIT: "Este proyecto está licenciado bajo la Licencia MIT. Copyright © 2026 AMBER CLOUD GLOBAL LLC"
    - _Requerimientos: 7.1, 7.2, 7.3, 7.4_

  - [ ]* 10.2 Escribir prueba de propiedad para estructura del README Principal
    - **Propiedad 6: Estructura válida del README Principal**
    - Validar: emoji en título, tabla con 5 labs, enlaces a Lab 01 y Lab 02, licencia MIT
    - Archivo: `tests/readme-principal.property.test.ts`
    - **Valida: Requerimiento 7.1**

  - [ ]* 10.3 Escribir pruebas unitarias para contenido del README Principal
    - Verificar tabla con 5 laboratorios
    - Verificar enlaces funcionales a Lab 01 y Lab 02
    - Verificar Labs 03-05 con estado "Próximamente"
    - Verificar licencia MIT con copyright
    - Archivo: `tests/readme-principal.test.ts`
    - _Requerimientos: 7.2, 7.3_

- [x] 11. Checkpoint — Verificar README principal y todas las pruebas del proyecto
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Validación contra documentación oficial de AWS
  - [x] 12.1 Validar pasos de navegación y terminología con MCP Server de documentación AWS
    - Usar MCP Server AWS Docs para verificar rutas de navegación en consola de Amazon Bedrock
    - Verificar nombres de botones, opciones de menú y flujos de interfaz (Chat Playground, Model Access)
    - Validar nombres de modelos disponibles (Meta Llama, Anthropic Claude) y disponibilidad regional
    - Verificar rangos de parámetros (Temperature, Top-P, Max Generation) contra documentación oficial
    - Verificar terminología en español consistente con interfaz de AWS
    - Documentar desviaciones con justificación explícita si las hubiera
    - Actualizar cualquier información desactualizada descubierta
    - _Requerimientos: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_

- [x] 13. Checkpoint final — Verificar todos los entregables y pruebas
  - Ensure all tests pass, ask the user if questions arise.

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requerimientos específicos para trazabilidad
- Los checkpoints aseguran validación incremental
- Las pruebas de propiedad validan propiedades universales de correctitud usando fast-check (TypeScript)
- Las pruebas unitarias validan ejemplos específicos y casos de borde
- Toda la documentación debe estar en español; código, nombres de API y servicios AWS permanecen en inglés
- El archivo `prompts-geofisica.md` es la fuente de verdad para todos los prompts del laboratorio
