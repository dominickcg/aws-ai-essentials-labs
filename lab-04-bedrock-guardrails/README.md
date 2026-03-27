# 🛡️ Laboratorio 4 — Guardrails con Amazon Bedrock

Configure filtros de seguridad con Amazon Bedrock Guardrails para proteger las aplicaciones de IA generativa en el dominio geofísico. Implemente temas denegados que bloqueen predicciones sísmicas irresponsables, filtros PII que enmascaren datos de investigadores de campo e integre estas protecciones con la Knowledge Base RAG creada en el [Lab 03 — RAG con Amazon Bedrock Knowledge Bases](../lab-03-bedrock-rag/README.md).

---

## Indice

1. [Objetivos de Aprendizaje](#objetivos-de-aprendizaje)
2. [Prerrequisitos](#prerrequisitos)
3. [Configuración de Guardrails](#configuración-de-guardrails)
   - [Paso 1: Verificación de Región AWS](#paso-1-verificación-de-región-aws)
   - [Paso 2: Crear Guardrail](#paso-2-crear-guardrail)
   - [Paso 3: Configurar Tema Denegado — Predicción de Terremotos](#paso-3-configurar-tema-denegado--predicción-de-terremotos)
   - [Paso 4: Configurar Tema Denegado — Diagnóstico Estructural](#paso-4-configurar-tema-denegado--diagnóstico-estructural)
   - [Paso 5: Configurar Filtros PII](#paso-5-configurar-filtros-pii)
   - [Paso 6: Configurar Filtros de Contenido](#paso-6-configurar-filtros-de-contenido)
4. [Validación en Playground](#validación-en-playground)
   - [Paso 7: Probar Temas Denegados](#paso-7-probar-temas-denegados)
   - [Paso 8: Probar Filtro PII](#paso-8-probar-filtro-pii)
   - [Paso 9: Examinar Métricas de Trazabilidad](#paso-9-examinar-métricas-de-trazabilidad)
5. [Integración con Knowledge Base](#integración-con-knowledge-base)
   - [Paso 10: Asociar Guardrail a Knowledge Base](#paso-10-asociar-guardrail-a-knowledge-base)
   - [Paso 11: Probar PII en RAG](#paso-11-probar-pii-en-rag)
   - [Paso 12: Probar Tema Denegado en RAG](#paso-12-probar-tema-denegado-en-rag)
   - [Paso 13: Comparar con y sin Guardrail](#paso-13-comparar-con-y-sin-guardrail)
6. [Ciclo de Vida de Recursos](#ciclo-de-vida-de-recursos)
7. [Solución de Problemas](#solución-de-problemas)

---

⏱️ **Tiempo estimado**: 20-25 minutos

## Objetivos de Aprendizaje

Al completar este laboratorio, usted será capaz de:

- Crear y configurar un Guardrail en Amazon Bedrock con temas denegados, filtros PII y filtros de contenido para proteger aplicaciones de IA generativa en el dominio geofísico.
- Probar las políticas de seguridad del Guardrail en el Playground de Amazon Bedrock, verificando el bloqueo de temas denegados y el enmascaramiento de PII.
- Integrar el Guardrail con la Knowledge Base RAG creada en el Lab 03 para proteger las respuestas generadas a partir de documentos geofísicos indexados.
- Examinar las métricas de trazabilidad (Trace) para comprender qué filtro actuó sobre cada consulta y respuesta.

---

## Prerrequisitos

Antes de iniciar este laboratorio, asegúrese de contar con lo siguiente:

- Knowledge Base creada y sincronizada exitosamente en el [Lab 03 — RAG con Amazon Bedrock Knowledge Bases](../lab-03-bedrock-rag/README.md).
- Recursos del Lab 03 activos:
  - **Knowledge Base** sincronizada con documentos geofísicos
  - **Modelo Anthropic Claude** habilitado en Amazon Bedrock
  - **Bucket S3** (`s3-lab03-knowledge-source-{nombre-participante}`) con los documentos geofísicos cargados
- Archivo de prompts de prueba [`prompts-guardrails.md`](prompts-guardrails.md) disponible en esta carpeta del laboratorio.

Antes de comenzar, revise la [Guía de Conceptos Fundamentales de Guardrails](CONCEPTOS-GUARDRAILS.md) para familiarizarse con los conceptos de Guardrails, temas denegados, filtros PII, filtros de contenido y su integración con RAG que se utilizarán durante el laboratorio.

---

## Configuración de Guardrails

### Paso 1: Verificación de Región AWS

1. Verifique que está trabajando en la región correcta:
   - En la esquina superior derecha de la consola de AWS, observe el nombre de la región
   - Confirme que dice la región estipulada por el instructor
   - Si no es correcta, haga clic en el nombre de la región y seleccione la región indicada

**✓ Verificación**: La esquina superior derecha de la consola muestra la región correcta indicada por el instructor.

---

### Paso 2: Crear Guardrail

En este paso creará un Guardrail en Amazon Bedrock que servirá como capa de seguridad para las aplicaciones de IA generativa. Para comprender el concepto y la arquitectura de Guardrails, consulte la sección [Guardrails para Amazon Bedrock](CONCEPTOS-GUARDRAILS.md#1-guardrails-para-amazon-bedrock) del documento de conceptos.

1. Utilice la barra de búsqueda global (parte superior de la consola) y escriba `Amazon Bedrock`.
2. Haga clic en **Amazon Bedrock** en los resultados para acceder a la consola del servicio.
3. En el panel de navegación de la izquierda, en la sección **Safeguards**, haga clic en **Guardrails**.
4. Haga clic en el botón **Create guardrail**.
5. Configure los detalles del Guardrail:
   - **Name**: `guardrail-geofisica-{nombre-participante}`
   - **Description**: (Opcional) "Guardrail de seguridad para aplicaciones geofísicas"
   - **Blocked messaging**: Ingrese el mensaje personalizado que se mostrará cuando el Guardrail bloquee una respuesta:
     ```
     Lo siento, no puedo responder sobre este tema. Las predicciones sísmicas exactas requieren análisis instrumental especializado que está fuera del alcance de este sistema de IA.
     ```
6. Haga clic en **Next** para continuar con la configuración de filtros.

**✓ Verificación**: El formulario de creación del Guardrail muestra el nombre `guardrail-geofisica-{nombre-participante}` y el mensaje de bloqueo personalizado configurado.

---

### Paso 3: Configurar Tema Denegado — Predicción de Terremotos

En este paso configurará el primer tema denegado que bloqueará cualquier consulta o respuesta relacionada con predicciones exactas de terremotos. Para comprender la justificación de los temas denegados en el contexto geofísico, consulte la sección [Guardrails para Amazon Bedrock](CONCEPTOS-GUARDRAILS.md#1-guardrails-para-amazon-bedrock) del documento de conceptos.

1. En la sección **Denied topics** del formulario de configuración, haga clic en **Add denied topic**.
2. Configure el primer tema denegado:
   - **Name**: `prediccion-terremotos`
   - **Definition**: Escriba una descripción en lenguaje natural que explique qué debe bloquear este tema:
     ```
     Bloquear cualquier consulta o respuesta que solicite o proporcione predicciones exactas sobre cuándo, dónde o con qué magnitud ocurrirá un terremoto futuro. Ningún sistema de IA puede predecir terremotos con precisión temporal y generar predicciones falsas podría causar pánico o negligencia.
     ```
   - **Sample phrases**: Agregue ejemplos de prompts que deben ser bloqueados:
     - `¿Cuándo será el próximo terremoto de magnitud 7 en Lima?`
     - `Predice la fecha del próximo sismo en la costa peruana`
     - `¿Habrá un terremoto esta semana en Arequipa?`
3. Confirme la configuración del tema denegado.

**✓ Verificación**: El tema denegado `prediccion-terremotos` aparece en la lista de temas denegados con su definición y frases de ejemplo.

---

### Paso 4: Configurar Tema Denegado — Diagnóstico Estructural

1. En la sección **Denied topics**, haga clic en **Add denied topic** para agregar un segundo tema.
2. Configure el segundo tema denegado:
   - **Name**: `diagnostico-estructural`
   - **Definition**: Escriba la descripción del tema:
     ```
     Bloquear cualquier consulta o respuesta que solicite o proporcione diagnósticos sobre la estabilidad o resistencia de edificios, puentes u otras estructuras ante sismos. Evaluar la resistencia de estructuras requiere ingeniería estructural profesional certificada y un diagnóstico erróneo de IA podría poner vidas en riesgo.
     ```
   - **Sample phrases**: Agregue ejemplos de prompts que deben ser bloqueados:
     - `¿Resistiría este edificio un terremoto de magnitud 8.0?`
     - `¿Es segura mi casa ante un sismo de gran magnitud?`
     - `Evalúa la estabilidad estructural de este puente ante sismos`
3. Confirme la configuración del tema denegado.
4. Haga clic en **Next** para continuar con los filtros de contenido.

**✓ Verificación**: Ambos temas denegados (`prediccion-terremotos` y `diagnostico-estructural`) aparecen en la lista de temas denegados del Guardrail.

---

### Paso 5: Configurar Filtros PII

En este paso configurará los filtros de PII (Personally Identifiable Information) que protegerán los datos personales de los investigadores de campo contenidos en los documentos geofísicos.

1. En la sección **PII** del formulario de configuración, habilite los filtros de PII.
2. Configure los siguientes tipos de PII con acción **Mask** (enmascarar):
   - **Email**: Acción **Mask** — Reemplaza correos electrónicos por `{EMAIL}`
   - **Phone**: Acción **Mask** — Reemplaza números de teléfono por `{PHONE}`
   - **Name**: Acción **Mask** — Reemplaza nombres de personas por `{NAME}`
3. Verifique que la acción seleccionada para los tres tipos es **Mask** (no **Block**), ya que queremos que la información geofísica relevante se entregue al usuario mientras se protegen los datos personales.
4. Haga clic en **Next** para continuar.

**✓ Verificación**: Los tres filtros PII (Email, Phone, Name) están configurados con acción **Mask** en la lista de filtros del Guardrail.

---

### Paso 6: Configurar Filtros de Contenido

1. En la sección **Content filters** del formulario de configuración, configure los niveles de severidad para cada categoría:
   - **Hate** (Odio): Nivel **Medium**
   - **Insults** (Insultos): Nivel **Medium**
   - **Sexual** (Contenido sexual): Nivel **High**
   - **Violence** (Violencia): Nivel **Medium**
   - **Misconduct** (Conducta inapropiada): Nivel **Medium**
2. Configure los filtros tanto para **Prompts** (entrada) como para **Responses** (salida) con los mismos niveles.
3. Revise la configuración completa del Guardrail (temas denegados, filtros PII, filtros de contenido).
4. Haga clic en **Create guardrail** para finalizar la creación.

**✓ Verificación**: El Guardrail `guardrail-geofisica-{nombre-participante}` se creó exitosamente y aparece en la lista de Guardrails de Amazon Bedrock con estado activo.

---

## Validación en Playground

### Paso 7: Probar Temas Denegados

En este paso probará que los temas denegados configurados bloquean correctamente las consultas sobre predicciones sísmicas y diagnósticos estructurales. Copie los prompts del archivo [`prompts-guardrails.md`](prompts-guardrails.md) proporcionado en esta carpeta del laboratorio.

1. En la consola de Amazon Bedrock, navegue a **Playgrounds** en el panel de navegación de la izquierda.
2. Seleccione **Text playground** (o **Chat playground**).
3. Seleccione un modelo de la familia **Anthropic Claude** como modelo de generación.
4. En la configuración del Playground, asocie el Guardrail `guardrail-geofisica-{nombre-participante}` creado en el Paso 2.
5. Copie y pegue el siguiente prompt del archivo [`prompts-guardrails.md`](prompts-guardrails.md):

   ```
   ¿Cuándo será el próximo terremoto de magnitud 7 en Lima?
   ```

6. Envíe la consulta y observe la respuesta.
7. Verifique que el Guardrail bloqueó la respuesta y muestra el mensaje de bloqueo personalizado configurado en el Paso 2.
8. Pruebe con el segundo tema denegado:

   ```
   ¿Resistiría este edificio un terremoto de magnitud 8.0?
   ```

9. Verifique que esta consulta también es bloqueada por el Guardrail.

**✓ Verificación**: Ambas consultas sobre predicción de terremotos y diagnóstico estructural son bloqueadas por el Guardrail, mostrando el mensaje de bloqueo personalizado en lugar de una respuesta del modelo.

---

### Paso 8: Probar Filtro PII

1. En el mismo Playground con el Guardrail asociado, copie y pegue el siguiente prompt del archivo [`prompts-guardrails.md`](prompts-guardrails.md):

   ```
   ¿Quién supervisó el monitoreo en la estación de Ñaña y cuáles son sus datos de contacto?
   ```

2. Envíe la consulta y observe la respuesta.
3. Verifique que el Guardrail enmascaró los datos personales en la respuesta:
   - Los nombres de personas deben aparecer como `{NAME}`
   - Los correos electrónicos deben aparecer como `{EMAIL}`
   - Los números de teléfono deben aparecer como `{PHONE}`
4. Confirme que el resto de la información geofísica relevante se entregó correctamente (la respuesta no fue bloqueada completamente, solo se enmascararon los datos PII).

**✓ Verificación**: La respuesta contiene la información geofísica solicitada pero con los datos personales enmascarados (`{NAME}`, `{EMAIL}`, `{PHONE}`), demostrando que la acción **Mask** protege PII sin bloquear la respuesta completa.

---

### Paso 9: Examinar Métricas de Trazabilidad

1. Después de las pruebas realizadas en los Pasos 7 y 8, localice la sección de **Trace** en la interfaz del Playground.
2. Examine el Trace de la consulta de predicción de terremotos (Paso 7):
   - Identifique que el filtro **Topic** fue activado
   - Verifique que el tema denegado `prediccion-terremotos` fue el responsable del bloqueo
3. Examine el Trace de la consulta de PII (Paso 8):
   - Identifique que el filtro **PII** fue activado
   - Verifique qué tipos de PII fueron detectados (Email, Phone, Name)
4. Observe cómo el Trace proporciona información detallada sobre cada acción del Guardrail, permitiendo depurar y ajustar las políticas de seguridad.

**✓ Verificación**: El Trace muestra claramente qué filtro del Guardrail actuó en cada consulta: **Topic** para las consultas de temas denegados y **PII** para las consultas con datos personales.

---

## Integración con Knowledge Base

### Paso 10: Asociar Guardrail a Knowledge Base

En este paso integrará el Guardrail con la Knowledge Base RAG creada en el [Lab 03](../lab-03-bedrock-rag/README.md) para proteger las respuestas generadas a partir de documentos geofísicos indexados. Para comprender el flujo completo de integración, consulte la sección [Integración de Guardrails con RAG](CONCEPTOS-GUARDRAILS.md#2-integración-de-guardrails-con-rag) del documento de conceptos.

1. En la consola de Amazon Bedrock, navegue a **Knowledge bases** en el panel de navegación de la izquierda (sección **Orchestration**).
2. Seleccione la Knowledge Base creada en el Lab 03 (`kb-geofisica-{nombre-participante}`).
3. En la ventana de prueba (Test window), localice la configuración de Guardrail.
4. Asocie el Guardrail `guardrail-geofisica-{nombre-participante}` a la Knowledge Base.
5. Seleccione un modelo de la familia **Anthropic Claude** como modelo de generación si no está ya seleccionado.

**✓ Verificación**: La ventana de prueba de la Knowledge Base muestra el Guardrail `guardrail-geofisica-{nombre-participante}` asociado y un modelo Anthropic Claude seleccionado.

---

### Paso 11: Probar PII en RAG

1. En la ventana de prueba de la Knowledge Base con el Guardrail asociado, copie y pegue el siguiente prompt del archivo [`prompts-guardrails.md`](prompts-guardrails.md):

   ```
   ¿Quién supervisó el monitoreo en la estación de Ñaña y cuáles son sus datos de contacto?
   ```

2. Envíe la consulta y observe la respuesta generada por RAG.
3. Verifique que:
   - La Knowledge Base recuperó información relevante de los documentos geofísicos indexados
   - El Guardrail enmascaró automáticamente los datos personales de los investigadores (`{NAME}`, `{EMAIL}`, `{PHONE}`)
   - El resto de la información geofísica se entregó correctamente con citas de las fuentes

**✓ Verificación**: La respuesta RAG contiene información geofísica recuperada de los documentos indexados con los datos personales de investigadores enmascarados por el Guardrail.

---

### Paso 12: Probar Tema Denegado en RAG

1. Copie y pegue el siguiente prompt del archivo [`prompts-guardrails.md`](prompts-guardrails.md):

   ```
   Según los datos de la Knowledge Base, ¿cuándo será el próximo terremoto de magnitud 7 en la costa peruana?
   ```

2. Envíe la consulta y observe la respuesta.
3. Verifique que el Guardrail bloqueó la consulta antes de que la Knowledge Base la procesara, mostrando el mensaje de bloqueo personalizado.
4. Confirme que incluso con la Knowledge Base activa y documentos sísmicos indexados, el Guardrail impide que el sistema genere predicciones de terremotos.

**✓ Verificación**: La consulta sobre predicción de terremotos es bloqueada por el Guardrail incluso cuando la Knowledge Base contiene información sísmica relevante, demostrando que las políticas de seguridad tienen prioridad sobre la generación de respuestas.

---

### Paso 13: Comparar con y sin Guardrail

1. En la ventana de prueba de la Knowledge Base, **desactive** temporalmente el Guardrail.
2. Repita la consulta de PII del Paso 11:

   ```
   ¿Quién supervisó el monitoreo en la estación de Ñaña y cuáles son sus datos de contacto?
   ```

3. Observe que sin el Guardrail, la respuesta incluye los datos personales completos de los investigadores (nombres, correos, teléfonos) sin enmascarar.
4. **Reactive** el Guardrail y repita la misma consulta.
5. Compare ambas respuestas para observar el efecto del enmascaramiento PII.

**✓ Verificación**: La comparación muestra claramente la diferencia: sin Guardrail los datos personales aparecen completos, con Guardrail los datos PII están enmascarados (`{NAME}`, `{EMAIL}`, `{PHONE}`).

---

> ⚠️ **Importante**: Los recursos de Lab 03 y Lab 04 se utilizarán en el **Lab 05**.

---

## Ciclo de Vida de Recursos

### Recursos de este Laboratorio

La siguiente tabla muestra los recursos utilizados en este laboratorio y su origen:

| Recurso | Origen | Acción al finalizar |
|---------|--------|---------------------|
| Guardrail `guardrail-geofisica-{nombre-participante}` | Propio del Lab 04 | Conservar para Lab 05 |
| Knowledge Base `kb-geofisica-{nombre-participante}` | Heredado del Lab 03 | Conservar para Lab 05 |
| Bucket S3 `s3-lab03-knowledge-source-{nombre-participante}` | Heredado del Lab 03 | Conservar para Lab 05 |
| Vector store (OpenSearch Serverless) | Heredado del Lab 03 | Conservar para Lab 05 |

> ⚠️ **Advertencia**: No elimine los recursos heredados del Lab 03 (Knowledge Base, bucket S3, vector store). Eliminarlos afectará el funcionamiento de este Lab 04 y del Lab 05.

### Limpieza Opcional

Si no va a continuar con el Lab 05 y desea eliminar los recursos, siga este orden:

1. **Guardrail** (recurso propio del Lab 04):
   - Navegue a Amazon Bedrock > Guardrails
   - Seleccione `guardrail-geofisica-{nombre-participante}`
   - Haga clic en **Delete**

2. **Knowledge Base** (recurso del Lab 03):
   - Navegue a Amazon Bedrock > Knowledge bases
   - Seleccione `kb-geofisica-{nombre-participante}`
   - Haga clic en **Delete** (esto también eliminará el vector store de OpenSearch Serverless asociado)

3. **Bucket S3** (recurso del Lab 03):
   - Navegue a S3
   - Seleccione el bucket `s3-lab03-knowledge-source-{nombre-participante}`
   - Primero vacíe el bucket, luego elimínelo

> ⚠️ **Importante**: Eliminar los recursos del Lab 03 (Knowledge Base, bucket S3, vector store) afectará tanto este Lab 04 como el Lab 05. Solo realice la limpieza si no continuará con los laboratorios posteriores.

---

## Solución de Problemas

Si el Guardrail no bloquea las consultas esperadas o no enmascara PII correctamente, siga estos pasos de diagnóstico:

1. **Verificar configuración de temas denegados**:
   - Navegue a Amazon Bedrock > Guardrails > `guardrail-geofisica-{nombre-participante}`
   - Confirme que ambos temas denegados (`prediccion-terremotos` y `diagnostico-estructural`) están configurados con sus definiciones y frases de ejemplo

2. **Verificar filtros PII**:
   - En la configuración del Guardrail, confirme que los filtros de Email, Phone y Name están habilitados con acción **Mask**
   - Si los datos PII no se enmascaran, verifique que el Guardrail está correctamente asociado al Playground o a la Knowledge Base

3. **Verificar asociación del Guardrail**:
   - En la ventana de prueba de la Knowledge Base, confirme que el Guardrail `guardrail-geofisica-{nombre-participante}` está seleccionado
   - Si el Guardrail no aparece en la lista, verifique que fue creado en la misma región

4. **Verificar recursos del Lab 03**:
   - Confirme que la Knowledge Base del [Lab 03](../lab-03-bedrock-rag/README.md) está activa y sincronizada
   - Verifique que el bucket S3 contiene los documentos geofísicos

> ⚠️ Si el error persiste después de verificar estos puntos, notifique al instructor de inmediato. No intente solucionar errores de permisos o cuotas por su cuenta.

Si encuentra otras dificultades durante este laboratorio, consulte la [Guía de Solución de Problemas](../TROUBLESHOOTING.md) que contiene soluciones a errores comunes.

**Errores que requieren asistencia del instructor:**
- Errores de permisos IAM
- Errores de límites de cuota de AWS
