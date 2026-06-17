# Laboratorio: RAG y Guardrails con Amazon Bedrock
## Parte 1: Conceptos Fundamentales y Preparación del Entorno (Actualizado)

### Introducción
Este documento define los requerimientos técnicos para la fase de preparación del laboratorio. Dado que el acceso a los modelos fundacionales (FMs) en Amazon Bedrock está habilitado por defecto en las cuentas de entrenamiento, esta fase se centra exclusivamente en la infraestructura de soporte: la identidad (IAM) para la orquestación de servicios y el almacenamiento (S3) para el origen de datos del RAG. El éxito de esta fase garantiza que Bedrock tenga los permisos necesarios para actuar en nombre del usuario.

### Glosario
* **Service-Linked Role:** Un tipo de rol de IAM vinculado directamente a un servicio de AWS (como Bedrock) que permite al servicio realizar acciones en otros servicios en su nombre.
* **Vector Store Permissions:** Permisos específicos de red y de datos necesarios para que Amazon Bedrock pueda leer y escribir en colecciones de Amazon OpenSearch Serverless.
* **Encryption at Rest:** Cifrado de datos almacenados en S3 y OpenSearch, un requisito de seguridad estándar en arquitecturas de IA generativa.

---

### Requerimientos

#### Requerimiento 1: Configuración de Políticas de Confianza (Trust Policies)
* **Historia de Usuario:** Cuando el participante configure la base de conocimiento (Knowledge Base), el Entorno de AWS deberá permitir que el servicio `bedrock.amazonaws.com` asuma un rol de servicio para interactuar con otros recursos.
* **Criterios de Aceptación:**
  1. Si el rol de IAM no contiene la entidad de confianza para el servicio de Bedrock, entonces el Entorno de AWS deberá denegar la creación de la Knowledge Base.
  2. Cuando el rol sea asumido por Bedrock, el Entorno de AWS deberá permitir el acceso de lectura al bucket de S3 específico del laboratorio.
  3. El Entorno de AWS deberá validar que el rol tenga permisos de escritura (`aoss:APIAccessAll`) sobre la colección de OpenSearch Serverless que se creará automáticamente.

#### Requerimiento 2: Integridad y Disponibilidad del Data Source (S3)
* **Historia de Usuario:** El Entorno de AWS deberá proporcionar un punto de montaje de datos persistente y privado donde el motor de ingestión de Bedrock pueda realizar el proceso de *chunking* y *embeddings*.
* **Criterios de Aceptación:**
  1. Cuando el participante cargue archivos al bucket `s3://lab-bedrock-knowledge-source-[ID]`, el Entorno de AWS deberá asegurar que los objetos tengan habilitado el cifrado del lado del servidor (SSE-S3).
  2. Si el bucket contiene archivos en formatos no compatibles (ej. ejecutables .exe), entonces el Entorno de AWS deberá ignorarlos durante el proceso de sincronización de la Knowledge Base.
  3. El Entorno de AWS deberá garantizar que el bucket sea accesible únicamente a través de la red interna de AWS (VPC) o mediante el rol de servicio de Bedrock.

## Parte 2: RAG con Amazon Bedrock Knowledge Bases

### Introducción
Este documento define los requerimientos técnicos y funcionales para implementar el flujo completo de Generación Aumentada por Recuperación (RAG). El objetivo es que el entorno orqueste la ingesta de documentos corporativos, su transformación matemática (embeddings) y su indexación, permitiendo finalmente que un modelo fundacional responda consultas basándose exclusivamente en esta información propietaria y citando sus fuentes.

