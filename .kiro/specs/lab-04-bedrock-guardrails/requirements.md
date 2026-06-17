# Documento de Requerimientos

## Introducción

Reorganización del Laboratorio 03 original (RAG y Guardrails con Amazon Bedrock) en dos laboratorios independientes: Lab 03 (RAG con Amazon Bedrock Knowledge Bases) y Lab 04 (Guardrails con Amazon Bedrock). Esta separación permite que cada laboratorio tenga un enfoque temático claro, un tiempo de ejecución más manejable y un README principal propio (`README.md`) en su directorio respectivo.

El contenido instruccional de cada laboratorio permanece sin cambios. El trabajo consiste en reorganizar la estructura de directorios, renombrar archivos, separar el documento de conceptos teóricos en dos documentos independientes, actualizar referencias internas y actualizar el README principal del proyecto para reflejar la nueva estructura de 5 laboratorios.

El Lab 03 resultante contiene las Partes 1 y 2 del laboratorio original (preparación del entorno + RAG con Knowledge Bases, ~30-35 min). El Lab 04 resultante contiene la Parte 3 del laboratorio original (Guardrails, ~20-25 min). El Lab 04 depende de los recursos creados en el Lab 03 y tendrá continuación en el Lab 05.

## Glosario

- **Lab_03_Original**: Directorio `lab-03-bedrock-rag-guardrails/` que contiene el laboratorio combinado antes de la separación.
- **Lab_03_RAG**: Directorio `lab-03-bedrock-rag/` resultante, contenido exclusivo de RAG.
- **Lab_04_Guardrails**: Directorio `lab-04-bedrock-guardrails/` resultante, contenido exclusivo de Guardrails.
- **README_RAG**: Archivo `README.md` dentro de `lab-03-bedrock-rag/`. Guía principal del Lab 03.
- **README_Guardrails**: Archivo `README.md` dentro de `lab-04-bedrock-guardrails/`. Guía principal del Lab 04.
- **README_Principal**: Archivo `README.md` en la raíz del proyecto.
- **Documento_Conceptos_Original**: Archivo `CONCEPTOS-RAG-GUARDRAILS.md` del Lab_03_Original que contiene los conceptos teóricos combinados de RAG y Guardrails. Se separa en dos documentos independientes.
- **Documento_Conceptos_RAG**: Archivo `CONCEPTOS-RAG.md` dentro de `lab-03-bedrock-rag/`. Contiene los conceptos teóricos de RAG, embeddings, Knowledge Bases y preparación del entorno.
- **Documento_Conceptos_Guardrails**: Archivo `CONCEPTOS-GUARDRAILS.md` dentro de `lab-04-bedrock-guardrails/`. Contiene los conceptos teóricos de Guardrails, filtros PII, temas denegados e integración con RAG.
- **Directrices_Laboratorio**: Reglas en `directrices-laboratorios.md`.
- **Participante**: Usuario que ejecuta los laboratorios.

## Requerimientos

### Requerimiento 1: Renombrar Lab 03 — Directorio y README Principal

**User Story:** Como participante del programa AWS AI Essentials, quiero que el Lab 03 tenga su propio directorio enfocado exclusivamente en RAG con un README.md como guía principal, para que la navegación sea clara y consistente.

#### Criterios de Aceptación

1. THE Lab_03_RAG SHALL existir como `lab-03-bedrock-rag/`, renombrado desde `lab-03-bedrock-rag-guardrails/`.
2. THE README_RAG SHALL existir como `README.md` dentro de `lab-03-bedrock-rag/`, con el contenido del anterior `README-RAG.md`.
3. THE README_RAG SHALL usar el título "🗃️ Laboratorio 3 — RAG con Amazon Bedrock Knowledge Bases" con tiempo estimado 30-35 minutos.
4. THE README_RAG SHALL mantener intacto el contenido instruccional (pasos 1-10, verificaciones, solución de problemas).
5. THE README_RAG SHALL eliminar cualquier referencia a "Parte 1 y 2" en título e índice.
6. THE README_RAG SHALL actualizar referencias internas al Documento_Conceptos_RAG (`CONCEPTOS-RAG.md`) con ruta relativa correcta.
7. THE README_RAG SHALL incluir nota de continuación indicando que el Lab 04 continúa con los recursos creados aquí.

### Requerimiento 2: Crear Lab 04 — Directorio y README Principal

**User Story:** Como participante del programa AWS AI Essentials, quiero que el Lab 04 tenga su propio directorio dedicado a Guardrails con un README.md como guía principal, para completar el laboratorio de seguridad de forma independiente.

#### Criterios de Aceptación

