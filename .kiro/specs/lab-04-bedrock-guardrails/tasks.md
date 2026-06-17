# Implementation Plan: Lab 04 — Guardrails con Amazon Bedrock (Separación de Laboratorios)

## Overview

Reorganizar el Laboratorio 03 original (`lab-03-bedrock-rag-guardrails/`) en dos laboratorios independientes: Lab 03 (RAG) y Lab 04 (Guardrails). El trabajo es exclusivamente de reestructuración de documentación — renombrar directorios, separar documentos, renumerar pasos, actualizar referencias y crear infraestructura de tests. Todo el contenido instruccional permanece intacto. Los tests se escriben en TypeScript con Vitest + fast-check.

## Tasks

- [x] 1. Crear directorio Lab 04 e infraestructura de tests (Componentes 3, 8)
  - [x] 1.1 Crear directorio `lab-04-bedrock-guardrails/` con `package.json` (nombre `lab-04-bedrock-guardrails-tests`, tipo `module`, script `test` con `vitest --run`, devDependencies `vitest` ^3.2.1 y `fast-check` ^4.1.1)
    - _Requirements: 7.1_
  - [x] 1.2 Crear `lab-04-bedrock-guardrails/tsconfig.json` (target ES2022, module ESNext, moduleResolution bundler, strict true, esModuleInterop true, types `["vitest/globals"]`, include `["tests/**/*.ts"]`)
    - _Requirements: 7.2_
  - [x] 1.3 Crear `lab-04-bedrock-guardrails/vitest.config.ts` (include `['tests/**/*.test.ts']`)
    - _Requirements: 7.3_
  - [x] 1.4 Crear `lab-04-bedrock-guardrails/tests/placeholder.ts` con comentario placeholder
    - _Requirements: 7.4_

- [x] 2. Renombrar Lab 03 y redistribuir archivos (Componentes 1, 4.2/4.4)
  - [x] 2.1 Renombrar directorio `lab-03-bedrock-rag-guardrails/` a `lab-03-bedrock-rag/`
    - Renombrar `README-RAG.md` a `README.md` dentro del directorio renombrado
    - Eliminar `README-GUARDRAILS.md` del directorio renombrado (contenido se mueve al Lab 04)
    - Eliminar `prompts-guardrails.md` del directorio renombrado (se mueve al Lab 04)
    - Eliminar `CONCEPTOS-RAG-GUARDRAILS.md` del directorio renombrado (se reemplaza por documentos separados)
    - Conservar: `prompts-rag.md`, `documentos-geofisicos/`, `package.json`, `tsconfig.json`, `vitest.config.ts`, `tests/`
    - _Requirements: 1.1, 1.2, 4.1, 4.3, 3.10_
  - [x] 2.2 Copiar `prompts-guardrails.md` al directorio `lab-04-bedrock-guardrails/` con contenido intacto
    - _Requirements: 2.9, 4.2_
  - [x] 2.3 Actualizar `name` en `lab-03-bedrock-rag/package.json` a `lab-03-bedrock-rag-tests`
    - _Requirements: 1.1_

- [x] 3. Checkpoint — Verificar estructura de directorios
  - Ensure all tests pass, ask the user if questions arise.
  - Verificar que `lab-03-bedrock-rag/` existe con los archivos RAG y sin archivos Guardrails
  - Verificar que `lab-04-bedrock-guardrails/` existe con infraestructura de tests y `prompts-guardrails.md`

