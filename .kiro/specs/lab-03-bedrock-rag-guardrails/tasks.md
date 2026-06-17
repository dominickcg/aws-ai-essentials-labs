# Plan de Implementación: Lab 03 — RAG y Guardrails con Amazon Bedrock

## Visión General

Implementación incremental de los ocho entregables del Laboratorio 03: el documento de conceptos de RAG y Guardrails (`CONCEPTOS-RAG-GUARDRAILS.md`), la guía paso a paso de Partes 1 y 2 (`README-RAG.md`), la guía de Parte 3 (`README-GUARDRAILS.md`), los documentos geofísicos de soporte (`documentos-geofisicos/`), los archivos de prompts (`prompts-rag.md` y `prompts-guardrails.md`), la actualización del README principal (`README.md` en raíz) y la suite de tests automatizados usando Vitest y fast-check.

## Tareas

- [x] 1. Configurar la estructura del proyecto y el entorno de tests
  - [x] 1.1 Crear la carpeta `lab-03-bedrock-rag-guardrails/` con los archivos de configuración del proyecto
    - Crear `package.json` con `vitest` (^3.2.1) y `fast-check` (^4.1.1) como devDependencies, script `test` ejecutando `vitest --run`
    - Crear `vitest.config.ts` con `include: ['tests/**/*.test.ts']`
    - Crear `tsconfig.json` con target ES2022, module ESNext, moduleResolution bundler
    - Crear carpeta `tests/` vacía
    - Crear carpeta `documentos-geofisicos/` vacía
    - _Requerimientos: 13.1_

- [x] 2. Crear los documentos geofísicos de soporte (`documentos-geofisicos/`)
  - [x] 2.1 Escribir `documentos-geofisicos/reporte-actividad-sismica.md`
    - Reporte de actividad sísmica con datos de estaciones, magnitudes, profundidades y coordenadas de eventos recientes
    - Incluir datos PII ficticios de investigadores de campo (nombres, correos `@igp.gob.pe`, teléfonos `+51-XXX-XXX-XXX`)
    - Información técnicamente precisa sobre geofísica y sismología
    - Formato Markdown compatible con RAG
    - _Requerimientos: 7.1, 7.2, 7.3_

  - [x] 2.2 Escribir `documentos-geofisicos/procedimientos-monitoreo-sismico.md`
    - Guía de procedimientos de monitoreo sísmico con protocolos de operación de estaciones sismológicas
    - Incluir datos PII ficticios de sismólogos responsables (nombres, correos, teléfonos)
    - Información técnicamente precisa
    - Formato Markdown compatible con RAG
    - _Requerimientos: 7.1, 7.2, 7.3_

  - [x] 2.3 Escribir `documentos-geofisicos/glosario-geofisica-sismologia.md`
    - Glosario técnico de geofísica y sismología con definiciones de términos del dominio
    - Incluir datos PII ficticios de autores/revisores
    - Formato Markdown compatible con RAG
    - _Requerimientos: 7.1, 7.2, 7.3_

  - [ ]* 2.4 Escribir pruebas para contenido de documentos geofísicos
    - **Propiedad 6: Documentos geofísicos válidos con PII**
    - Validar al menos 3 archivos en formato MD, con al menos un patrón de correo electrónico, un número de teléfono y un nombre de persona identificable en el conjunto completo
    - Archivo: `tests/documentos-geofisicos-content.test.ts`
    - **Valida: Requerimientos 7.1, 7.2**

