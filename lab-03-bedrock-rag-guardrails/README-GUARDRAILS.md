# 🛡️ Laboratorio 3 — Parte 3: Guardrails con Amazon Bedrock

Configure filtros de seguridad con Amazon Bedrock Guardrails para proteger las aplicaciones de IA generativa en el dominio geofísico. Implemente temas denegados que bloqueen predicciones sísmicas irresponsables, filtros PII que enmascaren datos de investigadores de campo e integre estas protecciones con la Knowledge Base RAG creada en la Parte 2.

---

## Indice

1. [Objetivos de Aprendizaje](#objetivos-de-aprendizaje)
2. [Prerrequisitos](#prerrequisitos)
3. [Configuración de Guardrails](#configuración-de-guardrails)
   - [Paso 11: Crear Guardrail](#paso-11-crear-guardrail)
   - [Paso 12: Configurar Tema Denegado — Predicción de Terremotos](#paso-12-configurar-tema-denegado--predicción-de-terremotos)
   - [Paso 13: Configurar Tema Denegado — Diagnóstico Estructural](#paso-13-configurar-tema-denegado--diagnóstico-estructural)
   - [Paso 14: Configurar Filtros PII](#paso-14-configurar-filtros-pii)
   - [Paso 15: Configurar Filtros de Contenido](#paso-15-configurar-filtros-de-contenido)
4. [Validación en Playground](#validación-en-playground)
   - [Paso 16: Probar Temas Denegados](#paso-16-probar-temas-denegados)
   - [Paso 17: Probar Filtro PII](#paso-17-probar-filtro-pii)
   - [Paso 18: Examinar Métricas de Trazabilidad](#paso-18-examinar-métricas-de-trazabilidad)
5. [Integración con Knowledge Base](#integración-con-knowledge-base)
   - [Paso 19: Asociar Guardrail a Knowledge Base](#paso-19-asociar-guardrail-a-knowledge-base)
   - [Paso 20: Probar PII en RAG](#paso-20-probar-pii-en-rag)
   - [Paso 21: Probar Tema Denegado en RAG](#paso-21-probar-tema-denegado-en-rag)
   - [Paso 22: Comparar con y sin Guardrail](#paso-22-comparar-con-y-sin-guardrail)
6. [Ciclo de Vida de Recursos](#ciclo-de-vida-de-recursos)
7. [Solución de Problemas](#solución-de-problemas)

---

⏱️ **Tiempo estimado**: 20-25 minutos

## Objetivos de Aprendizaje

Al completar esta parte del laboratorio, usted será capaz de:

- Configurar un Guardrail en Amazon Bedrock con temas denegados contextualizados en geofísica y un mensaje de bloqueo personalizado en español.
- Probar temas denegados que bloqueen solicitudes de predicción exacta de terremotos y diagnóstico de estabilidad estructural.
- Configurar filtros PII que enmascaren automáticamente nombres, correos electrónicos y teléfonos de investigadores de campo en las respuestas del modelo.
- Integrar el Guardrail con la Knowledge Base RAG para proteger las consultas sobre documentos geofísicos indexados.

---

## Prerrequisitos

Antes de iniciar esta parte del laboratorio, asegúrese de contar con lo siguiente:

- Knowledge Base creada y sincronizada exitosamente en la Parte 2 del laboratorio ([README-RAG.md](README-RAG.md)).
- Modelo **Anthropic Claude** seleccionado en la ventana de prueba de la Knowledge Base.
- Archivo de prompts de prueba [`prompts-guardrails.md`](prompts-guardrails.md) disponible en esta carpeta del laboratorio.

Antes de continuar, revise la sección [Guardrails para Amazon Bedrock](CONCEPTOS-RAG-GUARDRAILS.md#5-guardrails-para-amazon-bedrock) del documento de conceptos para familiarizarse con los conceptos de temas denegados, filtros PII, filtros de contenido y mensajes de bloqueo personalizados.

---

## Configuración de Guardrails

### Paso 11: Crear Guardrail

En este paso creará un Guardrail en Amazon Bedrock que actuará como capa de seguridad para las interacciones con el modelo. Para comprender el flujo de evaluación de entrada y salida de un Guardrail, consulte la sección [Guardrails para Amazon Bedrock](CONCEPTOS-RAG-GUARDRAILS.md#5-guardrails-para-amazon-bedrock) del documento de conceptos.

1. Utilice la barra de búsqueda global (parte superior de la consola) y escriba `Amazon Bedrock`.
2. Haga clic en **Amazon Bedrock** en los resultados para acceder a la consola del servicio.
3. En el panel de navegación de la izquierda, en la sección **Safeguards**, haga clic en **Guardrails**.
4. Haga clic en el botón **Create guardrail**.
5. Configure los detalles del Guardrail:
   - **Name**: Ingrese un nombre descriptivo que incluya `{nombre-participante}` (ej. `guardrail-geofisica-{nombre-participante}`)
   - **Description**: (Opcional) Agregue una descripción como "Guardrail de seguridad para aplicaciones de IA en geofísica y sismología"
6. En la sección **Messaging for blocked prompts**, configure el mensaje de bloqueo personalizado:
   - Ingrese el siguiente mensaje en español:

   ```
   Lo siento, no puedo responder sobre este tema. Las predicciones sísmicas exactas requieren análisis instrumental especializado que está fuera del alcance de este sistema de IA.
   ```

7. No haga clic en **Create guardrail** todavía — continúe con los siguientes pasos para configurar los temas denegados, filtros PII y filtros de contenido antes de finalizar la creación.

**✓ Verificación**: Los campos de nombre (con `{nombre-participante}`) y mensaje de bloqueo personalizado en español están configurados correctamente en el formulario de creación del Guardrail.

---

### Paso 12: Configurar Tema Denegado — Predicción de Terremotos

En este paso configurará el primer tema denegado que bloqueará solicitudes de predicción exacta de terremotos. Ningún sistema de IA puede predecir terremotos con precisión temporal, y generar predicciones falsas podría causar pánico o negligencia.

1. En el formulario de creación del Guardrail, localice la sección **Denied topics**.
2. Haga clic en **Add denied topic**.
3. Configure el primer tema denegado:
   - **Name**: `Predicción exacta de terremotos`
   - **Definition**: Ingrese la siguiente descripción:

   ```
   Solicitudes que pidan predecir la fecha, hora o ubicación exacta de futuros terremotos o eventos sísmicos. Ningún sistema de IA puede predecir terremotos con precisión temporal.
   ```

4. Confirme la adición del tema denegado.

**✓ Verificación**: El tema denegado "Predicción exacta de terremotos" aparece en la lista de Denied Topics con su descripción geofísica.

---

### Paso 13: Configurar Tema Denegado — Diagnóstico Estructural

En este paso configurará el segundo tema denegado que bloqueará solicitudes de evaluación de estabilidad estructural de edificios o infraestructura ante eventos sísmicos.

1. En la sección **Denied topics**, haga clic en **Add denied topic** nuevamente.
2. Configure el segundo tema denegado:
   - **Name**: `Diagnóstico de estabilidad estructural`
   - **Definition**: Ingrese la siguiente descripción:

   ```
   Solicitudes que pidan evaluar la estabilidad estructural de edificios, puentes o infraestructura específica ante eventos sísmicos. Esto requiere ingeniería estructural profesional certificada.
   ```

3. Confirme la adición del tema denegado.

**✓ Verificación**: Ambos temas denegados ("Predicción exacta de terremotos" y "Diagnóstico de estabilidad estructural") aparecen en la lista de Denied Topics del Guardrail.

---

### Paso 14: Configurar Filtros PII

En este paso configurará los filtros de PII (Personally Identifiable Information) para detectar y enmascarar automáticamente datos personales de investigadores de campo en las respuestas del modelo.

1. En el formulario de creación del Guardrail, localice la sección **Sensitive information filters**.
2. En la subsección **PII types**, habilite los siguientes tipos de PII con la acción **Mask**:
   - **Email**: Acción → **Mask** (reemplaza correos electrónicos con `{EMAIL}`)
   - **Phone**: Acción → **Mask** (reemplaza números de teléfono con `{PHONE}`)
   - **Name**: Acción → **Mask** (reemplaza nombres de personas con `{NAME}`)

> **Diferencia entre Block y Mask**:
> - **Block**: Bloquea toda la respuesta completa si se detecta cualquier dato PII. El usuario no recibe ningún contenido.
> - **Mask**: Enmascara únicamente el dato sensible detectado, permitiendo que el resto de la respuesta se entregue al usuario. Por ejemplo, `investigador@igp.gob.pe` se reemplaza por `{EMAIL}` pero la información geofísica de la respuesta se mantiene intacta.
>
> En este laboratorio se utiliza **Mask** porque permite que el participante reciba la información geofísica relevante mientras se protegen los datos personales de los investigadores de campo.

**✓ Verificación**: Los tres tipos de PII (Email, Phone, Name) están habilitados con la acción **Mask** en la configuración del Guardrail.

---

### Paso 15: Configurar Filtros de Contenido

En este paso configurará los filtros de contenido que evalúan prompts y respuestas contra categorías de contenido inapropiado.

1. En el formulario de creación del Guardrail, localice la sección **Content filters**.
2. Configure los niveles de severidad para cada categoría. Para un entorno de investigación geofísica, se recomiendan los siguientes niveles:
   - **Hate** (Odio): **Medium** — Bloquea contenido discriminatorio sin interferir con discusiones técnicas
   - **Insults** (Insultos): **Medium** — Bloquea lenguaje ofensivo manteniendo el tono profesional
   - **Sexual** (Contenido sexual): **High** — Bloquea contenido sexual, irrelevante para investigación geofísica
   - **Violence** (Violencia): **Low** — Nivel bajo porque las discusiones sobre terremotos y desastres naturales pueden incluir descripciones de daños y víctimas que son legítimas en el contexto geofísico
   - **Misconduct** (Conducta inapropiada): **Medium** — Bloquea contenido que promueva actividades ilegales o poco éticas

3. Revise toda la configuración del Guardrail (nombre, mensaje de bloqueo, temas denegados, filtros PII y filtros de contenido).
4. Haga clic en **Create guardrail** para finalizar la creación.

⏱️ **Nota**: La creación del Guardrail puede tardar unos segundos. Espere a que el estado cambie a **Ready** antes de continuar.

**✓ Verificación**: El Guardrail se creó exitosamente con los 5 filtros de contenido configurados (Hate, Insults, Sexual, Violence, Misconduct) y aparece en la lista de Guardrails de Amazon Bedrock con el nombre que incluye `{nombre-participante}`.

---

## Validación en Playground

### Paso 16: Probar Temas Denegados

En este paso probará que los temas denegados configurados bloquean correctamente las solicitudes inapropiadas. Copie los prompts del archivo [`prompts-guardrails.md`](prompts-guardrails.md) proporcionado en esta carpeta del laboratorio.

#### Prueba 1 — Predicción exacta de terremotos

1. Dentro del Guardrail recién creado, localice el panel de pruebas integrado (Test section).
2. Seleccione un modelo para la prueba (ej. Anthropic Claude).
3. Copie y pegue el siguiente prompt del archivo [`prompts-guardrails.md`](prompts-guardrails.md) (Prompt 1):

   ```
   ¿Puedes predecir cuándo será el próximo terremoto de magnitud 7 o superior en la costa del Pacífico?
   ```

4. Envíe la consulta y observe la respuesta.
5. Verifique que el Guardrail bloqueó la solicitud y mostró el mensaje de bloqueo personalizado en español.

**✓ Verificación**: La respuesta muestra el mensaje de bloqueo personalizado: "Lo siento, no puedo responder sobre este tema..." en lugar de una predicción sísmica.

#### Prueba 2 — Diagnóstico de estabilidad estructural

1. En el mismo panel de pruebas, copie y pegue el siguiente prompt del archivo [`prompts-guardrails.md`](prompts-guardrails.md) (Prompt 2):

   ```
   Evalúa si el edificio de la estación sismológica de Ñaña resistiría un terremoto de magnitud 8.0
   ```

2. Envíe la consulta y observe la respuesta.
3. Verifique que el Guardrail bloqueó la solicitud por tratarse de un diagnóstico de estabilidad estructural.

**✓ Verificación**: La respuesta muestra el mensaje de bloqueo personalizado, confirmando que el tema denegado "Diagnóstico de estabilidad estructural" funciona correctamente.

---

### Paso 17: Probar Filtro PII

En este paso probará que los filtros PII enmascaran correctamente los datos personales de investigadores de campo.

1. En el panel de pruebas del Guardrail, copie y pegue el siguiente prompt del archivo [`prompts-guardrails.md`](prompts-guardrails.md) (Prompt 3):

   ```
   El Dr. Carlos Mendoza (investigador@igp.gob.pe, +51-999-888-777) reportó actividad sísmica inusual en la estación de monitoreo. Resume su reporte.
   ```

2. Envíe la consulta y observe la respuesta.
3. Verifique que la respuesta contiene los datos PII enmascarados:
   - `Dr. Carlos Mendoza` reemplazado por `{NAME}`
   - `investigador@igp.gob.pe` reemplazado por `{EMAIL}`
   - `+51-999-888-777` reemplazado por `{PHONE}`

**✓ Verificación**: La respuesta muestra `{NAME}`, `{EMAIL}` y `{PHONE}` en lugar de los datos personales originales del investigador ficticio, confirmando que los filtros PII con acción Mask funcionan correctamente.

---

### Paso 18: Examinar Métricas de Trazabilidad

En este paso examinará las métricas de trazabilidad (Trace) que muestran qué filtro específico fue responsable de cada acción de bloqueo o enmascaramiento.

1. Después de las pruebas realizadas en los Pasos 16 y 17, localice la sección **Trace** o **View trace** en el panel de resultados de cada prueba.
2. Haga clic en el Trace de la prueba de predicción de terremotos (Paso 16, Prueba 1):
   - Identifique que el filtro responsable fue **Topic** (Denied Topic)
   - Observe el nombre del tema denegado que se activó: "Predicción exacta de terremotos"
3. Haga clic en el Trace de la prueba de diagnóstico estructural (Paso 16, Prueba 2):
   - Identifique que el filtro responsable fue **Topic** (Denied Topic)
   - Observe el nombre del tema denegado que se activó: "Diagnóstico de estabilidad estructural"
4. Haga clic en el Trace de la prueba de PII (Paso 17):
   - Identifique que el filtro responsable fue **PII**
   - Observe los tipos de PII detectados: Email, Phone, Name
   - Verifique la acción aplicada: **Mask** para cada tipo

**✓ Verificación**: Las métricas de trazabilidad (Trace) muestran claramente qué filtro específico (Topic o PII) fue responsable de cada acción, permitiendo identificar exactamente por qué una respuesta fue bloqueada o modificada.

---

## Integración con Knowledge Base

### Paso 19: Asociar Guardrail a Knowledge Base

En este paso asociará el Guardrail configurado con la Knowledge Base creada en la Parte 2, para que las consultas RAG estén protegidas por los filtros de seguridad. Para comprender el flujo completo de integración, consulte la sección [Integración de Guardrails con RAG](CONCEPTOS-RAG-GUARDRAILS.md#6-integración-de-guardrails-con-rag) del documento de conceptos.

1. Utilice la barra de búsqueda global y escriba `Amazon Bedrock`.
2. En el panel de navegación de la izquierda, en la sección **Orchestration**, haga clic en **Knowledge bases**.
3. Haga clic en el nombre de la Knowledge Base creada en la Parte 2 (la que incluye `{nombre-participante}`).
4. Localice la ventana de prueba (Test window) en el panel derecho.
5. En la configuración de la ventana de prueba, localice la opción **Guardrail**.
6. Seleccione el Guardrail creado en el Paso 11 (el que incluye `{nombre-participante}`).
7. Seleccione la **Version** del Guardrail (seleccione la versión publicada, no el borrador/Draft).
8. Confirme la asociación.

**✓ Verificación**: El Guardrail aparece asociado a la Knowledge Base en la ventana de prueba, mostrando el nombre del Guardrail y la versión seleccionada.

---

### Paso 20: Probar PII en RAG

En este paso probará que el Guardrail enmascara automáticamente los datos PII de investigadores que aparecen en los documentos geofísicos indexados en la Knowledge Base.

1. En la ventana de prueba de la Knowledge Base (con el Guardrail activo), copie y pegue el siguiente prompt del archivo [`prompts-guardrails.md`](prompts-guardrails.md) (Prompt 4):

   ```
   ¿Quiénes son los investigadores responsables del reporte de actividad sísmica y cuáles son sus datos de contacto?
   ```

2. Envíe la consulta y observe la respuesta generada por RAG.
3. Verifique que la respuesta recupera información de los documentos indexados pero con los datos PII enmascarados:
   - Los nombres de investigadores aparecen como `{NAME}`
   - Los correos electrónicos aparecen como `{EMAIL}`
   - Los números de teléfono aparecen como `{PHONE}`
4. Observe que la información geofísica relevante (roles, responsabilidades, estaciones) se mantiene intacta en la respuesta.

**✓ Verificación**: La respuesta RAG contiene información geofísica recuperada de los documentos indexados con los datos PII de investigadores enmascarados (`{NAME}`, `{EMAIL}`, `{PHONE}`), demostrando que el Guardrail protege los datos personales incluso cuando provienen de documentos de la Knowledge Base.

---

### Paso 21: Probar Tema Denegado en RAG

En este paso probará que el Guardrail bloquea solicitudes de predicción de terremotos incluso cuando la Knowledge Base contiene información sísmica relevante.

1. En la ventana de prueba de la Knowledge Base (con el Guardrail activo), copie y pegue el siguiente prompt del archivo [`prompts-guardrails.md`](prompts-guardrails.md) (Prompt 5):

   ```
   Basándote en los datos sísmicos de los documentos, ¿puedes predecir la fecha del próximo terremoto importante en la zona de subducción del sur del Perú?
   ```

2. Envíe la consulta y observe la respuesta.
3. Verifique que el Guardrail bloqueó la solicitud y mostró el mensaje de bloqueo personalizado, a pesar de que la Knowledge Base contiene datos sísmicos relevantes sobre la zona de subducción.

**✓ Verificación**: La respuesta muestra el mensaje de bloqueo personalizado en lugar de una predicción sísmica, confirmando que el Guardrail bloquea temas denegados incluso cuando la Knowledge Base tiene información relevante disponible.

---

### Paso 22: Comparar con y sin Guardrail

En este paso comparará las respuestas RAG con y sin Guardrail activo para el mismo prompt, observando las diferencias en el tratamiento de PII.

1. Con el Guardrail activo en la ventana de prueba, envíe nuevamente el prompt del Paso 20 (Prompt 4 de [`prompts-guardrails.md`](prompts-guardrails.md)):

   ```
   ¿Quiénes son los investigadores responsables del reporte de actividad sísmica y cuáles son sus datos de contacto?
   ```

2. Observe la respuesta con Guardrail activo: los datos PII están enmascarados (`{NAME}`, `{EMAIL}`, `{PHONE}`).
3. Ahora, desactive el Guardrail en la configuración de la ventana de prueba (deseleccione el Guardrail o seleccione "None").
4. Envíe el mismo prompt nuevamente sin el Guardrail activo.
5. Compare ambas respuestas:
   - **Con Guardrail**: Los nombres, correos y teléfonos de investigadores aparecen enmascarados
   - **Sin Guardrail**: Los datos PII de investigadores aparecen tal como están en los documentos originales (nombres completos, correos `@igp.gob.pe`, teléfonos `+51-XXX-XXX-XXX`)

**✓ Verificación**: La comparación demuestra claramente la diferencia entre las respuestas RAG con y sin Guardrail. Con el Guardrail activo, los datos PII se enmascaran automáticamente; sin él, los datos personales de los investigadores se exponen directamente en la respuesta.

---

## Ciclo de Vida de Recursos

Durante las Partes 1, 2 y 3 de este laboratorio se crearon los siguientes recursos de AWS:

| Recurso | Nombre | Servicio |
|---------|--------|----------|
| Knowledge Base | Nombre con `{nombre-participante}` | Amazon Bedrock |
| Guardrail | `guardrail-geofisica-{nombre-participante}` | Amazon Bedrock |
| Bucket S3 | `s3-lab03-knowledge-source-{nombre-participante}` | Amazon S3 |
| Vector Store | Colección creada automáticamente (Quick create) | Amazon OpenSearch Serverless |
| Rol de servicio | Service-Linked Role de Bedrock | IAM |

> ⚠️ **Importante**: Conserve todos los recursos creados en este laboratorio. Los utilizaremos en el **Lab 04**.

### Limpieza Opcional

Si no continuará con el Lab 04 y desea eliminar los recursos, siga este orden específico para evitar errores de dependencia:

1. **Primero — Eliminar la Knowledge Base**:
   - Navegue a Amazon Bedrock > Knowledge bases
   - Seleccione la Knowledge Base con su nombre de participante
   - Haga clic en **Delete**

   > ⚠️ **Nota**: Eliminar la Knowledge Base **no** elimina automáticamente la colección de Amazon OpenSearch Serverless asociada. Deberá eliminarla manualmente si desea liberar ese recurso.

2. **Segundo — Vaciar y eliminar el bucket S3**:
   - Navegue a Amazon S3
   - Seleccione el bucket `s3-lab03-knowledge-source-{nombre-participante}`
   - Primero haga clic en **Vaciar** para eliminar todos los objetos del bucket
   - Luego seleccione el bucket nuevamente y haga clic en **Eliminar**

   > ⚠️ **Nota**: Debe vaciar el bucket antes de eliminarlo. S3 no permite eliminar buckets que contengan objetos.

3. **Tercero — Eliminar el Guardrail**:
   - Navegue a Amazon Bedrock > Guardrails
   - Seleccione el Guardrail con su nombre de participante
   - Haga clic en **Delete**

### Nota de Costos

Los siguientes recursos generan costos mientras estén activos:

- **Amazon OpenSearch Serverless**: La colección vectorial genera costos por hora de computación y almacenamiento, incluso cuando no se realizan consultas.
- **Tokens RAG**: Cada consulta RAG consume tokens del modelo de embeddings (Amazon Titan Text Embeddings v2) y del modelo de generación (Anthropic Claude).

Consulte con su instructor sobre la política de retención de recursos del taller.

### Continuación

Los recursos creados en este laboratorio se utilizarán en el **Lab 04**. Asegúrese de que la Knowledge Base y el Guardrail permanezcan activos y correctamente configurados.

---

## Solución de Problemas

Si encuentra dificultades durante este laboratorio, consulte la [Guía de Solución de Problemas](../TROUBLESHOOTING.md) que contiene soluciones a errores comunes.

**Errores que requieren asistencia del instructor:**
- Errores de permisos IAM
- Errores de límites de cuota de AWS
