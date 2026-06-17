# Documento de Requerimientos

## Introducción

Laboratorio 3: RAG y Guardrails con Amazon Bedrock, enfocado en la implementación de Generación Aumentada por Recuperación (RAG) mediante Amazon Bedrock Knowledge Bases y la configuración de filtros de seguridad mediante Amazon Bedrock Guardrails, aplicados al dominio de la geofísica y sismología. Este laboratorio guía al participante en tres fases progresivas: preparación del entorno (IAM y S3), construcción de una Knowledge Base con documentos geofísicos para consultas RAG, y configuración de Guardrails con temas denegados y filtros PII contextualizados en investigación sísmica.

Este es el tercero de una serie de 5 laboratorios (Lab 01 a Lab 05) que exploran progresivamente los servicios de inteligencia artificial, aprendizaje automático e IA generativa de AWS. El Lab 03 continúa después del Lab 02 (Bedrock Playgrounds) pero NO utiliza recursos creados en laboratorios anteriores. Tendrá continuación en el Lab 04.

Duración estimada: 50-60 minutos.

Objetivo principal: Implementar un flujo completo de RAG con Amazon Bedrock Knowledge Bases utilizando documentos geofísicos como fuente de conocimiento, y configurar Guardrails de seguridad con temas denegados relevantes al dominio sísmico y filtros de PII para proteger datos de investigadores de campo, integrando ambas capacidades en una solución unificada.

Nota sobre el contexto temático: Este laboratorio utiliza documentos y ejemplos del campo de la geofísica y sismología para contextualizar todas las interacciones con Amazon Bedrock. Los documentos de la Knowledge Base contienen reportes sísmicos, datos de estaciones sismológicas y guías de análisis geofísico. Los temas denegados en Guardrails se enfocan en predicciones exactas de terremotos y diagnósticos de ingeniería estructural (no en asesoría financiera). Los ejemplos de PII corresponden a investigadores de campo y sismólogos (no a clientes financieros).

Nota sobre la estructura del laboratorio: El laboratorio se divide en tres partes que se implementan como documentos separados dentro del mismo directorio:
- Parte 1: Conceptos Fundamentales y Preparación del Entorno (documento de conceptos + sección inicial del README de RAG)
- Parte 2: RAG con Amazon Bedrock Knowledge Bases (guía principal de RAG)
- Parte 3: Filtros de Seguridad con Amazon Bedrock Guardrails (guía de Guardrails, continuación de la Parte 2)

## Glosario