- [x] 3. Crear los archivos de prompts de soporte
  - [x] 3.1 Escribir `prompts-rag.md` con todos los prompts de prueba para la Knowledge Base RAG
    - Título descriptivo del archivo
    - Sección: Prompts de prueba RAG (al menos 3 consultas geofísicas: datos sísmicos específicos, síntesis de múltiples documentos, consulta fuera de dominio)
    - Cada prompt en bloque de código para facilitar copia
    - _Requerimientos: 3.5, 8.1, 8.4_

  - [x] 3.2 Escribir `prompts-guardrails.md` con todos los prompts de prueba para Guardrails
    - Título descriptivo del archivo
    - Sección: Prompts de temas denegados (predicción de terremotos, diagnóstico estructural)
    - Sección: Prompt de PII (investigador ficticio Dr. Carlos Mendoza con correo, teléfono)
    - Sección: Prompts de integración RAG + Guardrails (PII en documentos indexados, tema denegado con KB activa)
    - Cada prompt en bloque de código para facilitar copia
    - _Requerimientos: 4.1, 4.2, 5.1, 5.2, 6.2, 6.3, 8.2, 8.4_

  - [ ]* 3.3 Escribir pruebas para contenido de `prompts-rag.md`
    - **Propiedad 7: Prompts en bloques de código en archivos de soporte (RAG)**
    - Verificar al menos 3 consultas RAG geofísicas + 1 fuera de dominio
    - Verificar que todos los prompts están en bloques de código (triple backtick)
    - Archivo: `tests/prompts-rag-content.test.ts`
    - **Valida: Requerimientos 8.1, 8.4**

  - [ ]* 3.4 Escribir pruebas para contenido de `prompts-guardrails.md`
    - **Propiedad 7: Prompts en bloques de código en archivos de soporte (Guardrails)**
    - Verificar prompts de temas denegados, PII e integración RAG+Guardrails
    - Verificar que todos los prompts están en bloques de código (triple backtick)
    - Archivo: `tests/prompts-guardrails-content.test.ts`
    - **Valida: Requerimientos 8.2, 8.4**

- [x] 4. Checkpoint — Verificar archivos de soporte (documentos geofísicos y prompts)
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Crear el documento CONCEPTOS-RAG-GUARDRAILS.md
  - [x] 5.1 Escribir `CONCEPTOS-RAG-GUARDRAILS.md` con las 8 secciones pedagógicas requeridas
    - Título con emoji único: `🗄️ Conceptos Fundamentales: RAG y Guardrails con Amazon Bedrock`
    - Índice con enlaces de ancla a cada sección
    - Sección 1: El Problema que RAG Resuelve (limitación de LLMs, knowledge cutoff, solución RAG, analogía geofísica con catálogo sísmico del IGP)
    - Sección 2: Arquitectura de RAG Paso a Paso (Fase de Ingestión: chunking → embeddings → vector store; Fase de Consulta: embedding de query → búsqueda semántica → contexto; Fase de Generación: respuesta con citas)
    - Sección 3: Embeddings en Práctica y Bases de Datos Vectoriales (expansión del concepto del Lab 02, uso concreto en RAG, similitud semántica, Amazon OpenSearch Serverless, enlace a CONCEPTOS-IA-GENERATIVA.md)
    - Sección 4: Knowledge Bases en Amazon Bedrock (definición, componentes: S3 + Titan Embeddings + OpenSearch + Claude, Chunking Strategy: default/fixed size/none)
    - Sección 5: Guardrails para Amazon Bedrock (definición, evaluación de entrada y salida, temas denegados, filtros PII, filtros de contenido, mensaje de bloqueo personalizado)
    - Sección 6: Integración de Guardrails con RAG (flujo completo, caso de uso geofísico, trazabilidad/Trace)
    - Sección 7: Preparación del Entorno (IAM Service Role, bucket S3 como Data Source, cifrado SSE-S3, convención de nombres con `{nombre-participante}`)
    - Sección 8: Terminología AWS (consistencia con documentación oficial de Amazon Bedrock)
    - Formato consistente con `CONCEPTOS-IA-GENERATIVA.md` del Lab 02 y `CONCEPTOS-ML.md` del Lab 01 (separadores `---`, bloques de código, tablas)
    - Referencia explícita a `CONCEPTOS-IA-GENERATIVA.md` del Lab 02 para conceptos base
    - _Requerimientos: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10_

  - [ ]* 5.2 Escribir prueba de propiedad para estructura de CONCEPTOS-RAG-GUARDRAILS.md
    - **Propiedad 1: Estructura válida de CONCEPTOS-RAG-GUARDRAILS.md**
    - Validar: emoji único en título, índice con anclas funcionales, 8 secciones en orden pedagógico
    - Archivo: `tests/conceptos-rag-guardrails-structure.property.test.ts`
    - **Valida: Requerimiento 1.1**

  - [ ]* 5.3 Escribir pruebas unitarias para contenido de CONCEPTOS-RAG-GUARDRAILS.md
    - Verificar sección RAG: limitación LLMs, knowledge cutoff, solución RAG, analogía geofísica
    - Verificar sección Arquitectura RAG: Ingestión, chunking, embeddings, Consulta, búsqueda semántica, Generación, citas
    - Verificar sección Embeddings: similitud semántica, OpenSearch Serverless, enlace a CONCEPTOS-IA-GENERATIVA.md
    - Verificar sección Knowledge Bases: S3, Titan Embeddings, OpenSearch, Claude, Chunking Strategy
    - Verificar sección Guardrails: temas denegados, filtros PII, filtros de contenido, mensaje de bloqueo
    - Verificar sección Integración: flujo completo, caso geofísico, Trace/trazabilidad
    - Verificar sección Preparación: IAM Service Role, S3, SSE-S3, {nombre-participante}
    - Verificar referencia explícita a CONCEPTOS-IA-GENERATIVA.md del Lab 02
    - Archivo: `tests/conceptos-rag-guardrails-content.test.ts`
    - _Requerimientos: 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.10_

