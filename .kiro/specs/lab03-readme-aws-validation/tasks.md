# Plan de Implementación: Validación del README del Lab 03 contra AWS

## Resumen

Verificar y corregir las instrucciones paso a paso del archivo `lab-03-bedrock-rag/README.md` contra la documentación oficial de AWS usando el servidor MCP de documentación de AWS. El bug se manifiesta cuando las instrucciones de los Pasos 2-10 no coinciden con la interfaz actual de la consola de AWS. Se usa vitest + fast-check (ya configurados en `lab-03-bedrock-rag/package.json`) para validar la corrección y preservación del contenido.

## Tasks

- [x] 1. Escribir test de exploración del bug condition (ANTES del fix)
  - **Property 1: Bug Condition** — Instrucciones del README no coinciden con la consola de AWS
  - **CRITICAL**: Este test DEBE FALLAR en el código sin corregir — el fallo confirma que el bug existe
  - **NO intente corregir el test ni el código cuando falle**
  - **NOTE**: Este test codifica el comportamiento esperado — validará el fix cuando pase después de la implementación
  - **GOAL**: Identificar contraejemplos que demuestren las discrepancias entre el README y la documentación oficial de AWS
  - **Scoped PBT Approach**: Enfocar la propiedad en los casos concretos de fallo: Pasos 2-10 del README que describen navegación en la consola de AWS
  - Usar el servidor MCP de documentación de AWS (`mcp_awslabsaws_documentation_mcp_server`) para investigar el estado actual de cada servicio:
    - Buscar documentación de IAM Console (Paso 2): navegación para verificar roles, entidades de confianza
    - Buscar documentación de S3 Console (Pasos 3-4): flujo de creación de buckets, opciones de cifrado, carga de archivos
    - Buscar documentación de Amazon Bedrock Knowledge Bases (Pasos 5-6): wizard de creación, configuración de Data Source, modelo de embeddings, vector store — esta es el área de mayor riesgo
    - Buscar documentación de Amazon Bedrock KB testing (Pasos 7-10): sincronización, ventana de prueba, selector de modelo, presentación de citas
  - Crear archivo `lab-03-bedrock-rag/tests/readme-aws-steps.property.test.ts`
  - Escribir property-based test con fast-check que para cada paso del README (Pasos 2-10) verifique:
    - Los nombres de secciones de la consola mencionados en el README existen en la documentación oficial
    - La terminología de la interfaz (botones, campos, opciones) coincide con la documentación oficial
    - El flujo de navegación descrito es consistente con la documentación oficial
  - Las aserciones del test deben reflejar el comportamiento esperado (Expected Behavior Properties del diseño)
  - Ejecutar test en código SIN corregir
  - **RESULTADO ESPERADO**: El test FALLA (esto es correcto — demuestra que el bug existe)
  - Documentar los contraejemplos encontrados (ej. "El wizard de KB tiene pasos diferentes", "La sección Orchestration se renombró", "Data Source se configura dentro del wizard")
  - Marcar tarea completa cuando el test esté escrito, ejecutado y el fallo documentado
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_

- [x] 2. Escribir tests de preservación basados en propiedades (ANTES del fix)
  - **Property 2: Preservation** — Contenido no dependiente de la consola AWS permanece intacto
  - **IMPORTANT**: Seguir metodología observation-first
  - Observar el comportamiento del README SIN corregir para contenido no relacionado con la consola:
    - Observar: todas las referencias a archivos de soporte (`prompts-rag.md`, `CONCEPTOS-RAG.md`, `documentos-geofisicos/`) existen y son correctas
    - Observar: el placeholder `{nombre-participante}` aparece en todos los nombres de recursos AWS
    - Observar: cada paso principal tiene un checkpoint `✓ Verificación`
    - Observar: todos los anchor links del índice corresponden a encabezados existentes
    - Observar: los prompts RAG en bloques de código coinciden exactamente con `prompts-rag.md`
    - Observar: la nota de conservación de recursos para Lab 04 existe
    - Observar: la sección de Solución de Problemas referencia `TROUBLESHOOTING.md`
    - Observar: el formato cumple con `directrices-laboratorios.md` (emojis, estructura, terminología en español)
  - Crear archivo `lab-03-bedrock-rag/tests/readme-preservation.property.test.ts`
  - Escribir property-based tests con fast-check que capturen los patrones de comportamiento observados:
    - Property: para toda referencia a archivo de soporte en el README, el archivo referenciado existe en el filesystem
    - Property: para todo nombre de recurso AWS en el README, contiene el placeholder `{nombre-participante}`
    - Property: para todo paso principal (Paso N), existe un checkpoint `✓ Verificación` asociado
    - Property: para todo anchor link del índice, existe un encabezado correspondiente en el documento
    - Property: para todo prompt RAG en bloque de código del README, el texto coincide exactamente con el prompt correspondiente en `prompts-rag.md`
  - Ejecutar tests en código SIN corregir
  - **RESULTADO ESPERADO**: Los tests PASAN (esto confirma el comportamiento base a preservar)
  - Marcar tarea completa cuando los tests estén escritos, ejecutados y pasando en código sin corregir
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_