- **Amazon_Bedrock**: Servicio de AWS que proporciona acceso a Modelos Fundacionales de múltiples proveedores a través de una API unificada, playgrounds interactivos, Knowledge Bases para RAG y Guardrails para seguridad.
- **Amazon_Bedrock_Knowledge_Bases**: Funcionalidad de Amazon Bedrock que permite crear bases de conocimiento conectando fuentes de datos (S3) con bases de datos vectoriales para implementar RAG de forma gestionada.
- **Amazon_Bedrock_Guardrails**: Funcionalidad de Amazon Bedrock que permite implementar salvaguardas personalizadas evaluando tanto la entrada del usuario (prompt) como la salida del modelo (completion), incluyendo temas denegados, filtros de PII y filtros de contenido.
- **Amazon_OpenSearch_Serverless**: Motor de búsqueda y análisis vectorial gestionado utilizado por Amazon Bedrock Knowledge Bases para almacenar y recuperar embeddings de forma eficiente.
- **Amazon_Titan_Text_Embeddings**: Modelo de embeddings de Amazon utilizado para transformar texto en representaciones vectoriales durante el proceso de ingestión de documentos en una Knowledge Base.
- **Archivo_Soporte**: Archivo complementario proporcionado en la carpeta del laboratorio que el Participante utiliza durante la ejecución (ej. documentos geofísicos para la Knowledge Base, prompts de prueba, archivos de referencia).
- **Chunking_Strategy**: Método mediante el cual Amazon Bedrock divide documentos grandes en fragmentos de texto más pequeños (chunks) antes de convertirlos en embeddings, optimizando la precisión de la búsqueda semántica.
- **Content_Filter**: Filtro de Guardrails que evalúa el contenido de prompts y respuestas contra categorías predefinidas de contenido inapropiado (odio, insultos, contenido sexual, violencia) con niveles de severidad configurables.
- **Denied_Topics**: Políticas configuradas en lenguaje natural dentro de un Guardrail que instruyen al sistema sobre qué áreas de conversación deben ser bloqueadas (ej. predicción exacta de terremotos, diagnóstico de estabilidad estructural).
- **Directrices_Laboratorio**: Conjunto de reglas y estándares definidos en `directrices-laboratorios.md` que gobiernan la estructura, formato y contenido de toda la documentación del laboratorio.
- **Documentacion_AWS**: Documentación oficial de AWS utilizada como fuente de verdad para validar la precisión del contenido del laboratorio.
- **Documento_Conceptos_RAG_Guardrails**: Documento separado (`CONCEPTOS-RAG-GUARDRAILS.md`) ubicado en la carpeta del laboratorio que contiene el marco teórico fundamental de RAG, Knowledge Bases, bases de datos vectoriales, embeddings en práctica, Guardrails, temas denegados, filtros PII y filtros de contenido, contextualizado en geofísica.
- **Documento_Troubleshooting**: Documento separado (`TROUBLESHOOTING.md`) que contiene soluciones a errores comunes organizados por laboratorio.
- **Embedding**: Representación numérica (vector) de un texto en un espacio matemático de alta dimensión que captura el significado semántico. En el contexto de RAG, los embeddings permiten la búsqueda por similitud semántica entre la consulta del usuario y los fragmentos de documentos indexados.
- **Encryption_at_Rest**: Cifrado de datos almacenados en S3 y OpenSearch, requisito de seguridad estándar en arquitecturas de IA generativa. En este laboratorio se utiliza SSE-S3 (Server-Side Encryption con claves gestionadas por S3).
- **Guia_Guardrails**: Documento README de la Parte 3 del laboratorio (`README-GUARDRAILS.md`) que contiene las instrucciones paso a paso para configurar y probar Guardrails de seguridad e integrarlos con la Knowledge Base.
- **Guia_RAG**: Documento README de la Parte 2 del laboratorio (`README-RAG.md`) que contiene las instrucciones paso a paso para configurar la Knowledge Base, ingestar documentos y probar consultas RAG. Incluye también la Parte 1 (preparación del entorno).
- **IAM_Service_Role**: Rol de IAM vinculado al servicio de Amazon Bedrock que permite al servicio realizar acciones en otros servicios (S3, OpenSearch Serverless) en nombre del usuario.
- **MCP_Server_AWS_Docs**: Servidor MCP de documentación de AWS utilizado para verificar y validar el contenido del laboratorio contra la documentación oficial.
- **Participante**: Usuario que ejecuta el laboratorio siguiendo las instrucciones de la guía.
- **PII**: Personally Identifiable Information. Datos personales sensibles (nombres, correos electrónicos, números de teléfono, direcciones) que deben ser protegidos. En el contexto de este laboratorio, los ejemplos de PII corresponden a investigadores de campo y sismólogos.
- **RAG**: Retrieval Augmented Generation. Patrón arquitectónico que combina la recuperación de información relevante de una base de conocimiento con la generación de respuestas por un modelo de lenguaje, reduciendo alucinaciones y proporcionando respuestas basadas en datos verificados.
- **README_Principal**: Documento README.md ubicado en la raíz del proyecto que lista todos los laboratorios (Lab 01 a Lab 05) en una tabla con enlaces, títulos, descripciones y tiempos estimados.
- **Redaction**: Proceso automático donde el Guardrail reemplaza datos sensibles en la respuesta del modelo con etiquetas seguras (ej. cambiar "investigador@igp.gob.pe" por `[EMAIL]`).
- **RetrieveAndGenerate**: Operación de la API de Amazon Bedrock que primero busca información relevante en la base de datos vectorial (Retrieve) y luego utiliza un modelo de texto para formular la respuesta final (Generate), adjuntando citas de las fuentes originales.
- **Service_Linked_Role**: Tipo de rol de IAM vinculado directamente a un servicio de AWS (como Bedrock) que permite al servicio realizar acciones en otros servicios en nombre del usuario.
- **Sync**: Proceso de sincronización de la Knowledge Base que lee los documentos de S3, aplica chunking, genera embeddings y puebla el índice vectorial en OpenSearch Serverless.
- **Vector_Store**: Base de datos vectorial (en este laboratorio, Amazon OpenSearch Serverless) que almacena los embeddings generados a partir de los documentos y permite búsquedas por similitud semántica.

## Requerimientos

### Requerimiento 1: Documento de Conceptos Fundamentales de RAG y Guardrails (Documento Separado)

**User Story:** Como participante del laboratorio, quiero disponer de un documento de referencia separado con los conceptos fundamentales de RAG, Knowledge Bases, bases de datos vectoriales, Guardrails y filtros de seguridad, contextualizado en geofísica, para poder consultarlo antes y durante la ejecución del laboratorio sin interrumpir el flujo de las instrucciones prácticas.

#### Criterios de Aceptación

1. THE Documento_Conceptos_RAG_Guardrails SHALL existir como un archivo separado `CONCEPTOS-RAG-GUARDRAILS.md` dentro de la carpeta del laboratorio, con la siguiente estructura:
   - Título con un único emoji al inicio (ej. "🗄️ Conceptos Fundamentales: RAG y Guardrails con Amazon Bedrock")
   - Índice (tabla de contenidos) con enlaces de ancla a cada sección
   - Secciones organizadas en orden pedagógico de lo básico a lo avanzado
   - Formato consistente con el estilo de `CONCEPTOS-IA-GENERATIVA.md` del Lab 02 y `CONCEPTOS-ML.md` del Lab 01 (separadores `---`, bloques de código, tablas)

2. THE Documento_Conceptos_RAG_Guardrails SHALL definir el problema que RAG resuelve como punto de partida conceptual, incluyendo:
   - Limitación de los LLMs: Los modelos de lenguaje solo conocen la información de su entrenamiento (knowledge cutoff) y pueden alucinar datos específicos de dominio.
   - Solución RAG: Combinar la capacidad generativa del modelo con la recuperación de información de fuentes verificadas y actualizadas.
   - Analogía geofísica: Es como si un sismólogo consultara siempre el catálogo sísmico del IGP antes de emitir un reporte, en lugar de confiar solo en su memoria.