- [x] 6. Checkpoint — Verificar CONCEPTOS-RAG-GUARDRAILS.md y pruebas
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Crear el README-RAG.md — Secciones iniciales
  - [x] 7.1 Escribir encabezado, índice, objetivos, prerrequisitos del README-RAG
    - Título con emoji único: `🗃️ Laboratorio 3 — Parte 1 y 2: RAG con Amazon Bedrock Knowledge Bases`
    - Índice con enlaces de ancla a cada sección
    - Tiempo estimado: 30-35 minutos
    - Objetivos de aprendizaje (3-4 puntos: configurar infraestructura IAM/S3, crear Knowledge Base, ejecutar consultas RAG con citas)
    - Sección de prerrequisitos: acceso a Amazon Bedrock, modelos habilitados, referencia a CONCEPTOS-RAG-GUARDRAILS.md
    - Indicación de independencia de Labs 01 y 02
    - _Requerimientos: 11.1, 11.3, 11.4, 11.6_

- [x] 8. Crear el README-RAG.md — Parte 1: Preparación del Entorno (Pasos 1-4)
  - [x] 8.1 Escribir Paso 1 (Verificación de región) y Paso 2 (Verificar Service-Linked Role de IAM)
    - Paso 1 DEBE ser verificación de región AWS (esquina superior derecha de la consola)
    - Paso 2: Verificar Service-Linked Role con entidad de confianza `bedrock.amazonaws.com`, permisos S3 lectura + OpenSearch `aoss:APIAccessAll`
    - Ruta de navegación explícita en la consola de IAM
    - Puntos de verificación visual (`✓ Verificación`) después de cada paso
    - Nota: notificar al instructor ante errores de permisos
    - _Requerimientos: 2.1, 2.2, 2.5, 2.6_

  - [x] 8.2 Escribir Paso 3 (Crear bucket S3) y Paso 4 (Cargar documentos geofísicos)
    - Paso 3: Crear bucket `s3-lab03-knowledge-source-{nombre-participante}` con SSE-S3
    - Paso 4: Cargar documentos de `documentos-geofisicos/` al bucket, referencia por nombre y ruta relativa
    - Verificar formatos compatibles con RAG (MD)
    - Puntos de verificación visual después de cada paso
    - _Requerimientos: 2.3, 2.4, 2.5, 7.4, 11.7_