- [x] 3. Fix — Verificar y corregir instrucciones del README contra documentación AWS

  - [x] 3.1 Verificar y corregir Pasos 2-4 (IAM + S3) usando MCP de AWS Docs
    - Usar `mcp_awslabsaws_documentation_mcp_server` para buscar documentación oficial de:
      - Consola de IAM: navegación para verificar roles, visualización de entidades de confianza y permisos
      - Consola de S3: flujo de creación de buckets, secciones de cifrado, opciones predeterminadas
      - Consola de S3: flujo de carga de archivos, botones y opciones
    - Corregir Paso 2 (Verificar Service-Linked Role de IAM): nombres de secciones, ubicación de elementos, terminología
    - Corregir Paso 3 (Crear Bucket S3): disposición de secciones de cifrado, nombres de campos, opciones de configuración
    - Corregir Paso 4 (Cargar Documentos Geofísicos): botones, opciones de carga, interfaz actual
    - Mantener intactos: checkpoints de verificación, referencias a CONCEPTOS-RAG.md, placeholder `{nombre-participante}`
    - _Bug_Condition: isBugCondition(paso) donde paso.pasoNumero IN [2, 3, 4] AND instruccionDescribeNavegacionConsola(paso.instruccionTexto) AND NOT coincideConInterfazActual(paso.instruccionTexto, consolaAWSActual)_
    - _Expected_Behavior: Las instrucciones corregidas coinciden con la interfaz actual de la consola de AWS según la documentación oficial_
    - _Preservation: Contenido no dependiente de la consola (checkpoints, referencias, placeholders, formato) permanece intacto_
    - _Requirements: 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.6, 3.8_

  - [x] 3.2 Verificar y corregir Pasos 5-6 (Knowledge Base + Data Source) usando MCP de AWS Docs — ÁREA DE MAYOR RIESGO
    - Usar `mcp_awslabsaws_documentation_mcp_server` para buscar documentación oficial de:
      - Amazon Bedrock Knowledge Bases: wizard de creación actual, pasos del wizard, campos y secciones
      - Configuración de Data Source: determinar si está integrada en el wizard de creación o es un paso separado
      - Modelo de embeddings: opciones disponibles y cómo se seleccionan en el wizard
      - Vector store: opciones de Quick create y configuración de OpenSearch Serverless
    - Corregir Paso 5 (Crear Knowledge Base): nombre de sección en panel de navegación (¿sigue siendo "Orchestration"?), campos del wizard, opciones de configuración
    - Evaluar Paso 6 (Configurar Data Source):
      - Si Data Source se configura DENTRO del wizard del Paso 5: fusionar contenido del Paso 6 en el Paso 5
      - Si Data Source es un paso SEPARADO: corregir instrucciones según interfaz actual
    - Si se fusionan pasos: renumerar Pasos 7-10 como Pasos 6-9 (o la numeración que corresponda)
    - Mantener intactos: checkpoints de verificación, referencias a CONCEPTOS-RAG.md, placeholder `{nombre-participante}`, chunking strategy Default
    - _Bug_Condition: isBugCondition(paso) donde paso.pasoNumero IN [5, 6] AND instruccionDescribeNavegacionConsola(paso.instruccionTexto) AND NOT coincideConInterfazActual(paso.instruccionTexto, consolaAWSActual)_
    - _Expected_Behavior: Las instrucciones reflejan el wizard actual de creación de Knowledge Bases, incluyendo la integración o separación del Data Source según la interfaz real_
    - _Preservation: Contenido conceptual, referencias a CONCEPTOS-RAG.md, checkpoints, placeholders permanecen intactos_
    - _Requirements: 2.4, 2.5, 3.1, 3.2, 3.3, 3.6, 3.8_

  - [x] 3.3 Verificar y corregir Pasos 7-10 (Sync, Modelo, Consultas RAG, Citas) usando MCP de AWS Docs
    - Usar `mcp_awslabsaws_documentation_mcp_server` para buscar documentación oficial de:
      - Sincronización de Knowledge Base: botón de sync, indicadores de estado, flujo de sincronización
      - Ventana de prueba de Knowledge Base: ubicación, botón de acceso, selector de modelo
      - Interfaz de consultas RAG: cómo enviar consultas, presentación de respuestas
      - Presentación de citas: formato de citas/referencias, cómo expandir fragmentos citados
    - Corregir Paso 7 (Sincronización): botón de sync, indicadores de estado, terminología
    - Corregir Paso 8 (Seleccionar Modelo de Generación): ubicación de ventana de prueba, selector de modelo, opciones disponibles
    - Corregir Paso 9 (Consultas RAG): interfaz de envío de consultas, presentación de respuestas
    - Corregir Paso 10 (Verificar Citas): formato de citas, cómo expandir fragmentos, terminología
    - NOTA: Si los pasos fueron renumerados en la tarea 3.2, usar la nueva numeración
    - Mantener intactos: prompts RAG exactos de `prompts-rag.md`, checkpoints de verificación, referencias a archivos de soporte
    - _Bug_Condition: isBugCondition(paso) donde paso.pasoNumero IN [7, 8, 9, 10] AND instruccionDescribeNavegacionConsola(paso.instruccionTexto) AND NOT coincideConInterfazActual(paso.instruccionTexto, consolaAWSActual)_
    - _Expected_Behavior: Las instrucciones coinciden con la interfaz actual de sincronización, ventana de prueba, selector de modelo y presentación de citas_
    - _Preservation: Prompts RAG idénticos a prompts-rag.md, checkpoints, nota de conservación de recursos, sección de Solución de Problemas intactos_
    - _Requirements: 2.6, 2.7, 2.8, 3.1, 3.4, 3.5, 3.7, 3.8_

  - [x] 3.4 Actualizar índice y anchor links si se reestructuraron pasos
    - Si el Paso 6 se fusionó con el Paso 5 (o cualquier otra reestructuración):
      - Actualizar el índice del README con la nueva numeración de pasos
      - Verificar que todos los anchor links del índice corresponden a encabezados existentes
      - Actualizar cualquier referencia interna entre pasos (ej. "como se configuró en el Paso 6" → nueva numeración)
    - Si no hubo reestructuración: verificar que el índice y anchor links existentes son correctos
    - _Bug_Condition: Los anchor links del índice no corresponden a encabezados existentes después de la reestructuración_
    - _Expected_Behavior: Todos los anchor links del índice corresponden a encabezados existentes y los pasos están numerados secuencialmente_
    - _Preservation: El formato del índice y la estructura de anchor links sigue las convenciones de directrices-laboratorios.md_
    - _Requirements: 2.4, 2.5, 3.8_

  - [x] 3.5 Verificar test de exploración del bug condition ahora pasa
    - **Property 1: Expected Behavior** — Instrucciones del README coinciden con la consola de AWS
    - **IMPORTANT**: Re-ejecutar el MISMO test de la tarea 1 — NO escribir un test nuevo
    - El test de la tarea 1 codifica el comportamiento esperado
    - Cuando este test pase, confirma que el comportamiento esperado se satisface
    - Ejecutar test de exploración del bug condition de la tarea 1
    - **RESULTADO ESPERADO**: El test PASA (confirma que el bug está corregido)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

  - [x] 3.6 Verificar tests de preservación siguen pasando
    - **Property 2: Preservation** — Contenido no dependiente de la consola AWS permanece intacto
    - **IMPORTANT**: Re-ejecutar los MISMOS tests de la tarea 2 — NO escribir tests nuevos
    - Ejecutar tests de preservación basados en propiedades de la tarea 2
    - **RESULTADO ESPERADO**: Los tests PASAN (confirma que no hay regresiones)
    - Confirmar que todos los tests siguen pasando después del fix (sin regresiones)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [x] 4. Escribir tests unitarios adicionales de validación estructural
  - Crear archivo `lab-03-bedrock-rag/tests/readme-structure.test.ts`
  - Verificar que el README contiene todas las secciones requeridas (título, índice, objetivos, prerrequisitos, pasos, solución de problemas)
  - Verificar que los pasos están numerados secuencialmente sin saltos
  - Verificar que la nota de conservación de recursos para Lab 04 existe y referencia `../lab-04-bedrock-guardrails/README.md`
  - Verificar que la sección de Solución de Problemas referencia `TROUBLESHOOTING.md`
  - Verificar que no existen referencias obsoletas a nombres de secciones o flujos desactualizados
  - Crear archivo `lab-03-bedrock-rag/tests/readme-crossrefs.test.ts`
  - Verificar que las referencias cruzadas entre README.md y archivos de soporte son correctas:
    - `prompts-rag.md` existe y es referenciado
    - `CONCEPTOS-RAG.md` existe y es referenciado
    - `documentos-geofisicos/` existe con los 3 archivos esperados
  - Verificar que el contenido del README cumple con las directrices de `directrices-laboratorios.md`
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 3.1, 3.2, 3.5, 3.8_