1. THE Lab_04_Guardrails SHALL existir como `lab-04-bedrock-guardrails/` con su propio `README.md`.
2. THE README_Guardrails SHALL contener el contenido instruccional del anterior `README-GUARDRAILS.md`, adaptado como laboratorio independiente.
3. THE README_Guardrails SHALL usar el título "🛡️ Laboratorio 4 — Guardrails con Amazon Bedrock" con tiempo estimado 20-25 minutos.
4. THE README_Guardrails SHALL eliminar cualquier referencia a "Parte 3" en título e índice.
5. THE README_Guardrails SHALL renumerar los pasos del 1 al 12 (anteriormente 11-22), manteniendo intacto el contenido instruccional.
6. THE README_Guardrails SHALL actualizar prerrequisitos para referenciar el Lab 03 como dependencia (`../lab-03-bedrock-rag/README.md`).
7. THE README_Guardrails SHALL actualizar referencias al Documento_Conceptos_Guardrails (`CONCEPTOS-GUARDRAILS.md`) con ruta relativa local dentro de `lab-04-bedrock-guardrails/`.
8. THE README_Guardrails SHALL actualizar referencias a `README-RAG.md` para apuntar a `../lab-03-bedrock-rag/README.md`.
9. THE Lab_04_Guardrails SHALL contener `prompts-guardrails.md` en su directorio raíz, con contenido intacto.
10. THE README_Guardrails SHALL incluir nota de continuación indicando que los recursos se utilizarán en el Lab 05.
11. THE README_Guardrails SHALL incluir índice con anchor links actualizados para la nueva numeración (1-12).
12. THE README_Guardrails SHALL comenzar con verificación de región AWS según Directrices_Laboratorio.
### Requerimiento 3: Separar Documento de Conceptos en Dos Documentos Independientes

**User Story:** Como participante del programa AWS AI Essentials, quiero que cada laboratorio tenga su propio documento de conceptos teóricos con solo el contenido relevante para ese laboratorio, para que pueda estudiar la teoría necesaria sin información de otros laboratorios mezclada.

#### Criterios de Aceptación

1. THE Documento_Conceptos_Original SHALL separarse en dos documentos independientes: `CONCEPTOS-RAG.md` para el Lab 03 y `CONCEPTOS-GUARDRAILS.md` para el Lab 04.
2. THE Documento_Conceptos_RAG SHALL ubicarse en `lab-03-bedrock-rag/CONCEPTOS-RAG.md` y contener las siguientes secciones del Documento_Conceptos_Original:
   - Sección 1: El Problema que RAG Resuelve
   - Sección 2: Arquitectura de RAG Paso a Paso
   - Sección 3: Embeddings en Práctica y Bases de Datos Vectoriales
   - Sección 4: Knowledge Bases en Amazon Bedrock
   - Sección 7: Preparación del Entorno
   - Terminología AWS relevante a RAG (Knowledge Base, Data Source, Sync, Chunking Strategy, Vector Store, OpenSearch Serverless, Titan Text Embeddings v2)
3. THE Documento_Conceptos_Guardrails SHALL ubicarse en `lab-04-bedrock-guardrails/CONCEPTOS-GUARDRAILS.md` y contener las siguientes secciones del Documento_Conceptos_Original:
   - Sección 5: Guardrails para Amazon Bedrock
   - Sección 6: Integración de Guardrails con RAG
   - Terminología AWS relevante a Guardrails (Guardrail, Denied Topics, PII Filters, Content Filters, Blocked Message)
4. THE Documento_Conceptos_RAG SHALL actualizar su título e introducción para reflejar que es el documento de conceptos exclusivo del Lab 03 (RAG con Amazon Bedrock Knowledge Bases).
5. THE Documento_Conceptos_Guardrails SHALL actualizar su título e introducción para reflejar que es el documento de conceptos exclusivo del Lab 04 (Guardrails con Amazon Bedrock), incluyendo una referencia al Lab 03 como prerrequisito conceptual.
6. THE Documento_Conceptos_RAG SHALL mantener intacto el contenido teórico de cada sección (explicaciones, diagramas, tablas, analogías), modificando solo título, introducción, índice y referencias a la estructura de laboratorios.
7. THE Documento_Conceptos_Guardrails SHALL mantener intacto el contenido teórico de cada sección, modificando solo título, introducción, índice y referencias a la estructura de laboratorios.
8. THE Documento_Conceptos_RAG SHALL renumerar sus secciones de forma consecutiva (1, 2, 3, ...) con índice y anchor links actualizados.
9. THE Documento_Conceptos_Guardrails SHALL renumerar sus secciones de forma consecutiva (1, 2, 3, ...) con índice y anchor links actualizados.
10. THE Lab_03_RAG SHALL prescindir del archivo `CONCEPTOS-RAG-GUARDRAILS.md` original, ya que su contenido se distribuyó entre los dos nuevos documentos.

### Requerimiento 4: Distribuir Archivos de Soporte entre Laboratorios