- [x] 9. Crear el README-RAG.md — Parte 2: RAG con Knowledge Bases (Pasos 5-10)
  - [x] 9.1 Escribir Paso 5 (Crear Knowledge Base) y Paso 6 (Configurar Data Source)
    - Paso 5: Navegar a Amazon Bedrock > Knowledge Bases, crear KB con nombre incluyendo `{nombre-participante}`, seleccionar Amazon Titan Text Embeddings v2, Quick create OpenSearch Serverless, conectar bucket S3
    - Paso 6: Configurar Data Source con URI `s3://s3-lab03-knowledge-source-{nombre-participante}/`
    - Puntos de verificación visual
    - Enlace contextual a sección de Knowledge Bases en CONCEPTOS-RAG-GUARDRAILS.md
    - _Requerimientos: 3.1, 3.2, 3.9, 11.3, 11.7_

  - [x] 9.2 Escribir Paso 7 (Sincronización) y Paso 8 (Selección de modelo)
    - Paso 7: Ejecutar sincronización (Sync), explicar proceso (chunking, embeddings, OpenSearch), nota de espera hasta estado "Available"
    - Paso 8: Seleccionar modelo Anthropic Claude para generación en la interfaz de prueba
    - Puntos de verificación visual
    - Enlace contextual a sección de Arquitectura RAG en CONCEPTOS-RAG-GUARDRAILS.md
    - _Requerimientos: 3.3, 3.4, 3.7, 3.9_

  - [x] 9.3 Escribir Paso 9 (Consultas RAG) y Paso 10 (Verificar citas)
    - Paso 9: Probar consultas RAG con prompts de `prompts-rag.md` (3 consultas geofísicas + 1 fuera de dominio)
    - Paso 10: Verificar presencia de citas/referencias en respuestas RAG (nombre del archivo de origen en S3)
    - Referencia explícita a `prompts-rag.md` en cada paso donde se utilice un prompt
    - Puntos de verificación visual después de cada consulta
    - _Requerimientos: 3.5, 3.6, 3.9, 8.3_

- [x] 10. Completar el README-RAG.md — Secciones finales
  - [x] 10.1 Escribir secciones de cierre del README-RAG
    - Pasos de diagnóstico si KB o sincronización falla (verificar permisos IAM, accesibilidad S3, modelo de embeddings)
    - Nota: notificar al instructor si el error persiste
    - Sección de Solución de Problemas con referencia a `TROUBLESHOOTING.md`
    - _Requerimientos: 3.8, 11.1_

  - [ ]* 10.2 Escribir prueba de propiedad para estructura del README-RAG
    - **Propiedad 2: Estructura válida de README-RAG.md**
    - Validar: emoji único en título, índice con anclas, tiempo estimado 30-35 min, objetivos de aprendizaje, primer paso como verificación de región
    - Archivo: `tests/readme-rag-structure.property.test.ts`
    - **Valida: Requerimientos 2.1, 11.1**

  - [ ]* 10.3 Escribir prueba de propiedad para puntos de verificación visual en README-RAG
    - **Propiedad 4: Puntos de verificación visual después de pasos de configuración (RAG)**
    - Validar que pasos de configuración tienen `✓ Verificación`
    - Archivo: `tests/readme-rag-structure.property.test.ts`
    - **Valida: Requerimientos 2.5, 3.9**

  - [ ]* 10.4 Escribir prueba de propiedad para referencias cruzadas en README-RAG
    - **Propiedad 5: Referencias cruzadas a CONCEPTOS-RAG-GUARDRAILS.md y prompts-rag.md**
    - Validar: al menos una referencia a CONCEPTOS-RAG-GUARDRAILS.md en prerrequisitos y al menos un enlace contextual en instrucciones, referencia a prompts-rag.md
    - Archivo: `tests/readme-rag-structure.property.test.ts`
    - **Valida: Requerimientos 8.3, 11.3**

  - [ ]* 10.5 Escribir prueba de propiedad para placeholder de nombre de participante en README-RAG
    - **Propiedad 9: Placeholder `{nombre-participante}` en recursos AWS (RAG)**
    - Validar que nombres de recursos AWS contienen `{nombre-participante}`
    - Archivo: `tests/readme-rag-structure.property.test.ts`
    - **Valida: Requerimiento 11.7**

  - [ ]* 10.6 Escribir pruebas unitarias para contenido del README-RAG
    - Verificar pasos IAM: Service-Linked Role, bedrock.amazonaws.com, aoss:APIAccessAll
    - Verificar pasos S3: bucket s3-lab03-knowledge-source, SSE-S3
    - Verificar carga de documentos: referencia a documentos-geofisicos/
    - Verificar Knowledge Base: Titan Text Embeddings v2, OpenSearch Serverless, Quick create
    - Verificar Data Source: URI s3://s3-lab03-knowledge-source
    - Verificar sincronización: Sync, chunking, embeddings, estado Available
    - Verificar prompts RAG: referencia a prompts-rag.md, al menos 3 consultas
    - Verificar citas: presencia de citas/referencias en respuestas
    - Verificar modelo: Anthropic Claude para generación
    - Verificar diagnóstico: pasos si KB o sync falla
    - Verificar referencia a documentos geofísicos por nombre y ruta relativa
    - Verificar independencia de Labs 01 y 02
    - Verificar error handling: notificar al instructor ante errores de permisos
    - Archivo: `tests/readme-rag-content.test.ts`
    - _Requerimientos: 2.2, 2.3, 2.4, 2.6, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 7.4, 11.4, 13.1_