3. THE Documento_Conceptos_RAG_Guardrails SHALL explicar la arquitectura de RAG paso a paso, incluyendo:
   - Fase de Ingestión: Documentos originales (PDF, TXT, MD) se dividen en chunks, se transforman en embeddings y se almacenan en una base de datos vectorial.
   - Fase de Consulta: El prompt del usuario se transforma en un embedding, se buscan los chunks más similares en la base vectorial, y se envían como contexto al modelo junto con la pregunta original.
   - Fase de Generación: El modelo genera una respuesta basada en el contexto recuperado y adjunta citas de las fuentes originales.

4. THE Documento_Conceptos_RAG_Guardrails SHALL explicar los conceptos de embeddings en práctica y bases de datos vectoriales, incluyendo:
   - Embeddings en práctica: Expansión del concepto introducido en `CONCEPTOS-IA-GENERATIVA.md` del Lab 02. Explicar cómo los embeddings se usan concretamente en RAG para representar chunks de documentos y consultas como vectores, permitiendo la búsqueda por similitud semántica.
   - Similitud semántica: Explicar que la búsqueda vectorial encuentra chunks cuyo significado es similar a la consulta, no solo coincidencias de palabras exactas. Ejemplo: buscar "actividad sísmica en la costa peruana" también recupera chunks sobre "terremotos en el litoral del Perú".
   - Base de datos vectorial: Explicar que Amazon OpenSearch Serverless actúa como el almacén de vectores, optimizado para búsquedas de similitud a gran escala.
   - Referencia al Lab 02: Incluir enlace a la sección de Embeddings y Multimodalidad de `CONCEPTOS-IA-GENERATIVA.md` para el concepto teórico base.

5. THE Documento_Conceptos_RAG_Guardrails SHALL explicar el concepto de Knowledge Bases en Amazon Bedrock, incluyendo:
   - Definición: Funcionalidad gestionada que orquesta todo el flujo de RAG (ingestión, indexación, recuperación y generación) sin necesidad de código personalizado.
   - Componentes: Data Source (S3), modelo de embeddings (Amazon Titan Text Embeddings), vector store (OpenSearch Serverless), modelo de generación (Anthropic Claude).
   - Chunking Strategy: Explicar las opciones de división de documentos (default, fixed size, none) y su impacto en la precisión de las respuestas.

6. THE Documento_Conceptos_RAG_Guardrails SHALL explicar el concepto de Guardrails para Amazon Bedrock, incluyendo:
   - Definición: Capa de seguridad configurable que evalúa tanto la entrada del usuario (prompt) como la salida del modelo (completion) contra políticas definidas.
   - Temas Denegados (Denied Topics): Políticas en lenguaje natural que bloquean áreas de conversación específicas. Ejemplo geofísico: bloquear "predicción exacta de fechas de terremotos" porque ningún modelo puede predecir terremotos con precisión temporal.
   - Filtros de PII: Capacidad de detectar y enmascarar (redact) o bloquear información personal identificable en prompts y respuestas.
   - Filtros de Contenido: Evaluación de contenido contra categorías predefinidas (odio, insultos, contenido sexual, violencia) con niveles de severidad configurables.
   - Mensaje de bloqueo personalizado: Respuesta estandarizada cuando se intercepta una violación.

7. THE Documento_Conceptos_RAG_Guardrails SHALL explicar la integración de Guardrails con RAG, incluyendo:
   - Flujo completo: El Guardrail evalúa el prompt de entrada, luego la Knowledge Base recupera contexto y genera la respuesta, y finalmente el Guardrail evalúa la respuesta antes de entregarla al usuario.
   - Caso de uso geofísico: Proteger datos PII de investigadores de campo que aparecen en los documentos indexados, y bloquear consultas que soliciten predicciones exactas de terremotos.
   - Trazabilidad (Trace): Explicar que la interfaz muestra qué filtro específico (Topic, PII, Content Filter) fue responsable de cada acción de bloqueo o enmascaramiento.

8. THE Documento_Conceptos_RAG_Guardrails SHALL incluir una sección de preparación del entorno que explique los conceptos de infraestructura necesarios:
   - IAM Service Role: Rol que permite a Amazon Bedrock acceder a S3 y OpenSearch Serverless en nombre del usuario.
   - Bucket S3 como Data Source: Almacenamiento de los documentos geofísicos que alimentan la Knowledge Base.
   - Cifrado en reposo (Encryption at Rest): SSE-S3 como requisito de seguridad estándar.
   - Convención de nombres: Uso de `{nombre-participante}` en nombres de recursos según las Directrices_Laboratorio.

9. THE Documento_Conceptos_RAG_Guardrails SHALL utilizar terminología consistente con la Documentacion_AWS oficial de Amazon Bedrock, verificando que los nombres de funcionalidades, parámetros y conceptos coincidan con los utilizados en la documentación del servicio.

10. THE Documento_Conceptos_RAG_Guardrails SHALL incluir una referencia explícita a `CONCEPTOS-IA-GENERATIVA.md` del Lab 02 para los conceptos base de IA Generativa (embeddings, LLMs, alucinaciones, prompting) que se expanden en este documento.

### Requerimiento 2: Preparación del Entorno — IAM y S3 (Parte 1)

**User Story:** Como participante del laboratorio, quiero configurar la infraestructura base (rol IAM y bucket S3) necesaria para que Amazon Bedrock Knowledge Bases pueda acceder a los documentos geofísicos y crear la base de datos vectorial, garantizando que los permisos y el almacenamiento estén correctamente configurados antes de proceder con RAG.

#### Criterios de Aceptación

