# 🗃️ Laboratorio 3 — RAG con Amazon Bedrock Knowledge Bases

Configure la infraestructura base (IAM y S3) y construya una Knowledge Base en Amazon Bedrock que indexe documentos geofísicos para realizar consultas RAG con citas de fuentes verificadas. Experimente cómo la Generación Aumentada por Recuperación (RAG) reduce las alucinaciones al fundamentar las respuestas del modelo en datos reales del dominio de la geofísica y sismología.

---

## Indice

1. [Objetivos de Aprendizaje](#objetivos-de-aprendizaje)
2. [Prerrequisitos](#prerrequisitos)
3. [Preparación del Entorno](#preparación-del-entorno)
   - [Paso 1: Verificación de Región AWS](#paso-1-verificación-de-región-aws)
   - [Paso 2: Verificar Service-Linked Role de IAM](#paso-2-verificar-service-linked-role-de-iam)
   - [Paso 3: Crear Bucket S3](#paso-3-crear-bucket-s3)
   - [Paso 4: Cargar Documentos Geofísicos](#paso-4-cargar-documentos-geofísicos)
4. [RAG con Knowledge Bases](#rag-con-knowledge-bases)
   - [Paso 5: Crear Knowledge Base](#paso-5-crear-knowledge-base)
   - [Paso 6: Configurar Data Source](#paso-6-configurar-data-source)
   - [Paso 7: Sincronización](#paso-7-sincronización)
   - [Paso 8: Seleccionar Modelo de Generación](#paso-8-seleccionar-modelo-de-generación)
   - [Paso 9: Consultas RAG](#paso-9-consultas-rag)
   - [Paso 10: Verificar Citas](#paso-10-verificar-citas)
5. [Solución de Problemas](#solución-de-problemas)

---

⏱️ **Tiempo estimado**: 30-35 minutos

## Objetivos de Aprendizaje

Al completar este laboratorio, usted será capaz de:

- Configurar la infraestructura base de IAM y S3 necesaria para que Amazon Bedrock Knowledge Bases acceda a documentos geofísicos.
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

### Paso 2: Verificar Service-Linked Role de IAM

En este paso verificará que existe el rol de servicio que permite a Amazon Bedrock acceder a S3 y OpenSearch Serverless en nombre del usuario. Para comprender el concepto de IAM Service Role, consulte la sección [Preparación del Entorno](CONCEPTOS-RAG.md#5-preparación-del-entorno) del documento de conceptos.

1. Utilice la barra de búsqueda global (parte superior de la consola) y escriba `IAM`.
2. Haga clic en **IAM** en los resultados para acceder a la consola del servicio.
3. En el panel de navegación de la izquierda, haga clic en **Roles**.
4. En el campo de búsqueda de roles, escriba `Bedrock` para filtrar los roles relacionados con Amazon Bedrock.
5. Localice el Service-Linked Role y haga clic en su nombre para ver los detalles.
6. Verifique los siguientes elementos del rol:
   - **Entidad de confianza**: Debe mostrar `bedrock.amazonaws.com` como la entidad que puede asumir este rol
   - **Permisos**: El rol debe incluir:
     - Acceso de lectura a Amazon S3 (para leer los documentos del bucket)
     - Permiso `aoss:APIAccessAll` para Amazon OpenSearch Serverless (para crear y gestionar el índice vectorial)

**✓ Verificación**: El rol de servicio de Amazon Bedrock existe, tiene la entidad de confianza `bedrock.amazonaws.com` y cuenta con permisos de lectura a S3 y acceso a OpenSearch Serverless (`aoss:APIAccessAll`).

> ⚠️ **Nota**: Si no encuentra el rol o recibe errores de permisos al verificarlo, notifique al instructor de inmediato. No intente crear ni modificar roles IAM por su cuenta.

---

### Paso 3: Crear Bucket S3

1. Utilice la barra de búsqueda global y escriba `S3`.
2. Haga clic en **S3** en los resultados para acceder a la consola del servicio.
3. Haga clic en el botón naranja **Crear bucket**.
4. Configure los siguientes parámetros:
   - **Nombre del bucket**: `s3-lab03-knowledge-source-{nombre-participante}`
   - **Región**: Mantenga la misma región verificada en el Paso 1
5. En la sección **Cifrado predeterminado**, configure:
   - **Tipo de cifrado del lado del servidor**: Seleccione **Cifrado del lado del servidor con claves administradas de Amazon S3 (SSE-S3)**
6. Mantenga las demás opciones con sus valores predeterminados.
7. Haga clic en **Crear bucket**.

**✓ Verificación**: El bucket `s3-lab03-knowledge-source-{nombre-participante}` aparece en la lista de buckets de S3 con cifrado SSE-S3 habilitado.

---

### Paso 4: Cargar Documentos Geofísicos

En este paso cargará los documentos geofísicos proporcionados en la carpeta del laboratorio al bucket S3. Estos documentos serán la fuente de conocimiento para la Knowledge Base.

1. En la consola de S3, haga clic en el nombre del bucket `s3-lab03-knowledge-source-{nombre-participante}` para abrirlo.
2. Haga clic en el botón naranja **Cargar**.
3. Haga clic en **Agregar archivos** y seleccione los siguientes 3 archivos de la carpeta `documentos-geofisicos/` de este laboratorio:
   - [`reporte-actividad-sismica.md`](documentos-geofisicos/reporte-actividad-sismica.md) — Reporte de actividad sísmica con datos de estaciones, magnitudes, profundidades y coordenadas de eventos recientes
   - [`procedimientos-monitoreo-sismico.md`](documentos-geofisicos/procedimientos-monitoreo-sismico.md) — Guía de procedimientos de monitoreo sísmico con protocolos de operación de estaciones sismológicas
   - [`glosario-geofisica-sismologia.md`](documentos-geofisicos/glosario-geofisica-sismologia.md) — Glosario técnico de geofísica y sismología con definiciones de términos del dominio
4. Verifique que los 3 archivos están en formato Markdown (`.md`), compatible con Amazon Bedrock Knowledge Bases para RAG.
5. Haga clic en **Cargar** y espere a que la carga se complete exitosamente.

**✓ Verificación**: Los 3 archivos Markdown aparecen listados dentro del bucket `s3-lab03-knowledge-source-{nombre-participante}` con estado de carga exitoso.

---

## RAG con Knowledge Bases

### Paso 5: Crear Knowledge Base

En este paso creará una Knowledge Base en Amazon Bedrock que conectará el bucket S3 con un vector store para implementar RAG. Para comprender la arquitectura completa de una Knowledge Base, consulte la sección [Knowledge Bases en Amazon Bedrock](CONCEPTOS-RAG.md#4-knowledge-bases-en-amazon-bedrock) del documento de conceptos.

1. Utilice la barra de búsqueda global y escriba `Amazon Bedrock`.
2. Haga clic en **Amazon Bedrock** en los resultados para acceder a la consola del servicio.
3. En el panel de navegación de la izquierda, en la sección **Orchestration**, haga clic en **Knowledge bases**.
4. Haga clic en el botón **Create knowledge base**.
5. Configure los detalles de la Knowledge Base:
   - **Name**: Ingrese un nombre descriptivo que incluya `{nombre-participante}` (ej. `kb-geofisica-{nombre-participante}`)
   - **Description**: (Opcional) Agregue una descripción como "Knowledge Base de documentos geofísicos para RAG"
6. En la sección de **Data source**, seleccione **Amazon S3** como tipo de fuente de datos.
7. En la sección de **Embeddings model**, seleccione **Amazon Titan Text Embeddings v2** como modelo de embeddings.
8. En la sección de **Vector store**, seleccione la opción **Quick create a new vector store** para que Amazon Bedrock aprovisione automáticamente una colección de Amazon OpenSearch Serverless.
9. Revise la configuración y haga clic en **Create knowledge base**.

**✓ Verificación**: La Knowledge Base se creó exitosamente y aparece en la lista de Knowledge Bases de Amazon Bedrock con el nombre que incluye `{nombre-participante}`.

---

### Paso 6: Configurar Data Source

1. Dentro de la Knowledge Base recién creada, localice la sección **Data source**.
2. Haga clic en el Data Source de S3 para configurarlo (o haga clic en **Add data source** si no se configuró durante la creación).
3. Configure el URI del bucket S3:
   - **S3 URI**: `s3://s3-lab03-knowledge-source-{nombre-participante}/`
4. Verifique que la ruta apunta al bucket correcto donde cargó los documentos geofísicos en el Paso 4.
5. Mantenga la **Chunking strategy** en **Default** (Amazon Bedrock optimizará automáticamente el tamaño de los chunks).
6. Guarde la configuración del Data Source.

**✓ Verificación**: El Data Source muestra el URI `s3://s3-lab03-knowledge-source-{nombre-participante}/` y está correctamente asociado a la Knowledge Base.

---

### Paso 7: Sincronización

En este paso iniciará el proceso de sincronización que lee los documentos de S3, los divide en chunks, genera embeddings y puebla el índice vectorial. Para comprender el flujo completo de ingestión, consulte la sección [Arquitectura de RAG Paso a Paso](CONCEPTOS-RAG.md#2-arquitectura-de-rag-paso-a-paso) del documento de conceptos.

1. Dentro de la Knowledge Base, localice el Data Source configurado en el paso anterior.
2. Seleccione el Data Source y haga clic en el botón **Sync**.
3. El proceso de sincronización ejecutará las siguientes operaciones automáticamente:
   - **Lectura**: Amazon Bedrock lee los 3 documentos Markdown del bucket S3
   - **Chunking**: Los documentos se dividen en fragmentos de texto (chunks) optimizados
   - **Embeddings**: Cada chunk se transforma en un vector numérico usando Amazon Titan Text Embeddings v2
   - **Indexación**: Los vectores se almacenan en el índice de Amazon OpenSearch Serverless

⏱️ **Nota**: El proceso de sincronización puede tardar varios minutos dependiendo del volumen de documentos. Espere a que el estado del Data Source cambie a **Available** antes de continuar con el siguiente paso. No cancele ni reinicie el proceso.

**✓ Verificación**: El estado del Data Source muestra **Available** y el resumen de sincronización indica que los 3 documentos fueron procesados exitosamente.

---

### Paso 8: Seleccionar Modelo de Generación

1. Dentro de la Knowledge Base, localice la ventana de prueba (Test window) en el panel derecho de la consola.
2. Si la ventana de prueba no está visible, haga clic en **Test knowledge base** o en el botón de prueba disponible en la interfaz.
3. En la sección **Select model** de la ventana de prueba, haga clic en el selector de modelo.
4. Seleccione un modelo de la familia **Anthropic Claude** disponible en Amazon Bedrock como modelo de generación para las consultas RAG.
5. Confirme la selección del modelo.

**✓ Verificación**: El modelo Anthropic Claude está seleccionado en la ventana de prueba de la Knowledge Base y la interfaz está lista para recibir consultas RAG.

---

### Paso 9: Consultas RAG

En este paso probará la Knowledge Base con consultas geofísicas para verificar que el RAG recupera información relevante de los documentos indexados. Copie los prompts del archivo [`prompts-rag.md`](prompts-rag.md) proporcionado en esta carpeta del laboratorio.

#### Consulta 1 — Datos sísmicos específicos

1. En la ventana de prueba de la Knowledge Base, copie y pegue el siguiente prompt del archivo [`prompts-rag.md`](prompts-rag.md) (Prompt 1):

   ```
   ¿Cuáles fueron los eventos sísmicos más significativos registrados y cuáles fueron sus magnitudes, profundidades y ubicaciones?
   ```

2. Envíe la consulta y observe la respuesta generada.
3. Verifique que la respuesta contiene datos concretos extraídos del documento `reporte-actividad-sismica.md` (magnitudes, profundidades, coordenadas).

**✓ Verificación**: La respuesta incluye datos sísmicos específicos recuperados de los documentos indexados, no información genérica del modelo.

#### Consulta 2 — Síntesis de múltiples documentos

1. Copie y pegue el siguiente prompt del archivo [`prompts-rag.md`](prompts-rag.md) (Prompt 2):

   ```
   ¿Cómo se relacionan los procedimientos de monitoreo sísmico del IGP con la detección y análisis de los eventos sísmicos recientes documentados?
   ```

2. Envíe la consulta y observe la respuesta generada.
3. Verifique que la respuesta integra información tanto del reporte de actividad sísmica como de los procedimientos de monitoreo.

**✓ Verificación**: La respuesta combina información de múltiples documentos, demostrando la capacidad de RAG para sintetizar datos de diferentes fuentes.

#### Consulta 3 — Terminología geofísica

1. Copie y pegue el siguiente prompt del archivo [`prompts-rag.md`](prompts-rag.md) (Prompt 3):

   ```
   Explica qué es la zona de Wadati-Benioff y cuál es su relevancia para la sismicidad en el Perú.
   ```

2. Envíe la consulta y observe la respuesta generada.
3. Verifique que la respuesta recupera definiciones del glosario técnico de geofísica.

**✓ Verificación**: La respuesta incluye definiciones técnicas recuperadas del glosario geofísico indexado en la Knowledge Base.

#### Consulta 4 — Fuera de dominio

1. Copie y pegue el siguiente prompt del archivo [`prompts-rag.md`](prompts-rag.md) (Prompt 5):

   ```
   ¿Cuáles son las principales erupciones volcánicas registradas en el Perú durante los últimos 10 años y qué impacto tuvieron en las comunidades cercanas?
   ```

2. Envíe la consulta y observe la respuesta generada.
3. Verifique que el modelo indica que no encontró información relevante en los documentos indexados, en lugar de inventar una respuesta.

**✓ Verificación**: El modelo reconoce que la información sobre erupciones volcánicas no está contenida en los documentos de la Knowledge Base, demostrando que RAG reduce las alucinaciones al limitar las respuestas a datos verificados.

---

### Paso 10: Verificar Citas

Después de ejecutar las consultas RAG en el paso anterior, verifique que las respuestas incluyen citas (references/footnotes) que referencian los documentos originales.

1. Revise las respuestas generadas en las Consultas 1, 2 y 3 del Paso 9.
2. Para cada respuesta, localice las **citas** o **referencias** que aparecen al final o como notas al pie:
   - Cada cita debe incluir el nombre del archivo de origen en S3 (ej. `reporte-actividad-sismica.md`, `procedimientos-monitoreo-sismico.md`, `glosario-geofisica-sismologia.md`)
   - Las citas permiten al usuario verificar la fuente de cada afirmación en la respuesta
3. Haga clic en una cita para expandir el fragmento (chunk) de texto original que fue recuperado del documento.
4. Compare el fragmento citado con la respuesta generada para confirmar que el modelo utilizó la información del documento como base para su respuesta.

**✓ Verificación**: Las respuestas RAG de las Consultas 1, 2 y 3 incluyen citas con el nombre del archivo de origen en S3, y al expandir las citas se puede ver el fragmento de texto original recuperado del documento.

---

> ⚠️ **Importante**: Conserve todos los recursos creados en este laboratorio (Knowledge Base, bucket S3, vector store). Los utilizaremos en el **[Lab 04 — Guardrails con Amazon Bedrock](../lab-04-bedrock-guardrails/README.md)**.

---

## Solución de Problemas

Si la creación de la Knowledge Base o la sincronización falla, siga estos pasos de diagnóstico:

1. **Verificar permisos del rol IAM**:
   - Regrese al Paso 2 y confirme que el Service-Linked Role de Amazon Bedrock tiene la entidad de confianza `bedrock.amazonaws.com`
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