- [x] 11. Checkpoint — Verificar README-RAG.md y todas las pruebas
  - Ensure all tests pass, ask the user if questions arise.

- [x] 12. Crear el README-GUARDRAILS.md — Secciones iniciales
  - [x] 12.1 Escribir encabezado, índice, objetivos, prerrequisitos del README-GUARDRAILS
    - Título con emoji único: `🛡️ Laboratorio 3 — Parte 3: Guardrails con Amazon Bedrock`
    - Índice con enlaces de ancla a cada sección
    - Tiempo estimado: 20-25 minutos
    - Objetivos de aprendizaje (3-4 puntos: configurar Guardrails, probar temas denegados, filtrar PII, integrar con RAG)
    - Sección de prerrequisitos: Knowledge Base creada en Parte 2, referencia a CONCEPTOS-RAG-GUARDRAILS.md
    - _Requerimientos: 11.2, 11.3, 11.6_

- [x] 13. Crear el README-GUARDRAILS.md — Configuración de Guardrails (Pasos 11-15)
  - [x] 13.1 Escribir Paso 11 (Crear Guardrail) y Paso 12 (Tema denegado 1)
    - Paso 11: Navegar a Amazon Bedrock > Guardrails, crear Guardrail con nombre incluyendo `{nombre-participante}`, mensaje de bloqueo personalizado en español
    - Paso 12: Configurar tema denegado "Predicción exacta de terremotos" con descripción geofísica
    - Puntos de verificación visual después de cada paso
    - Enlace contextual a sección de Guardrails en CONCEPTOS-RAG-GUARDRAILS.md
    - _Requerimientos: 4.1, 4.2, 4.5, 11.3, 11.7_

  - [x] 13.2 Escribir Paso 13 (Tema denegado 2), Paso 14 (Filtros PII) y Paso 15 (Filtros de contenido)
    - Paso 13: Configurar tema denegado "Diagnóstico de estabilidad estructural" con descripción
    - Paso 14: Configurar filtros PII (Email → Redact, Phone → Redact, Name → Redact), explicar diferencia Block vs Redact
    - Paso 15: Configurar filtros de contenido (Hate, Insults, Sexual, Violence, Misconduct) con niveles recomendados
    - Puntos de verificación visual después de cada paso
    - _Requerimientos: 4.2, 4.3, 4.4, 4.5_

- [x] 14. Crear el README-GUARDRAILS.md — Validación en Playground (Pasos 16-18)
  - [x] 14.1 Escribir Paso 16 (Probar temas denegados) y Paso 17 (Probar filtro PII)
    - Paso 16: Probar temas denegados con prompts de `prompts-guardrails.md` (predicción de terremotos, diagnóstico estructural)
    - Paso 17: Probar filtro PII con prompt de investigador ficticio (Dr. Carlos Mendoza), verificar [NAME], [EMAIL], [PHONE]
    - Referencia explícita a `prompts-guardrails.md` en cada paso
    - Puntos de verificación visual después de cada prueba
    - _Requerimientos: 5.1, 5.2, 5.4, 8.3_

  - [x] 14.2 Escribir Paso 18 (Examinar métricas de trazabilidad)
    - Examinar métricas de trazabilidad (Trace) en la interfaz
    - Identificar qué filtro específico (Topic, PII, Content Filter) fue responsable de cada acción
    - Punto de verificación visual
    - _Requerimientos: 5.3_