- [x] 5. Checkpoint — Ejecutar suite completa de tests y validación final
  - Ejecutar `npm test` en `lab-03-bedrock-rag/` para validar todas las pruebas
  - Verificar que todos los tests pasan: property tests (bug condition + preservation), tests unitarios (estructura + cross-refs)
  - Usar el servidor MCP de documentación de AWS una última vez para verificar que el README corregido es consistente con la documentación oficial
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Eliminar Paso 2 (Verificar Service-Linked Role de IAM) y renumerar pasos
  - El rol de servicio de Amazon Bedrock se crea automáticamente durante el wizard de creación de Knowledge Bases, por lo que el Paso 2 es innecesario
  - Eliminar completamente la sección "### Paso 2: Verificar Service-Linked Role de IAM" del README
  - Renumerar todos los pasos subsiguientes: Paso 3→2, Paso 4→3, Paso 5→4, Paso 6→5, Paso 7→6, Paso 8→7, Paso 9→8
  - Actualizar el índice (TOC) con la nueva numeración y anchor links
  - Actualizar todas las referencias internas entre pasos (ej. "en el Paso 4" → nueva numeración)
  - Actualizar la sección de Solución de Problemas que referencia "Regrese al Paso 2"
  - Eliminar la referencia a la sección "Preparación del Entorno" de CONCEPTOS-RAG.md en Prerrequisitos si ya no aplica
  - Actualizar los tests existentes para reflejar la nueva numeración (8 pasos en vez de 9):
    - `readme-aws-steps.property.test.ts`: eliminar tests del Paso 2 (IAM), actualizar números de pasos
    - `readme-preservation.property.test.ts`: actualizar conteo de pasos esperados
    - `readme-structure.test.ts`: actualizar rango de pasos de 1-9 a 1-8
    - `readme-crossrefs.test.ts`: verificar que no hay referencias rotas
  - Ejecutar `npm test` en `lab-03-bedrock-rag/` para verificar que todos los tests pasan con la nueva estructura
  - _Requirements: 2.1, 2.4, 3.1, 3.6, 3.8_

## Notas

- Cada tarea de verificación DEBE usar el servidor MCP de documentación de AWS (`mcp_awslabsaws_documentation_mcp_server`) para buscar y leer documentación oficial
- Los tests van en el directorio `lab-03-bedrock-rag/tests/` (vitest + fast-check ya configurados en package.json)
- Toda la documentación debe estar en español siguiendo `directrices-laboratorios.md`
- El área de mayor riesgo es el wizard de Knowledge Base (Pasos 5-6) donde el flujo puede haber cambiado significativamente
- Si se reestructuran pasos (fusión del Paso 6), se debe actualizar el índice, anchor links y todas las referencias internas
- Los prompts RAG en bloques de código deben permanecer idénticos a los de `prompts-rag.md`
- El placeholder `{nombre-participante}` debe mantenerse en todos los nombres de recursos