1. THE Guia_RAG SHALL iniciar las instrucciones paso a paso con la verificación de región de AWS como primer paso, indicando al Participante que confirme la región correcta en la esquina superior derecha de la consola de AWS antes de proceder con cualquier otra acción.

2. WHEN el Participante configure el rol de IAM para Amazon Bedrock, THE Guia_RAG SHALL indicar los pasos para verificar que existe un Service_Linked_Role con la entidad de confianza `bedrock.amazonaws.com`, describiendo la ruta de navegación explícita en la consola de IAM y los permisos necesarios para acceso de lectura a S3 y escritura a OpenSearch Serverless (`aoss:APIAccessAll`).

3. WHEN el Participante cree el bucket de S3 para los documentos geofísicos, THE Guia_RAG SHALL indicar los pasos para crear un bucket con el nombre `s3-lab03-knowledge-source-{nombre-participante}`, habilitando cifrado del lado del servidor (SSE-S3) y verificando que el bucket sea accesible por el rol de servicio de Amazon Bedrock.

4. WHEN el Participante cargue los documentos geofísicos al bucket de S3, THE Guia_RAG SHALL indicar los pasos para subir los Archivos_Soporte de documentos geofísicos proporcionados en la carpeta del laboratorio, verificando que los archivos estén en formatos compatibles con RAG (PDF, TXT, MD).

5. THE Guia_RAG SHALL incluir puntos de verificación visual (`✓ Verificación`) después de la creación del rol IAM, la creación del bucket S3 y la carga de documentos, permitiendo al Participante confirmar que cada recurso está correctamente configurado antes de continuar.

6. IF el Participante encuentra un error de permisos al crear el rol IAM o el bucket S3, THEN THE Guia_RAG SHALL indicar que notifique al instructor de inmediato sin intentar solucionar el error por cuenta propia.

### Requerimiento 3: RAG con Amazon Bedrock Knowledge Bases — Configuración y Consulta (Parte 2)

**User Story:** Como geofísico evaluando herramientas de IA, quiero crear una Knowledge Base en Amazon Bedrock que indexe documentos geofísicos y permita realizar consultas RAG con citas de fuentes, para comprender cómo RAG reduce las alucinaciones al basar las respuestas en datos verificados del dominio sísmico.

#### Criterios de Aceptación

1. WHEN el Participante configure la Knowledge Base en Amazon Bedrock, THE Guia_RAG SHALL indicar los pasos para:
   - Navegar a Amazon Bedrock > Knowledge Bases en la consola
   - Crear una nueva Knowledge Base con un nombre descriptivo que incluya `{nombre-participante}`
   - Seleccionar Amazon Titan Text Embeddings v2 como modelo de embeddings
   - Elegir la opción "Quick create a new vector store" para aprovisionar automáticamente Amazon OpenSearch Serverless
   - Conectar el bucket S3 creado en la Parte 1 como Data Source

2. WHEN el Participante configure el Data Source de la Knowledge Base, THE Guia_RAG SHALL indicar que se debe especificar el URI del bucket S3 (`s3://s3-lab03-knowledge-source-{nombre-participante}/`) y verificar que la ruta es accesible mediante el rol de servicio de Amazon Bedrock.

3. WHEN el Participante ejecute la sincronización (Sync) de la Knowledge Base, THE Guia_RAG SHALL indicar los pasos para iniciar el proceso de sincronización y explicar que Amazon Bedrock lee los documentos de S3, aplica chunking, genera embeddings con Amazon Titan Text Embeddings v2 y puebla el índice vectorial en OpenSearch Serverless.

4. THE Guia_RAG SHALL incluir una nota sobre el tiempo de espera de la sincronización, indicando que el proceso puede tardar varios minutos dependiendo del volumen de documentos, y que el Participante debe esperar a que el estado cambie a "Available" antes de proceder con las pruebas.

5. WHEN el Participante pruebe la Knowledge Base en la ventana de prueba (Test window), THE Guia_RAG SHALL especificar al menos 3 prompts de prueba contextualizados en geofísica para verificar el funcionamiento del RAG:
   - Prompt 1: Consulta sobre datos sísmicos específicos contenidos en los documentos (ej. "¿Cuáles son las principales zonas de actividad sísmica documentadas?")
   - Prompt 2: Consulta que requiera síntesis de múltiples documentos (ej. "Resume los procedimientos de monitoreo sísmico descritos en los documentos")
   - Prompt 3: Consulta sobre un tema NO contenido en los documentos para verificar que el modelo indica la falta de información en lugar de alucinar

6. THE Guia_RAG SHALL indicar al Participante que verifique la presencia de citas (footnotes/references) en las respuestas del RAG, confirmando que cada respuesta incluye referencias al nombre del archivo de origen en S3 de donde se extrajo la información.

7. WHEN el Participante seleccione el modelo de generación de texto para las consultas RAG, THE Guia_RAG SHALL indicar que se debe seleccionar un modelo de la familia Anthropic Claude disponible en Amazon Bedrock, describiendo la ruta de navegación para seleccionar el modelo en la interfaz de prueba de la Knowledge Base.

8. IF la creación de la Knowledge Base o la sincronización falla, THEN THE Guia_RAG SHALL indicar los pasos de diagnóstico básicos (verificar permisos del rol IAM, verificar accesibilidad del bucket S3, verificar disponibilidad del modelo de embeddings) y que el Participante notifique al instructor si el error persiste.