### Glosario
* **Embeddings:** Representación vectorial (matemática) del texto que permite a los sistemas informáticos comprender el contexto y la similitud semántica entre diferentes fragmentos de información.
* **Chunking Strategy:** El método mediante el cual Amazon Bedrock divide documentos grandes en fragmentos de texto más pequeños (chunks) antes de convertirlos en embeddings, optimizando la precisión de la búsqueda.
* **Amazon OpenSearch Serverless:** Motor de búsqueda y análisis vectorial gestionado, utilizado en este laboratorio para almacenar y recuperar de forma ultra-rápida los embeddings generados.
* **RetrieveAndGenerate:** La operación de la API de Bedrock que primero busca información relevante en la base de datos vectorial (Retrieve) y luego utiliza un modelo de texto para formular la respuesta final (Generate).

---

### Requerimientos

#### Requerimiento 1: Ingesta del Origen de Datos (S3)
* **Historia de Usuario:** Cuando el participante configure el Data Source, el Entorno de AWS deberá integrar el bucket de Amazon S3 previamente creado para permitir la lectura segura de los documentos corporativos.
* **Criterios de Aceptación:**
  1. Cuando el participante especifique el URI del bucket de S3 en la consola de Bedrock, el Entorno de AWS deberá validar que la ruta existe y es accesible mediante el rol de servicio.
  2. Si el participante define un prefijo específico (ej. `s3://bucket-name/rrhh-docs/`), entonces el Entorno de AWS deberá limitar la extracción de documentos exclusivamente a esa ruta.
  3. El Entorno de AWS deberá soportar la lectura de formatos compatibles estándar para RAG (PDF, TXT, MD, HTML, DOCX) durante el proceso de escaneo del origen de datos.

#### Requerimiento 2: Configuración de la Knowledge Base y DB Vectorial
* **Historia de Usuario:** Cuando el participante defina la base de conocimiento, el Entorno de AWS deberá aprovisionar automáticamente la infraestructura subyacente de búsqueda vectorial y el modelo de transformación.
* **Criterios de Aceptación:**
  1. Cuando el participante seleccione un modelo de Embeddings (ej. Amazon Titan Text Embeddings v2), el Entorno de AWS deberá establecerlo como el motor de transformación predeterminado para esta Knowledge Base.
  2. Cuando el participante elija la opción de creación rápida ("Quick create a new vector store"), el Entorno de AWS deberá aprovisionar automáticamente una colección de Amazon OpenSearch Serverless y crear el índice vectorial correspondiente en segundo plano.
  3. Si la creación del índice vectorial falla por tiempos de espera en OpenSearch, entonces el Entorno de AWS deberá abortar la creación de la Knowledge Base y mostrar un mensaje de error claro en la consola.

#### Requerimiento 3: Sincronización de Datos y Prueba de RAG
* **Historia de Usuario:** Cuando el participante sincronice la base de datos y realice una consulta, el Entorno de AWS deberá recuperar los fragmentos relevantes y generar una respuesta precisa que incluya las citas de los documentos originales.
* **Criterios de Aceptación:**
  1. Cuando el participante ejecute la acción "Sync", el Entorno de AWS deberá leer los documentos de S3, aplicar el *chunking*, generar los *embeddings* y poblar el índice de OpenSearch Serverless.
  2. Cuando el participante ingrese un *prompt* en la ventana de prueba (Test window) y seleccione un modelo de generación de texto (ej. Anthropic Claude 3), el Entorno de AWS deberá realizar una búsqueda de similitud semántica y generar una respuesta basada en el contexto recuperado.
  3. El Entorno de AWS deberá adjuntar referencias (citas o *footnotes*) en la interfaz de usuario que apunten directamente al nombre del archivo de origen en S3 de donde se extrajo la información.

## Parte 3: Filtros de Seguridad con Amazon Bedrock Guardrails

### Introducción
Este documento detalla los requerimientos para la implementación de barreras de seguridad (Guardrails) en Amazon Bedrock. El objetivo es garantizar que las aplicaciones de IA Generativa operen dentro de las directrices corporativas y los principios de IA Responsable. Se definirá el comportamiento del entorno para filtrar temas denegados, enmascarar Información de Identificación Personal (PII) y, finalmente, integrar esta capa de seguridad con el motor RAG construido en la fase anterior.