- [x] 4. Crear documentos de conceptos separados (Componentes 5, 6)
  - [x] 4.1 Crear `lab-03-bedrock-rag/CONCEPTOS-RAG.md` extrayendo secciones 1-4, 7 y terminología RAG de `CONCEPTOS-RAG-GUARDRAILS.md`
    - Título: `🗄️ Conceptos Fundamentales: RAG con Amazon Bedrock Knowledge Bases`
    - Introducción actualizada para reflejar documento exclusivo del Lab 03
    - Renumerar secciones: §1→1, §2→2, §3→3, §4→4, §7→5, §8(parcial)→6
    - Índice con anchor links actualizados para nueva numeración
    - Terminología RAG: Knowledge Base, Data Source, Sync, Chunking Strategy, Vector Store, OpenSearch Serverless, Titan Text Embeddings v2, IAM Service Role, SSE-S3, RetrieveAndGenerate
    - Contenido teórico intacto (explicaciones, diagramas, tablas, analogías)
    - Eliminar referencias a Guardrails en introducción general
    - Mantener referencias a `CONCEPTOS-IA-GENERATIVA.md` del Lab 02
    - _Requirements: 3.1, 3.2, 3.4, 3.6, 3.8_
  - [x] 4.2 Crear `lab-04-bedrock-guardrails/CONCEPTOS-GUARDRAILS.md` extrayendo secciones 5-6 y terminología Guardrails de `CONCEPTOS-RAG-GUARDRAILS.md`
    - Título: `🛡️ Conceptos Fundamentales: Guardrails con Amazon Bedrock`
    - Introducción actualizada para documento exclusivo del Lab 04, con referencia al Lab 03 como prerrequisito conceptual
    - Renumerar secciones: §5→1, §6→2, §8(parcial)→3
    - Índice con anchor links actualizados para nueva numeración
    - Terminología Guardrails: Guardrail, Denied Topic, PII Filter, Content Filter, Mask, Block, Trace
    - Contenido teórico intacto (explicaciones, diagramas, tablas)
    - Referencias a conceptos RAG apuntan a `../lab-03-bedrock-rag/CONCEPTOS-RAG.md`
    - _Requirements: 3.1, 3.3, 3.5, 3.7, 3.9_

- [x] 5. Adaptar README del Lab 03 (Componente 2)
  - [x] 5.1 Actualizar `lab-03-bedrock-rag/README.md` (anteriormente `README-RAG.md`)
    - Título: `🗃️ Laboratorio 3 — RAG con Amazon Bedrock Knowledge Bases` (eliminar "Parte 1 y 2")
    - Tiempo estimado: 30-35 minutos (sin cambio)
    - Eliminar referencias a "Parte 1 y 2" en título e índice
    - Actualizar todas las referencias de `CONCEPTOS-RAG-GUARDRAILS.md` a `CONCEPTOS-RAG.md` con rutas relativas locales
    - Actualizar anchor links de conceptos para reflejar nueva numeración del documento separado (§7→§5, §8→§6)
    - Agregar nota de continuación: recursos creados (Knowledge Base, bucket S3, vector store) deben conservarse para el Lab 04
    - Mantener intacto: contenido instruccional (pasos 1-10), verificaciones, solución de problemas
    - _Requirements: 1.3, 1.4, 1.5, 1.6, 1.7, 6.1_

- [x] 6. Crear README del Lab 04 (Componente 4)
  - [x] 6.1 Crear `lab-04-bedrock-guardrails/README.md` adaptando contenido de `README-GUARDRAILS.md`
    - Título: `🛡️ Laboratorio 4 — Guardrails con Amazon Bedrock` (eliminar "Parte 3", cambiar "Laboratorio 3" a "Laboratorio 4")
    - Tiempo estimado: 20-25 minutos (sin cambio)
    - Eliminar referencias a "Parte 3" en título e índice
    - Insertar Paso 1: Verificación de Región AWS (directriz obligatoria)
    - Renumerar pasos originales 11-22 como 2-13 (total: 13 pasos)
    - Actualizar índice con anchor links para nueva numeración (Paso 1 a Paso 13)
    - Actualizar prerrequisitos: referenciar Lab 03 como dependencia (`../lab-03-bedrock-rag/README.md`), listar recursos necesarios (Knowledge Base sincronizada, modelo Anthropic Claude, bucket S3)
    - Actualizar referencias de `CONCEPTOS-RAG-GUARDRAILS.md` a `CONCEPTOS-GUARDRAILS.md` con rutas relativas locales
    - Actualizar anchor links de conceptos para nueva numeración del documento separado (§5→§1, §6→§2)
    - Actualizar referencias a `README-RAG.md` para apuntar a `../lab-03-bedrock-rag/README.md`
    - Agregar nota de continuación: recursos de Lab 03 y Lab 04 se utilizarán en Lab 05
    - Actualizar sección Ciclo de Vida: distinguir recursos propios (Guardrail) de heredados (Knowledge Base, bucket S3, vector store)
    - Advertir en limpieza opcional que eliminar recursos del Lab 03 afecta Lab 04 y Lab 05
    - Mantener intacto: contenido instruccional de cada paso, verificaciones, solución de problemas
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.10, 2.11, 2.12, 6.2, 6.3, 6.4, 6.5_