- [x] 15. Crear el README-GUARDRAILS.md — Integración con Knowledge Base (Pasos 19-22)
  - [x] 15.1 Escribir Paso 19 (Asociar Guardrail a KB) y Paso 20 (Probar PII en RAG)
    - Paso 19: Asociar Guardrail a Knowledge Base, seleccionar versión (Version)
    - Paso 20: Probar consulta RAG que extraiga PII de documentos indexados, verificar enmascaramiento
    - Referencia a `prompts-guardrails.md`
    - Puntos de verificación visual
    - Enlace contextual a sección de Integración en CONCEPTOS-RAG-GUARDRAILS.md
    - _Requerimientos: 6.1, 6.2, 6.5, 8.3, 11.3_

  - [x] 15.2 Escribir Paso 21 (Probar tema denegado en RAG) y Paso 22 (Comparar con y sin Guardrail)
    - Paso 21: Probar consulta RAG que viole tema denegado con KB activa
    - Paso 22: Comparar respuestas RAG con y sin Guardrail activo para el mismo prompt
    - Referencia a `prompts-guardrails.md`
    - Puntos de verificación visual
    - _Requerimientos: 6.3, 6.4, 6.5_

- [x] 16. Completar el README-GUARDRAILS.md — Secciones finales
  - [x] 16.1 Escribir secciones de cierre del README-GUARDRAILS
    - Sección de Ciclo de Vida de Recursos: recursos creados (KB, Guardrail, bucket S3, OpenSearch Serverless, rol IAM), conservar para Lab 04, limpieza opcional con orden correcto (primero KB, luego S3, luego Guardrail)
    - Nota de costos: OpenSearch Serverless, tokens RAG
    - Nota: vaciar bucket S3 antes de eliminar, KB no elimina OpenSearch automáticamente
    - Indicación de continuación en Lab 04
    - Sección de Solución de Problemas con referencia a `TROUBLESHOOTING.md`
    - _Requerimientos: 9.1, 9.2, 9.3, 11.2, 11.5_

  - [ ]* 16.2 Escribir prueba de propiedad para estructura del README-GUARDRAILS
    - **Propiedad 3: Estructura válida de README-GUARDRAILS.md**
    - Validar: emoji único en título, índice con anclas, tiempo estimado 20-25 min, objetivos de aprendizaje
    - Archivo: `tests/readme-guardrails-structure.property.test.ts`
    - **Valida: Requerimiento 11.2**

  - [ ]* 16.3 Escribir prueba de propiedad para puntos de verificación visual en README-GUARDRAILS
    - **Propiedad 4: Puntos de verificación visual después de pasos de configuración (Guardrails)**
    - Validar que pasos de configuración tienen `✓ Verificación`
    - Archivo: `tests/readme-guardrails-structure.property.test.ts`
    - **Valida: Requerimientos 4.5, 5.4, 6.5**

  - [ ]* 16.4 Escribir prueba de propiedad para referencias cruzadas en README-GUARDRAILS
    - **Propiedad 5: Referencias cruzadas a CONCEPTOS-RAG-GUARDRAILS.md y prompts-guardrails.md**
    - Validar: al menos una referencia a CONCEPTOS-RAG-GUARDRAILS.md en prerrequisitos y al menos un enlace contextual en instrucciones, referencia a prompts-guardrails.md
    - Archivo: `tests/readme-guardrails-structure.property.test.ts`
    - **Valida: Requerimientos 8.3, 11.3**

  - [ ]* 16.5 Escribir prueba de propiedad para placeholder de nombre de participante en README-GUARDRAILS
    - **Propiedad 9: Placeholder `{nombre-participante}` en recursos AWS (Guardrails)**
    - Validar que nombres de recursos AWS contienen `{nombre-participante}`
    - Archivo: `tests/readme-guardrails-structure.property.test.ts`
    - **Valida: Requerimiento 11.7**

  - [ ]* 16.6 Escribir pruebas unitarias para contenido del README-GUARDRAILS
    - Verificar crear Guardrail: nombre con participante, mensaje de bloqueo personalizado
    - Verificar temas denegados: predicción de terremotos, diagnóstico de estabilidad estructural
    - Verificar filtros PII: Email, Phone, Name, Redact, diferencia Block vs Redact
    - Verificar filtros contenido: Hate, Insults, Sexual, Violence, Misconduct, niveles de severidad
    - Verificar prompts temas denegados: predicción terremoto Pacífico, diagnóstico estación Ñaña
    - Verificar prompt PII: Dr. Carlos Mendoza, [NAME], [EMAIL], [PHONE]
    - Verificar trazabilidad: Trace, identificación de filtro responsable
    - Verificar integración: asociar Guardrail a Knowledge Base, seleccionar versión
    - Verificar integración PII: enmascaramiento en respuestas RAG
    - Verificar integración tema: bloqueo con KB activa
    - Verificar comparación: respuestas RAG con y sin Guardrail
    - Verificar ciclo de vida: recursos creados, conservar para Lab 04, limpieza opcional con orden
    - Verificar costos: OpenSearch Serverless, tokens RAG
    - Verificar limpieza: vaciar bucket S3, KB no elimina OpenSearch automáticamente
    - Verificar continuación en Lab 04
    - Archivo: `tests/readme-guardrails-content.test.ts`
    - _Requerimientos: 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 6.1, 6.2, 6.3, 6.4, 9.1, 9.2, 9.3, 11.5_