9. THE Guia_RAG SHALL incluir puntos de verificación visual (`✓ Verificación`) después de la creación de la Knowledge Base, la sincronización exitosa y cada consulta de prueba RAG.

### Requerimiento 4: Filtros de Seguridad con Amazon Bedrock Guardrails — Configuración (Parte 3)

**User Story:** Como geofísico responsable de aplicaciones de IA en investigación sísmica, quiero configurar Guardrails de seguridad que bloqueen temas inapropiados (predicciones exactas de terremotos, diagnósticos de ingeniería estructural) y protejan datos PII de investigadores de campo, para garantizar que las aplicaciones de IA generativa operen dentro de directrices de IA responsable en el dominio geofísico.

#### Criterios de Aceptación

1. WHEN el Participante cree un nuevo Guardrail en Amazon Bedrock, THE Guia_Guardrails SHALL indicar los pasos para:
   - Navegar a Amazon Bedrock > Guardrails en la consola
   - Crear un nuevo Guardrail con un nombre descriptivo que incluya `{nombre-participante}`
   - Configurar un mensaje de bloqueo personalizado en español (ej. "Lo siento, no puedo responder sobre este tema. Las predicciones sísmicas exactas requieren análisis instrumental especializado que está fuera del alcance de este sistema de IA.")

2. WHEN el Participante configure temas denegados (Denied Topics), THE Guia_Guardrails SHALL indicar los pasos para definir al menos 2 temas denegados contextualizados en geofísica:
   - Tema denegado 1: "Predicción exacta de terremotos" — Descripción: "Solicitudes que pidan predecir la fecha, hora o ubicación exacta de futuros terremotos o eventos sísmicos. Ningún sistema de IA puede predecir terremotos con precisión temporal."
   - Tema denegado 2: "Diagnóstico de estabilidad estructural" — Descripción: "Solicitudes que pidan evaluar la estabilidad estructural de edificios, puentes o infraestructura específica ante eventos sísmicos. Esto requiere ingeniería estructural profesional certificada."

3. WHEN el Participante configure los filtros de PII, THE Guia_Guardrails SHALL indicar los pasos para habilitar la detección y enmascaramiento (Redaction) de al menos los siguientes tipos de PII:
   - Correo electrónico (Email): Acción Redact — reemplazar con `[EMAIL]`
   - Número de teléfono (Phone): Acción Redact — reemplazar con `[PHONE]`
   - Nombre de persona (Name): Acción Redact — reemplazar con `[NAME]`
   El Participante debe comprender la diferencia entre Block (bloquear toda la respuesta) y Redact (enmascarar solo el dato sensible).

4. THE Guia_Guardrails SHALL explicar la opción de configurar filtros de contenido (Content Filters) con niveles de severidad (None, Low, Medium, High) para las categorías: odio (Hate), insultos (Insults), contenido sexual (Sexual), violencia (Violence), y conducta inapropiada (Misconduct), indicando configuraciones recomendadas para un entorno de investigación geofísica.

5. THE Guia_Guardrails SHALL incluir puntos de verificación visual (`✓ Verificación`) después de la creación del Guardrail, la configuración de cada tema denegado y la configuración de filtros PII.

### Requerimiento 5: Validación de Guardrails en el Playground (Parte 3)

**User Story:** Como geofísico evaluando la seguridad de aplicaciones de IA, quiero probar el Guardrail de forma aislada en el playground de Amazon Bedrock para verificar que los temas denegados se bloquean correctamente, los filtros PII enmascaran datos sensibles y las métricas de trazabilidad muestran qué filtro actuó, antes de integrar el Guardrail con la Knowledge Base.

#### Criterios de Aceptación

1. WHEN el Participante pruebe el Guardrail en el panel de pruebas integrado, THE Guia_Guardrails SHALL especificar al menos 2 prompts de prueba que violen los temas denegados:
   - Prompt de prueba 1: "¿Puedes predecir cuándo será el próximo terremoto de magnitud 7 o superior en la costa del Pacífico?" — Debe activar el bloqueo del tema "Predicción exacta de terremotos"
   - Prompt de prueba 2: "Evalúa si el edificio de la estación sismológica de Ñaña resistiría un terremoto de magnitud 8.0" — Debe activar el bloqueo del tema "Diagnóstico de estabilidad estructural"

2. WHEN el Participante pruebe el filtro de PII, THE Guia_Guardrails SHALL especificar un prompt de prueba que contenga datos PII de un investigador de campo ficticio:
   - Prompt de prueba: "El Dr. Carlos Mendoza (investigador@igp.gob.pe, +51-999-888-777) reportó actividad sísmica inusual en la estación de monitoreo. Resume su reporte."
   - El Participante debe verificar que la respuesta contiene `[NAME]`, `[EMAIL]` y `[PHONE]` en lugar de los datos originales.

3. THE Guia_Guardrails SHALL indicar al Participante que examine las métricas de trazabilidad (Trace) en la interfaz después de cada prueba, identificando qué filtro específico (Topic, PII, Content Filter) fue responsable de la acción de bloqueo o enmascaramiento.

4. THE Guia_Guardrails SHALL incluir puntos de verificación visual (`✓ Verificación`) después de cada prueba de Guardrail, confirmando que el bloqueo o enmascaramiento funcionó según lo esperado.

### Requerimiento 6: Integración de Guardrails con Knowledge Base (Parte 3)

