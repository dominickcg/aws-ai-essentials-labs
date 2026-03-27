# 🗃️ Laboratorio 3 — RAG con Amazon Bedrock Knowledge Bases

Configure un bucket S3 y construya una Knowledge Base en Amazon Bedrock que indexe documentos geofísicos para realizar consultas RAG con citas de fuentes verificadas. Experimente cómo la Generación Aumentada por Recuperación (RAG) reduce las alucinaciones al fundamentar las respuestas del modelo en datos reales del dominio de la geofísica y sismología.

---

## Indice

1. [Objetivos de Aprendizaje](#objetivos-de-aprendizaje)
2. [Prerrequisitos](#prerrequisitos)
3. [Preparación del Entorno](#preparación-del-entorno)
   - [Paso 1: Verificación de Región AWS](#paso-1-verificación-de-región-aws)
   - [Paso 2: Crear Bucket S3](#paso-2-crear-bucket-s3)
   - [Paso 3: Cargar Documentos Geofísicos](#paso-3-cargar-documentos-geofísicos)
4. [RAG con Knowledge Bases](#rag-con-knowledge-bases)
   - [Paso 4: Crear Knowledge Base](#paso-4-crear-knowledge-base)
   - [Paso 5: Sincronización](#paso-5-sincronización)
   - [Paso 6: Seleccionar Modelo de Generación](#paso-6-seleccionar-modelo-de-generación)
   - [Paso 7: Consultas RAG](#paso-7-consultas-rag)
   - [Paso 8: Verificar Citas](#paso-8-verificar-citas)
5. [Solución de Problemas](#solución-de-problemas)

---

⏱️ **Tiempo estimado**: 30-35 minutos

## Objetivos de Aprendizaje

Al completar este laboratorio, usted será capaz de:

- Configurar un bucket S3 como fuente de datos para que Amazon Bedrock Knowledge Bases indexe documentos geofísicos.
- Crear y configurar una Knowledge Base en Amazon Bedrock conectando un bucket S3 con Amazon OpenSearch Serverless como vector store.
- Ejecutar consultas RAG sobre documentos de sismología y verificar que las respuestas incluyen citas de las fuentes originales.
- Comprender cómo RAG reduce las alucinaciones al fundamentar las respuestas del modelo en datos verificados del dominio geofísico.

---

## Prerrequisitos

Antes de iniciar este laboratorio, asegúrese de contar con lo siguiente:

- Acceso a la consola de AWS con permisos para Amazon Bedrock.
- Modelos habilitados en Amazon Bedrock:
  - **Amazon Titan Text Embeddings v2** (modelo de embeddings para la Knowledge Base)
  - **Anthropic Claude** (modelo de generación para consultas RAG)
- Archivos de documentos geofísicos disponibles en la carpeta `documentos-geofisicos/` de este laboratorio.
- Archivo de prompts de prueba [`prompts-rag.md`](prompts-rag.md) disponible en esta carpeta del laboratorio.

Antes de comenzar, revise la [Guía de Conceptos Fundamentales de RAG](CONCEPTOS-RAG.md) para familiarizarse con los conceptos de RAG, Knowledge Bases, embeddings y bases de datos vectoriales que se utilizarán durante el laboratorio.

> **Nota**: Este laboratorio es independiente de los Labs 01 y 02. No se requieren recursos creados en laboratorios anteriores.

---

## Preparación del Entorno

### Paso 1: Verificación de Región AWS

1. Verifique que está trabajando en la región correcta:
   - En la esquina superior derecha de la consola de AWS, observe el nombre de la región
   - Confirme que dice la región estipulada por el instructor
   - Si no es correcta, haga clic en el nombre de la región y seleccione la región indicada

**✓ Verificación**: La esquina superior derecha de la consola muestra la región correcta indicada por el instructor.

---

### Paso 2: Crear Bucket S3

1. Utilice la barra de búsqueda global y escriba `S3`.
2. Haga clic en **S3** en los resultados para acceder a la consola del servicio.
3. En el panel de navegación de la izquierda, haga clic en **General purpose buckets**.
4. Haga clic en el botón **Create bucket**.
5. Configure los siguientes parámetros:
   - **Bucket name**: `s3-lab03-knowledge-source-{nombre-participante}`
   - **Region**: Mantenga la misma región verificada en el Paso 1
6. En la sección **Default encryption**, configure:
   - **Encryption type**: Seleccione **Server-side encryption with Amazon S3 managed keys (SSE-S3)**
7. Mantenga las demás opciones con sus valores predeterminados.
8. Haga clic en **Create bucket**.

**✓ Verificación**: El bucket `s3-lab03-knowledge-source-{nombre-participante}` aparece en la lista de buckets de S3 con cifrado SSE-S3 habilitado.

---

### Paso 3: Cargar Documentos Geofísicos

En este paso cargará los documentos geofísicos proporcionados en la carpeta del laboratorio al bucket S3. Estos documentos serán la fuente de conocimiento para la Knowledge Base.

1. En la consola de S3, haga clic en el nombre del bucket `s3-lab03-knowledge-source-{nombre-participante}` para abrirlo.
2. Haga clic en el botón **Upload**.
3. Haga clic en **Add files** y seleccione los siguientes 3 archivos de la carpeta `documentos-geofisicos/` de este laboratorio:
   - [`reporte-actividad-sismica.md`](documentos-geofisicos/reporte-actividad-sismica.md) — Reporte de actividad sísmica con datos de estaciones, magnitudes, profundidades y coordenadas de eventos recientes
   - [`procedimientos-monitoreo-sismico.md`](documentos-geofisicos/procedimientos-monitoreo-sismico.md) — Guía de procedimientos de monitoreo sísmico con protocolos de operación de estaciones sismológicas
   - [`glosario-geofisica-sismologia.md`](documentos-geofisicos/glosario-geofisica-sismologia.md) — Glosario técnico de geofísica y sismología con definiciones de términos del dominio
4. Verifique que los 3 archivos están en formato Markdown (`.md`), compatible con Amazon Bedrock Knowledge Bases para RAG.
5. Haga clic en **Upload** y espere a que la carga se complete exitosamente.

**✓ Verificación**: Los 3 archivos Markdown aparecen listados dentro del bucket `s3-lab03-knowledge-source-{nombre-participante}` con estado de carga exitoso.

---

## RAG con Knowledge Bases

### Paso 4: Crear Knowledge Base

En este paso creará una Knowledge Base en Amazon Bedrock que conectará el bucket S3 con un vector store para implementar RAG. Para comprender la arquitectura completa de una Knowledge Base, consulte la sección [Knowledge Bases en Amazon Bedrock](CONCEPTOS-RAG.md#4-knowledge-bases-en-amazon-bedrock) del documento de conceptos.

1. Utilice la barra de búsqueda global y escriba `Amazon Bedrock`.
2. Haga clic en **Amazon Bedrock** en los resultados para acceder a la consola del servicio.
3. En el panel de navegación de la izquierda, haga clic en **Knowledge bases**.
4. Haga clic en el botón **Create knowledge base** y seleccione la opción para crear una Knowledge Base con vector store.
5. Configure los detalles de la Knowledge Base:
   - **Name**: Ingrese un nombre descriptivo que incluya `{nombre-participante}` (ej. `kb-geofisica-{nombre-participante}`)
   - **Description**: (Opcional) Agregue una descripción como "Knowledge Base de documentos geofísicos para RAG"
6. Seleccione **Amazon S3** como fuente de datos (Data source).
7. Configure la conexión al bucket S3:
   - Proporcione un nombre para el Data Source.
   - **S3 URI**: `s3://s3-lab03-knowledge-source-{nombre-participante}/`
   - Verifique que la ruta apunta al bucket correcto donde cargó los documentos geofísicos en el Paso 3.
8. En la sección **Content parsing and chunking**, mantenga la estrategia de chunking en **Default** (Amazon Bedrock optimizará automáticamente el tamaño de los chunks).
9. En la sección **Embeddings model**, seleccione **Amazon Titan Text Embeddings v2** como modelo de embeddings.
10. En la sección **Vector database**, seleccione la opción **Quick create a new vector store** y elija **Amazon OpenSearch Serverless** para que Amazon Bedrock aprovisione automáticamente una colección vectorial.
11. Revise la configuración y haga clic en **Create knowledge base**.

**✓ Verificación**: La Knowledge Base se creó exitosamente y aparece en la lista de Knowledge Bases de Amazon Bedrock con el nombre que incluye `{nombre-participante}`. El Data Source muestra el URI `s3://s3-lab03-knowledge-source-{nombre-participante}/` y está correctamente asociado a la Knowledge Base.

---

### Paso 5: Sincronización

En este paso iniciará el proceso de sincronización que lee los documentos de S3, los divide en chunks, genera embeddings y puebla el índice vectorial. Para comprender el flujo completo de ingestión, consulte la sección [Arquitectura de RAG Paso a Paso](CONCEPTOS-RAG.md#2-arquitectura-de-rag-paso-a-paso) del documento de conceptos.

1. Dentro de la Knowledge Base, localice la sección **Data source** donde aparece el Data Source configurado en el paso anterior.
2. Seleccione el Data Source y haga clic en el botón **Sync**.
3. El proceso de sincronización ejecutará las siguientes operaciones automáticamente:
   - **Lectura**: Amazon Bedrock lee los 3 documentos Markdown del bucket S3
   - **Chunking**: Los documentos se dividen en fragmentos de texto (chunks) optimizados
   - **Embeddings**: Cada chunk se transforma en un vector numérico usando Amazon Titan Text Embeddings v2
   - **Indexación**: Los vectores se almacenan en el índice de Amazon OpenSearch Serverless

⏱️ **Nota**: El proceso de sincronización puede tardar varios minutos dependiendo del volumen de documentos. Espere a que aparezca un banner verde de éxito indicando que la sincronización se completó correctamente. No cancele ni reinicie el proceso.

**✓ Verificación**: La sincronización se completó exitosamente (banner verde de éxito) y el resumen de sincronización indica que los 3 documentos fueron procesados. Puede seleccionar el Data Source para ver el **Sync history** y confirmar el resultado.

---

### Paso 6: Seleccionar Modelo de Generación

1. Dentro de la Knowledge Base, localice la ventana de prueba (Test window) en el panel derecho de la consola. La ventana de prueba se expande automáticamente desde la derecha al seleccionar una Knowledge Base.
2. Si la ventana de prueba no está visible, haga clic en el botón **Test knowledge base** disponible en la interfaz.
3. En la ventana de prueba, active el toggle **Generate responses** para habilitar la generación de respuestas basadas en los datos de la Knowledge Base. Amazon Bedrock generará respuestas fundamentadas en sus fuentes de datos e incluirá citas (footnotes) con la información proporcionada.
4. Haga clic en el botón **Select model** para elegir el modelo de generación.
5. Seleccione un modelo de la familia **Anthropic Claude** disponible en Amazon Bedrock como modelo de generación para las consultas RAG.
6. Haga clic en **Apply** para confirmar la selección del modelo.

**✓ Verificación**: El toggle **Generate responses** está activado, el modelo Anthropic Claude está seleccionado en la ventana de prueba de la Knowledge Base y la interfaz está lista para recibir consultas RAG.

---

### Paso 7: Consultas RAG

En este paso probará la Knowledge Base con consultas geofísicas para verificar que el RAG recupera información relevante de los documentos indexados. Copie los prompts del archivo [`prompts-rag.md`](prompts-rag.md) proporcionado en esta carpeta del laboratorio.

#### Consulta 1 — Datos sísmicos específicos

1. En la ventana de prueba de la Knowledge Base, copie y pegue el siguiente prompt del archivo [`prompts-rag.md`](prompts-rag.md) (Prompt 1):

   ```
   ¿Cuáles fueron los eventos sísmicos más significativos registrados y cuáles fueron sus magnitudes, profundidades y ubicaciones?
   ```

2. Haga clic en el botón **Run** para enviar la consulta y observe la respuesta generada.
3. Verifique que la respuesta contiene datos concretos extraídos del documento `reporte-actividad-sismica.md` (magnitudes, profundidades, coordenadas).

**✓ Verificación**: La respuesta incluye datos sísmicos específicos recuperados de los documentos indexados, no información genérica del modelo.

#### Consulta 2 — Síntesis de múltiples documentos

1. Copie y pegue el siguiente prompt del archivo [`prompts-rag.md`](prompts-rag.md) (Prompt 2):

   ```
   ¿Cómo se relacionan los procedimientos de monitoreo sísmico del IGP con la detección y análisis de los eventos sísmicos recientes documentados?
   ```

2. Haga clic en **Run** para enviar la consulta y observe la respuesta generada.
3. Verifique que la respuesta integra información tanto del reporte de actividad sísmica como de los procedimientos de monitoreo.

**✓ Verificación**: La respuesta combina información de múltiples documentos, demostrando la capacidad de RAG para sintetizar datos de diferentes fuentes.

#### Consulta 3 — Terminología geofísica

1. Copie y pegue el siguiente prompt del archivo [`prompts-rag.md`](prompts-rag.md) (Prompt 3):

   ```
   Explica qué es la zona de Wadati-Benioff y cuál es su relevancia para la sismicidad en el Perú.
   ```

2. Haga clic en **Run** para enviar la consulta y observe la respuesta generada.
3. Verifique que la respuesta recupera definiciones del glosario técnico de geofísica.

**✓ Verificación**: La respuesta incluye definiciones técnicas recuperadas del glosario geofísico indexado en la Knowledge Base.

#### Consulta 4 — Fuera de dominio

1. Copie y pegue el siguiente prompt del archivo [`prompts-rag.md`](prompts-rag.md) (Prompt 5):

   ```
   ¿Cuáles son las principales erupciones volcánicas registradas en el Perú durante los últimos 10 años y qué impacto tuvieron en las comunidades cercanas?
   ```

2. Haga clic en **Run** para enviar la consulta y observe la respuesta generada.
3. Verifique que el modelo indica que no encontró información relevante en los documentos indexados, en lugar de inventar una respuesta.

**✓ Verificación**: El modelo reconoce que la información sobre erupciones volcánicas no está contenida en los documentos de la Knowledge Base, demostrando que RAG reduce las alucinaciones al limitar las respuestas a datos verificados.

---

### Paso 8: Verificar Citas

Después de ejecutar las consultas RAG en el paso anterior, verifique que las respuestas incluyen citas en forma de notas al pie (footnotes) que referencian los documentos originales.

1. Revise las respuestas generadas en las Consultas 1, 2 y 3 del Paso 7.
2. Para cada respuesta, localice las **notas al pie** (footnotes) que aparecen en la respuesta:
   - Cada footnote referencia una fuente de datos utilizada para generar esa parte de la respuesta
   - Las citas permiten al usuario verificar la fuente de cada afirmación en la respuesta
3. Haga clic en un **footnote** para ver un extracto de la fuente citada correspondiente a esa parte de la respuesta. Cada cita debe incluir el nombre del archivo de origen en S3 (ej. `reporte-actividad-sismica.md`, `procedimientos-monitoreo-sismico.md`, `glosario-geofisica-sismologia.md`).
4. Para ver los detalles completos de los fragmentos recuperados, haga clic en el botón **Show source details**.
5. Expanda los fragmentos (chunks) individuales para ver el texto original recuperado del documento y compare con la respuesta generada para confirmar que el modelo utilizó la información del documento como base para su respuesta.

**✓ Verificación**: Las respuestas RAG de las Consultas 1, 2 y 3 incluyen footnotes con referencias a los archivos de origen en S3, y al hacer clic en **Show source details** se pueden ver los fragmentos de texto original recuperados de los documentos.

---

> ⚠️ **Importante**: Conserve todos los recursos creados en este laboratorio (Knowledge Base, bucket S3, vector store). Los utilizaremos en el **[Lab 04 — Guardrails con Amazon Bedrock](../lab-04-bedrock-guardrails/README.md)**.

---

## Solución de Problemas

Si la creación de la Knowledge Base o la sincronización falla, siga estos pasos de diagnóstico:

1. **Verificar permisos del rol IAM**:
   - En la consola de IAM, verifique que el Service-Linked Role de Amazon Bedrock tiene la entidad de confianza `bedrock.amazonaws.com`
   - Verifique que el rol incluye permisos de lectura a S3 y `aoss:APIAccessAll` para OpenSearch Serverless

2. **Verificar accesibilidad del bucket S3**:
   - Confirme que el bucket `s3-lab03-knowledge-source-{nombre-participante}` existe y contiene los 3 documentos geofísicos
   - Verifique que el URI configurado en el Data Source coincide exactamente con el nombre del bucket

3. **Verificar disponibilidad del modelo de embeddings**:
   - En Amazon Bedrock, navegue a **Model access** y confirme que **Amazon Titan Text Embeddings v2** está habilitado en la región actual
   - Si el modelo no está disponible, notifique al instructor

> ⚠️ Si el error persiste después de verificar estos puntos, notifique al instructor de inmediato. No intente solucionar errores de permisos o cuotas por su cuenta.

Si encuentra otras dificultades durante este laboratorio, consulte la [Guía de Solución de Problemas](../TROUBLESHOOTING.md) que contiene soluciones a errores comunes.

**Errores que requieren asistencia del instructor:**
- Errores de permisos IAM
- Errores de límites de cuota de AWS