- [x] 7. Actualizar README principal del proyecto (Componente 7)
  - [x] 7.1 Actualizar `README.md` en la raíz del proyecto
    - Tabla de laboratorios con 5 filas: Lab 01 y 02 sin cambios, Lab 03 enlazando a `lab-03-bedrock-rag/` (RAG, 35 min), Lab 04 enlazando a `lab-04-bedrock-guardrails/` (Guardrails, 25 min), Lab 05 placeholder
    - Actualizar descripción general y objetivos de aprendizaje para reflejar RAG y Guardrails como laboratorios separados
    - Eliminar cualquier referencia a `lab-03-bedrock-rag-guardrails/` o "RAG y Guardrails" como un solo laboratorio
    - Mantener intactas: secciones de Contenido Adicional, Contribuciones, Licencia
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 8. Checkpoint — Verificar contenido de documentación
  - Ensure all tests pass, ask the user if questions arise.
  - Verificar que ambos READMEs tienen títulos, índices y numeración correctos
  - Verificar que ambos documentos de conceptos tienen secciones correctas
  - Verificar que el README principal tiene la tabla de 5 laboratorios

- [x] 9. Escribir pruebas unitarias de estructura y contenido
  - [x] 9.1 Crear `tests/lab04-test-infra.test.ts` — Validar infraestructura de tests del Lab 04
    - Verificar package.json con nombre, tipo, script y dependencias correctos
    - Verificar tsconfig.json con configuración base correcta
    - Verificar vitest.config.ts configurado correctamente
    - Verificar directorio tests/ con placeholder
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  - [x] 9.2 Crear `tests/lab03-structure.test.ts` — Validar estructura del Lab 03
    - Directorio `lab-03-bedrock-rag/` existe con `README.md`
    - Lab 03 contiene archivos RAG (`prompts-rag.md`, `CONCEPTOS-RAG.md`, `documentos-geofisicos/`)
    - Lab 03 no contiene archivos Guardrails (`prompts-guardrails.md`)
    - _Requirements: 1.1, 1.2, 4.1, 4.3_
  - [x] 9.3 Crear `tests/lab04-structure.test.ts` — Validar estructura del Lab 04
    - Directorio `lab-04-bedrock-guardrails/` existe con `README.md`
    - Lab 04 contiene archivos Guardrails (`prompts-guardrails.md`, `CONCEPTOS-GUARDRAILS.md`)
    - Lab 04 no contiene archivos RAG (`prompts-rag.md`, `documentos-geofisicos/`)
    - _Requirements: 2.1, 2.9, 4.2, 4.4_
  - [x] 9.4 Crear `tests/lab03-readme.test.ts` — Validar README del Lab 03
    - Título correcto y tiempo estimado 30-35 min
    - Pasos 1-10 presentes con verificaciones
    - Ausencia de "Parte 1 y 2" en título e índice
    - Nota de continuación mencionando Lab 04
    - _Requirements: 1.3, 1.4, 1.5, 1.7, 6.1_
  - [x] 9.5 Crear `tests/lab04-readme.test.ts` — Validar README del Lab 04
    - Título correcto y tiempo estimado 20-25 min
    - Ausencia de "Parte 3" en título e índice
    - Contenido instruccional de Guardrails preservado (temas denegados, filtros PII, filtros de contenido)
    - Prerrequisitos referencian Lab 03 con recursos necesarios
    - Nota de continuación mencionando Lab 05
    - Primer paso es verificación de región AWS
    - Tabla de ciclo de vida distingue recursos propios y heredados
    - Advertencia de limpieza sobre impacto en Lab 04 y Lab 05
    - _Requirements: 2.2, 2.3, 2.4, 2.6, 2.10, 2.12, 6.2, 6.3, 6.4, 6.5_
  - [x] 9.6 Crear `tests/conceptos-separation.test.ts` — Validar separación de documentos de conceptos
    - Ambos documentos de conceptos existen (`CONCEPTOS-RAG.md` y `CONCEPTOS-GUARDRAILS.md`)
    - Documento original `CONCEPTOS-RAG-GUARDRAILS.md` eliminado de `lab-03-bedrock-rag/`
    - _Requirements: 3.1, 3.10_
  - [x] 9.7 Crear `tests/conceptos-rag.test.ts` — Validar contenido de CONCEPTOS-RAG.md
    - Título actualizado para Lab 03 exclusivo
    - Contiene secciones 1-4, 7 del original y terminología RAG
    - Contenido teórico preservado (diagramas, tablas, analogías clave)
    - _Requirements: 3.2, 3.4, 3.6_
  - [x] 9.8 Crear `tests/conceptos-guardrails.test.ts` — Validar contenido de CONCEPTOS-GUARDRAILS.md
    - Título actualizado para Lab 04 con referencia a Lab 03
    - Contiene secciones 5-6 del original y terminología Guardrails
    - Contenido teórico preservado (diagramas, tablas)
    - _Requirements: 3.3, 3.5, 3.7_
  - [x] 9.9 Crear `tests/readme-principal.test.ts` — Validar README principal del proyecto
    - Tabla con 5 labs, enlaces correctos a `lab-03-bedrock-rag/` y `lab-04-bedrock-guardrails/`
    - Sin referencia al directorio antiguo `lab-03-bedrock-rag-guardrails/`
    - Secciones de Contenido Adicional, Contribuciones y Licencia intactas
    - Objetivos de aprendizaje reflejan laboratorios separados
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 10. Escribir pruebas basadas en propiedades
  - [x] 10.1 Crear `tests/no-stale-references.property.test.ts`
    - **Property 1: Ausencia de referencias obsoletas en ambos laboratorios**
    - Para todos los archivos Markdown en `lab-03-bedrock-rag/` y `lab-04-bedrock-guardrails/`, verificar ausencia de referencias a nombres obsoletos: `CONCEPTOS-RAG-GUARDRAILS.md`, `README-RAG.md`, `README-GUARDRAILS.md`, `lab-03-bedrock-rag-guardrails/`
    - Usar fast-check con mínimo 100 iteraciones
    - Incluir comentario: `// Feature: lab-04-bedrock-guardrails, Property 1: Ausencia de referencias obsoletas`
    - **Validates: Requirements 1.6, 2.7, 2.8**
  - [x] 10.2 Crear `tests/readme-guardrails-steps.property.test.ts`
    - **Property 2: Renumeración secuencial de pasos en el README del Lab 04**
    - Para todos los encabezados de paso en `lab-04-bedrock-guardrails/README.md`, verificar numeración secuencial desde 1 sin saltos ni números del rango original 11-22
    - Usar fast-check con mínimo 100 iteraciones
    - Incluir comentario: `// Feature: lab-04-bedrock-guardrails, Property 2: Renumeración secuencial de pasos`
    - **Validates: Requirements 2.5**
  - [x] 10.3 Crear `tests/index-anchor-links.property.test.ts`
    - **Property 3: Índices con anchor links válidos en documentos con índice**
    - Para todos los documentos Markdown con índice (ambos READMEs y ambos documentos de conceptos), verificar que cada anchor link del índice corresponde a un encabezado existente y que las secciones numeradas son consecutivas
    - Usar fast-check con mínimo 100 iteraciones
    - Incluir comentario: `// Feature: lab-04-bedrock-guardrails, Property 3: Índices con anchor links válidos`
    - **Validates: Requirements 2.11, 3.8, 3.9**

- [x] 11. Checkpoint — Ejecutar suite de tests completa
  - Ensure all tests pass, ask the user if questions arise.
  - Ejecutar `npm test` en `lab-04-bedrock-guardrails/` para validar todas las pruebas
  - Verificar que pruebas unitarias y de propiedades pasan correctamente

- [x] 12. Validación final con documentación AWS
  - [x] 12.1 Validar contenido del Lab 04 contra documentación oficial de AWS
    - Verificar que las instrucciones de Guardrails reflejan la interfaz actual de Amazon Bedrock
    - Verificar que los nombres de parámetros y configuraciones son correctos (Denied Topics, PII Filters, Content Filters)
    - Verificar que la terminología en español es consistente con la interfaz de AWS
    - Verificar que las referencias a documentación AWS en el README principal son válidas
    - _Requirements: 2.2, 3.3, 3.7_

- [x] 13. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All documentation must be written in Spanish following `directrices-laboratorios.md`
- The design specifies 13 steps for Lab 04 README (Paso 1 = region verification NEW, Pasos 2-13 = original steps 11-22)
- Tests use TypeScript with Vitest + fast-check (same stack as Labs 01, 02, 03)