**User Story:** Como geofísico implementando una solución RAG segura, quiero integrar el Guardrail configurado con la Knowledge Base creada en la Parte 2, para que las consultas RAG estén protegidas por los filtros de seguridad y los datos PII de investigadores que aparezcan en los documentos indexados sean enmascarados automáticamente en las respuestas.

#### Criterios de Aceptación

1. WHEN el Participante asocie el Guardrail a la Knowledge Base, THE Guia_Guardrails SHALL indicar los pasos para seleccionar el Guardrail y su versión (Version) dentro de la interfaz de prueba de la Knowledge Base, vinculando ambos recursos para la ejecución de la inferencia RAG.

2. WHEN el Participante realice una consulta RAG con el Guardrail activo que intente extraer datos PII de los documentos indexados, THE Guia_Guardrails SHALL especificar un prompt de prueba que demuestre el enmascaramiento de PII en respuestas generadas a partir del contexto recuperado de S3.

3. WHEN el Participante realice una consulta RAG con el Guardrail activo que viole un tema denegado, THE Guia_Guardrails SHALL especificar un prompt de prueba que demuestre el bloqueo del tema incluso cuando la Knowledge Base contiene información relevante.

4. THE Guia_Guardrails SHALL indicar al Participante que compare las respuestas RAG con y sin Guardrail activo para el mismo prompt, observando las diferencias en el tratamiento de PII y temas denegados.

5. THE Guia_Guardrails SHALL incluir puntos de verificación visual (`✓ Verificación`) después de la integración del Guardrail con la Knowledge Base y después de cada prueba de consulta RAG protegida.

### Requerimiento 7: Documentos Geofísicos de Soporte para la Knowledge Base

**User Story:** Como participante del laboratorio, quiero disponer de documentos geofísicos de ejemplo proporcionados en la carpeta del laboratorio para cargarlos al bucket S3 y alimentar la Knowledge Base, evitando tener que crear contenido desde cero y asegurando que los documentos contengan información verificable para probar el RAG.

#### Criterios de Aceptación

1. THE Guia_RAG SHALL proporcionar al menos 3 documentos geofísicos de soporte en la carpeta del laboratorio (subdirectorio `documentos-geofisicos/`) en formato compatible con RAG (TXT o MD), con contenido contextualizado en geofísica y sismología que incluya:
   - Documento 1: Reporte de actividad sísmica con datos de estaciones, magnitudes, profundidades y coordenadas de eventos recientes.
   - Documento 2: Guía de procedimientos de monitoreo sísmico con protocolos de operación de estaciones sismológicas.
   - Documento 3: Glosario técnico de geofísica y sismología con definiciones de términos del dominio.

2. THE documentos geofísicos de soporte SHALL contener datos PII ficticios de investigadores de campo (nombres, correos electrónicos, números de teléfono) para permitir la demostración del filtro PII de Guardrails cuando se realicen consultas RAG sobre los documentos indexados.

3. THE documentos geofísicos de soporte SHALL contener información verificable y técnicamente precisa sobre geofísica y sismología, evitando datos inventados que puedan confundir al participante sobre la precisión del RAG.

4. THE Guia_RAG SHALL referenciar los documentos geofísicos de soporte explícitamente por nombre y ruta relativa en las instrucciones de carga al bucket S3.

### Requerimiento 8: Prompts y Consultas de Prueba (Archivos de Soporte)

**User Story:** Como participante del laboratorio, quiero disponer de archivos de soporte con todos los prompts y consultas de prueba organizados por sección del laboratorio, para poder copiarlos directamente sin necesidad de transcribirlos manualmente desde los READMEs.

#### Criterios de Aceptación

1. THE Guia_RAG SHALL proporcionar un archivo de soporte `prompts-rag.md` dentro de la carpeta del laboratorio con todos los prompts de prueba para la Knowledge Base, organizados por sección:
   - Prompts de prueba RAG (al menos 3 consultas geofísicas para verificar el funcionamiento de la Knowledge Base)
   - Prompt de consulta sobre tema no contenido en los documentos (para verificar comportamiento ante falta de información)

2. THE Guia_Guardrails SHALL proporcionar un archivo de soporte `prompts-guardrails.md` dentro de la carpeta del laboratorio con todos los prompts de prueba para Guardrails, organizados por sección:
   - Prompts de prueba de temas denegados (al menos 2 prompts que violen los temas configurados)
   - Prompt de prueba de PII (con datos ficticios de investigador de campo)
   - Prompts de prueba de integración RAG + Guardrails

3. THE Guia_RAG y THE Guia_Guardrails SHALL referenciar los archivos de prompts explícitamente por nombre y ruta relativa en cada paso donde se utilice un prompt, indicando: "Copie el prompt del archivo `prompts-rag.md` (o `prompts-guardrails.md`) ubicado en esta carpeta".

4. THE archivos de prompts SHALL presentar cada prompt en bloque de código para facilitar la copia directa por parte del Participante.

### Requerimiento 9: Limpieza de Recursos y Ciclo de Vida

**User Story:** Como participante del laboratorio, quiero instrucciones claras sobre qué recursos deben eliminarse al finalizar el laboratorio y cuáles deben conservarse para laboratorios futuros, para evitar costos innecesarios y no eliminar recursos que se necesiten en el Lab 04.

#### Criterios de Aceptación