### Glosario
* **Guardrails for Amazon Bedrock:** Funcionalidad que permite implementar salvaguardas personalizadas, evaluando tanto la entrada del usuario (*prompt*) como la salida del modelo (*completion*).
* **Denied Topics (Temas Denegados):** Políticas configuradas en lenguaje natural que instruyen al Guardrail sobre qué áreas de conversación deben ser bloqueadas (ej. asesoramiento financiero, diagnósticos médicos).
* **PII (Personally Identifiable Information):** Datos que pueden utilizarse para identificar a un individuo. Bedrock Guardrails puede bloquearlos o aplicar *Redaction*.
* **Redaction (Enmascaramiento):** Proceso automático donde el Guardrail reemplaza datos sensibles en la respuesta del modelo con etiquetas seguras (ej. cambiar "juan@email.com" por `[EMAIL]`).

---

### Requerimientos

#### Requerimiento 1: Configuración de Políticas de Bloqueo y PII
* **Historia de Usuario:** Cuando el estudiante configure el Guardrail, el Entorno de AWS deberá aplicar reglas precisas para bloquear temas no deseados y proteger la privacidad de los datos.
* **Criterios de Aceptación:**
  1. Cuando el estudiante defina un tema denegado (ej. "Asesoría Financiera"), el Entorno de AWS deberá registrar la descripción en lenguaje natural para evaluar semánticamente las futuras interacciones.
  2. Si el estudiante habilita el filtro de PII para "Correo Electrónico" y "Número de Teléfono", entonces el Entorno de AWS deberá permitir configurar la acción deseada, ya sea bloqueo total (Block) o enmascaramiento (Redact).
  3. El Entorno de AWS deberá permitir la configuración de un mensaje de respuesta estandarizado (ej. "Lo siento, no puedo responder sobre este tema debido a políticas de seguridad.") para cuando se intercepte una violación a las reglas.

#### Requerimiento 2: Validación Independiente en el Playground
* **Historia de Usuario:** Cuando el estudiante pruebe el Guardrail de forma aislada, el Entorno de AWS deberá evaluar las entradas y salidas en tiempo real antes de entregar la respuesta al usuario final.
* **Criterios de Aceptación:**
  1. Cuando el estudiante introduzca un *prompt* malicioso que viole el tema denegado en el panel de pruebas integrado, el Entorno de AWS deberá interceptar la solicitud y devolver inmediatamente el mensaje de bloqueo configurado.
  2. Si el modelo genera una respuesta válida pero que incluye información personal detectada por el filtro PII, entonces el Entorno de AWS deberá interceptar la salida y reemplazar el dato sensible con su respectivo identificador (ej. `[PHONE-NUMBER]`).
  3. El Entorno de AWS deberá mostrar las métricas de rastreo (*Trace*) en la interfaz, indicando claramente al estudiante qué filtro específico (Topic, PII, Content Filter) fue el responsable de la acción.

#### Requerimiento 3: Integración del Guardrail con la Knowledge Base
* **Historia de Usuario:** Cuando el estudiante asocie el Guardrail a la solución RAG, el Entorno de AWS deberá aplicar la capa de seguridad al flujo completo de *RetrieveAndGenerate* de manera transparente.
* **Criterios de Aceptación:**
  1. Cuando el estudiante seleccione el Guardrail y su versión (Version) dentro de la interfaz de prueba de la Knowledge Base, el Entorno de AWS deberá vincular ambos recursos para la ejecución de la inferencia.
  2. Si el estudiante realiza una consulta RAG que intenta extraer o revelar datos PII de los documentos indexados en S3, entonces el Entorno de AWS deberá aplicar la técnica de *redaction* en la respuesta final generada por el LLM basado en el contexto recuperado.
  3. El Entorno de AWS deberá procesar las evaluaciones del Guardrail manteniendo la experiencia del usuario fluida y dentro de los límites de latencia esperados del servicio.