**User Story:** Como participante del programa AWS AI Essentials, quiero que cada laboratorio contenga únicamente los archivos de soporte que necesita, para que la estructura sea clara y sin archivos irrelevantes.

#### Criterios de Aceptación

1. THE Lab_03_RAG SHALL contener los siguientes archivos de soporte: `prompts-rag.md`, `CONCEPTOS-RAG.md`, y la carpeta `documentos-geofisicos/` con los tres documentos geofísicos y `.gitkeep`.
2. THE Lab_04_Guardrails SHALL contener los siguientes archivos de soporte: `prompts-guardrails.md` y `CONCEPTOS-GUARDRAILS.md`.
3. THE Lab_03_RAG SHALL prescindir de `prompts-guardrails.md` (pertenece al Lab 04).
4. THE Lab_04_Guardrails SHALL prescindir de la carpeta `documentos-geofisicos/` (usa la Knowledge Base del Lab 03), y de `prompts-rag.md` (pertenece al Lab 03).

### Requerimiento 5: Actualizar README Principal del Proyecto

**User Story:** Como participante del programa AWS AI Essentials, quiero que el README principal refleje la nueva estructura de 5 laboratorios con enlaces y descripciones correctas, para navegar fácilmente a cada laboratorio.

#### Criterios de Aceptación

1. THE README_Principal SHALL mostrar 5 filas en la tabla de laboratorios: Lab 01 y 02 sin cambios, Lab 03 enlazando a `lab-03-bedrock-rag/` (RAG, 35 min), Lab 04 enlazando a `lab-04-bedrock-guardrails/` (Guardrails, 25 min), Lab 05 como placeholder.
2. THE README_Principal SHALL actualizar el enlace del Lab 03 a `lab-03-bedrock-rag/`.
3. THE README_Principal SHALL agregar el enlace del Lab 04 a `lab-04-bedrock-guardrails/`.
4. THE README_Principal SHALL eliminar cualquier referencia a `lab-03-bedrock-rag-guardrails/` o al nombre combinado "RAG y Guardrails" como un solo laboratorio.
5. THE README_Principal SHALL mantener intactas las secciones de Contenido Adicional, Contribuciones y Licencia.
6. THE README_Principal SHALL actualizar descripción general y objetivos de aprendizaje para reflejar que RAG y Guardrails son laboratorios separados.

### Requerimiento 6: Actualizar Ciclo de Vida de Recursos y Referencias Cruzadas

**User Story:** Como participante del programa AWS AI Essentials, quiero que cada laboratorio indique claramente qué recursos necesita de laboratorios anteriores y cuáles conservar para posteriores, para gestionar correctamente los recursos de AWS.

#### Criterios de Aceptación

1. THE README_RAG SHALL incluir nota indicando que los recursos creados (Knowledge Base, bucket S3, vector store) deben conservarse para el Lab 04.
2. THE README_Guardrails SHALL listar en prerrequisitos los recursos del Lab 03 necesarios: Knowledge Base sincronizada, modelo Anthropic Claude habilitado, bucket S3 con documentos.
3. THE README_Guardrails SHALL incluir nota indicando que los recursos de Lab 03 y Lab 04 se utilizarán en el Lab 05.
4. THE README_Guardrails SHALL distinguir en la tabla de ciclo de vida entre recursos propios del Lab 04 (Guardrail) y heredados del Lab 03 (Knowledge Base, bucket S3, vector store).
5. THE README_Guardrails SHALL advertir en limpieza opcional que eliminar recursos del Lab 03 afectará Lab 04 y Lab 05.

### Requerimiento 7: Configurar Infraestructura de Tests para Lab 04

**User Story:** Como desarrollador del proyecto AWS AI Essentials, quiero que el Lab 04 tenga su propia infraestructura de tests independiente, para validar el contenido de Guardrails de forma aislada.

#### Criterios de Aceptación

1. THE Lab_04_Guardrails SHALL contener `package.json` con nombre `lab-04-bedrock-guardrails-tests`, tipo `module`, script `test` con `vitest --run`, y dependencias `vitest` y `fast-check`.
2. THE Lab_04_Guardrails SHALL contener `tsconfig.json` con configuración base del Lab_03_Original (target ES2022, module ESNext, moduleResolution bundler, strict true).
3. THE Lab_04_Guardrails SHALL contener `vitest.config.ts` configurado para `tests/**/*.test.ts`.
4. THE Lab_04_Guardrails SHALL contener directorio `tests/` con al menos un archivo placeholder (`placeholder.ts`).
5. WHEN existan tests en Lab_03_Original que validen contenido de Guardrails, THE Lab_04_Guardrails SHALL recibirlos adaptados a las nuevas rutas.
6. WHEN existan tests en Lab_03_Original que validen contenido de RAG, THE Lab_03_RAG SHALL retenerlos adaptados a las nuevas rutas.