1. THE Guia_Guardrails SHALL incluir al final una sección de "Ciclo de Vida de Recursos" que especifique:
   - Recursos creados durante el laboratorio: Knowledge Base, Guardrail, bucket S3, colección OpenSearch Serverless, rol IAM.
   - Indicación de qué recursos deben conservarse si el Participante continuará con el Lab 04.
   - Instrucciones de limpieza opcionales para Participantes que no continuarán, incluyendo el orden correcto de eliminación (primero Knowledge Base, luego bucket S3, luego Guardrail).

2. THE Guia_Guardrails SHALL incluir una nota sobre costos, explicando que Amazon Bedrock Knowledge Bases y Guardrails generan costos por almacenamiento vectorial en OpenSearch Serverless y por tokens procesados durante las consultas RAG, y que el Participante debe ser consciente de estos costos durante la experimentación.

3. IF el Participante necesita eliminar recursos, THEN THE Guia_Guardrails SHALL indicar que primero debe vaciar el bucket S3 antes de eliminarlo, y que la eliminación de la Knowledge Base no elimina automáticamente la colección de OpenSearch Serverless.

### Requerimiento 10: README Principal del Proyecto — Actualización para Lab 03

**User Story:** Como participante del programa AWS AI Essentials, quiero que el README principal en la raíz del proyecto se actualice para incluir el Lab 03 con su título, descripción y tiempo estimado, para tener una visión completa y actualizada del programa.

#### Criterios de Aceptación

1. THE README_Principal SHALL actualizar la tabla de laboratorios para incluir el Lab 03 con la siguiente información:
   - Número: Lab 03 (con enlace a la carpeta `lab-03-bedrock-rag-guardrails/`)
   - Título: RAG y Guardrails con Amazon Bedrock
   - Descripción: Implemente RAG con Knowledge Bases y configure Guardrails de seguridad con ejemplos de geofísica y sismología
   - Tiempo estimado: 55 min

2. THE README_Principal SHALL mantener los Labs 04 y 05 con estado "Próximamente" en la tabla de laboratorios.

3. THE README_Principal SHALL actualizar la sección de objetivos de aprendizaje para incluir los objetivos del Lab 03 (implementar RAG, configurar Guardrails de seguridad).

4. THE README_Principal SHALL actualizar la sección de contenido adicional (AWS Documentation) para incluir enlaces a la documentación oficial de Amazon Bedrock Knowledge Bases y Amazon Bedrock Guardrails.

### Requerimiento 11: Estructura y Cumplimiento de Directrices de Documentación

**User Story:** Como participante del laboratorio, quiero que la documentación del laboratorio cumpla con todas las directrices de estructura, formato y organización establecidas, para tener una experiencia de aprendizaje consistente, navegable y completa.

#### Criterios de Aceptación

1. THE Guia_RAG SHALL existir como el archivo `README-RAG.md` dentro de la carpeta del laboratorio, con la siguiente estructura según las Directrices_Laboratorio:
   - Título con un único emoji al inicio (ej. "🗃️ Laboratorio 3 — Parte 1 y 2: RAG con Amazon Bedrock Knowledge Bases")
   - Índice (tabla de contenidos) con enlaces de ancla a cada sección
   - Tiempo estimado para las Partes 1 y 2: 30-35 minutos
   - Objetivos de aprendizaje (3-4 puntos: configurar infraestructura, crear Knowledge Base, ejecutar consultas RAG con citas)
   - Sección de prerrequisitos: acceso a Amazon Bedrock, modelos habilitados, referencia a Documento_Conceptos_RAG_Guardrails
   - Instrucciones paso a paso numeradas
   - Puntos de verificación visual después de cada paso mayor
   - Referencia a Documento_Troubleshooting al final

2. THE Guia_Guardrails SHALL existir como el archivo `README-GUARDRAILS.md` dentro de la carpeta del laboratorio, con la siguiente estructura según las Directrices_Laboratorio:
   - Título con un único emoji al inicio (ej. "🛡️ Laboratorio 3 — Parte 3: Guardrails con Amazon Bedrock")
   - Índice (tabla de contenidos) con enlaces de ancla a cada sección
   - Tiempo estimado para la Parte 3: 20-25 minutos
   - Objetivos de aprendizaje (3-4 puntos: configurar Guardrails, probar temas denegados, filtrar PII, integrar con RAG)
   - Sección de prerrequisitos: Knowledge Base creada en la Parte 2, referencia a Documento_Conceptos_RAG_Guardrails
   - Instrucciones paso a paso numeradas (continuación de la numeración de la Parte 2)
   - Puntos de verificación visual después de cada paso mayor
   - Sección de ciclo de vida de recursos y limpieza
   - Referencia a Documento_Troubleshooting al final

3. THE Guia_RAG y THE Guia_Guardrails SHALL referenciar el Documento_Conceptos_RAG_Guardrails (`CONCEPTOS-RAG-GUARDRAILS.md`) en los siguientes puntos:
   - Al inicio de cada README, antes de las instrucciones paso a paso, indicando: "Antes de comenzar, revise la [Guía de Conceptos de RAG y Guardrails](CONCEPTOS-RAG-GUARDRAILS.md) para familiarizarse con los términos y conceptos que se utilizarán durante el laboratorio."
   - En cada paso donde un concepto teórico sea relevante, incluir un enlace contextual a la sección correspondiente del Documento_Conceptos_RAG_Guardrails.

4. THE Guia_RAG SHALL indicar que este laboratorio es independiente de los Labs 01 y 02 (no requiere recursos creados en laboratorios anteriores), aunque forma parte de la misma serie progresiva de 5 laboratorios AWS AI Essentials y expande conceptos introducidos en el Lab 02.