- [x] 17. Checkpoint — Verificar README-GUARDRAILS.md y todas las pruebas
  - Ensure all tests pass, ask the user if questions arise.

- [x] 18. Actualizar el README.md principal del proyecto (raíz)
  - [x] 18.1 Actualizar `README.md` en la raíz del proyecto con Lab 03 en la tabla de laboratorios
    - Actualizar tabla: Lab 03 con enlace a `lab-03-bedrock-rag-guardrails/`, título "RAG y Guardrails con Amazon Bedrock", descripción, tiempo "55 min"
    - Mantener Labs 04 y 05 como "Próximamente"
    - Actualizar objetivos de aprendizaje para incluir RAG y Guardrails
    - Actualizar contenido adicional (AWS Documentation) con enlaces a documentación de Amazon Bedrock Knowledge Bases y Guardrails
    - _Requerimientos: 10.1, 10.2, 10.3, 10.4_

  - [ ]* 18.2 Escribir prueba de propiedad para estructura del README Principal
    - **Propiedad 8: Estructura válida del README Principal actualizado**
    - Validar: emoji en título, tabla con 5 labs, Lab 03 con enlace activo a `lab-03-bedrock-rag-guardrails/` y tiempo "55 min", licencia MIT con copyright
    - Archivo: `tests/readme-principal.property.test.ts`
    - **Valida: Requerimiento 10.1**

  - [ ]* 18.3 Escribir pruebas unitarias para contenido del README Principal
    - Verificar Labs 04 y 05 con estado "Próximamente"
    - Verificar objetivos de aprendizaje incluyen RAG y Guardrails
    - Verificar contenido adicional: enlaces a documentación de KB y Guardrails
    - Archivo: `tests/readme-principal.test.ts`
    - _Requerimientos: 10.2, 10.3, 10.4_

- [x] 19. Checkpoint — Verificar README principal y todas las pruebas del proyecto
  - Ensure all tests pass, ask the user if questions arise.

- [x] 20. Validación contra documentación oficial de AWS
  - [x] 20.1 Validar pasos de navegación y terminología con MCP Server de documentación AWS
    - Usar MCP Server AWS Docs para verificar rutas de navegación en consola de Amazon Bedrock
    - Verificar nombres de botones, opciones de menú y flujos de interfaz (Knowledge Bases, Guardrails, Model Access)
    - Validar nombres de modelos disponibles (Amazon Titan Text Embeddings v2, Anthropic Claude) y disponibilidad regional
    - Verificar opciones de configuración de Guardrails (Denied Topics, PII filters, Content Filters) contra documentación oficial
    - Verificar terminología en español consistente con interfaz de AWS
    - Documentar desviaciones con justificación explícita si las hubiera
    - Actualizar cualquier información desactualizada descubierta
    - _Requerimientos: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

- [x] 21. Checkpoint final — Verificar todos los entregables y pruebas
  - Ensure all tests pass, ask the user if questions arise.

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requerimientos específicos para trazabilidad
- Los checkpoints aseguran validación incremental
- Las pruebas de propiedad validan propiedades universales de correctitud usando fast-check (TypeScript)
- Las pruebas unitarias validan ejemplos específicos y casos de borde
- Toda la documentación debe estar en español; código, nombres de API y servicios AWS permanecen en inglés
- Los archivos `prompts-rag.md` y `prompts-guardrails.md` son las fuentes de verdad para todos los prompts del laboratorio
- Los documentos geofísicos en `documentos-geofisicos/` son la fuente de verdad para el contenido de la Knowledge Base