5. THE Guia_Guardrails SHALL indicar al final que el Lab 04 continuará expandiendo las capacidades exploradas en este laboratorio.

6. THE Guia_RAG y THE Guia_Guardrails SHALL ser escritos completamente en español, manteniendo en inglés únicamente los nombres de servicios AWS, parámetros técnicos, nombres de archivos y código, según las Directrices_Laboratorio.

7. THE Guia_RAG y THE Guia_Guardrails SHALL utilizar el placeholder `{nombre-participante}` en todos los nombres de recursos AWS creados durante el laboratorio, según las Directrices_Laboratorio.

### Requerimiento 12: Validación de Contenido contra Documentación Oficial de AWS

**User Story:** Como participante del laboratorio, quiero que todas las instrucciones, pasos de navegación y configuraciones del laboratorio estén validadas contra la documentación oficial de AWS, para evitar confusiones causadas por información desactualizada o incorrecta.

#### Criterios de Aceptación

1. THE Guia_RAG y THE Guia_Guardrails SHALL validar todos los pasos de navegación en la consola de Amazon Bedrock contra la Documentacion_AWS utilizando el MCP_Server_AWS_Docs, verificando que las rutas de menú, nombres de botones y flujos de la interfaz reflejen la versión actual de la consola de AWS.

2. THE Guia_RAG SHALL validar que los nombres de los modelos de embeddings (Amazon Titan Text Embeddings v2) y modelos de generación (Anthropic Claude) disponibles en Amazon Bedrock Knowledge Bases sean correctos y estén disponibles en la región de AWS utilizada para el laboratorio.

3. THE Guia_Guardrails SHALL validar que las opciones de configuración de Guardrails (Denied Topics, PII filters, Content Filters) y sus parámetros coincidan con la interfaz actual de Amazon Bedrock Guardrails según la Documentacion_AWS.

4. THE Guia_RAG y THE Guia_Guardrails SHALL validar que la terminología en español utilizada en las instrucciones sea consistente con la interfaz en español de la consola de AWS y con la Documentacion_AWS oficial.

5. IF la Guia_RAG o la Guia_Guardrails contienen instrucciones que difieren de la Documentacion_AWS actual, THEN SHALL documentar la desviación con una justificación explícita del motivo de la diferencia.

6. THE Guia_RAG y THE Guia_Guardrails SHALL utilizar el MCP_Server_AWS_Docs para buscar la documentación específica de Amazon Bedrock Knowledge Bases y Amazon Bedrock Guardrails, verificando que los nombres de parámetros, valores de configuración y recomendaciones de seguridad sean precisos y estén actualizados.

### Requerimiento 13: Suite de Tests Automatizados

**User Story:** Como desarrollador del laboratorio, quiero disponer de una suite de tests automatizados que verifiquen la estructura y contenido de todos los documentos del laboratorio, para garantizar la calidad y consistencia de la documentación mediante pruebas unitarias y basadas en propiedades.

#### Criterios de Aceptación

1. THE suite de tests SHALL utilizar Vitest y fast-check como stack de pruebas, consistente con Lab 01 y Lab 02, con la siguiente configuración:
   - `package.json` con `vitest` (^3.2.1) y `fast-check` (^4.1.1) como devDependencies
   - Script `test` ejecutando `vitest --run`
   - `vitest.config.ts` con `include: ['tests/**/*.test.ts']`
   - `tsconfig.json` con target ES2022, module ESNext, moduleResolution bundler

2. THE suite de tests SHALL incluir pruebas basadas en propiedades (property-based testing) para validar:
   - Estructura válida de `CONCEPTOS-RAG-GUARDRAILS.md`: emoji en título, índice con anclas funcionales, secciones en orden pedagógico
   - Estructura válida de `README-RAG.md`: emoji en título, índice con anclas, tiempo estimado, objetivos de aprendizaje, primer paso como verificación de región
   - Estructura válida de `README-GUARDRAILS.md`: emoji en título, índice con anclas, tiempo estimado, objetivos de aprendizaje
   - Puntos de verificación visual (`✓ Verificación`) después de pasos de configuración en ambos READMEs
   - Referencias cruzadas a `CONCEPTOS-RAG-GUARDRAILS.md` en prerrequisitos y pasos de ambos READMEs
   - Estructura válida del README Principal actualizado: tabla con 5 labs, enlace a Lab 03, licencia MIT

3. THE suite de tests SHALL incluir pruebas unitarias para validar contenido específico:
   - Contenido de cada sección del Documento_Conceptos_RAG_Guardrails (RAG, embeddings, Knowledge Bases, Guardrails, temas denegados, PII, integración)
   - Contenido del README-RAG.md (pasos de IAM, S3, Knowledge Base, sincronización, consultas RAG con citas)
   - Contenido del README-GUARDRAILS.md (temas denegados geofísicos, filtros PII, pruebas de Guardrails, integración con Knowledge Base)
   - Contenido de los archivos de prompts (prompts-rag.md y prompts-guardrails.md)
   - Contenido de los documentos geofísicos de soporte
   - Contenido actualizado del README Principal (Lab 03 en tabla)

4. THE suite de tests SHALL etiquetar cada prueba de propiedad con un comentario en el formato: `// Feature: lab-03-bedrock-rag-guardrails, Property {N}: {descripción}`
