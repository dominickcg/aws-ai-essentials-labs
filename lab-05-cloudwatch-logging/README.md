# 📋 Laboratorio 5 — Gobernanza y Auditoría con CloudWatch

Configure Model Invocation Logging en Amazon Bedrock con Amazon CloudWatch como destino de auditoría. Capture, almacene e inspeccione cada solicitud (prompt) y respuesta (completion) generada por los modelos fundacionales, asegurando trazabilidad y cumplimiento normativo en el uso de IA generativa.

---

## Indice

1. [Objetivos de Aprendizaje](#objetivos-de-aprendizaje)
2. [Prerrequisitos](#prerrequisitos)
3. [Configuración de CloudWatch](#configuración-de-cloudwatch)
   - [Paso 1: Verificación de Región AWS](#paso-1-verificación-de-región-aws)
   - [Paso 2: Crear Log Group](#paso-2-crear-log-group)
   - [Paso 3: Configurar Política de Retención](#paso-3-configurar-política-de-retención)
4. [Configuración de Model Invocation Logging](#configuración-de-model-invocation-logging)
   - [Paso 4: Habilitar Logging en Amazon Bedrock](#paso-4-habilitar-logging-en-amazon-bedrock)
   - [Paso 5: Verificar Configuración de Logging](#paso-5-verificar-configuración-de-logging)
5. [Validación de Registros de Auditoría](#validación-de-registros-de-auditoría)
   - [Paso 6: Enviar Prompt de Prueba](#paso-6-enviar-prompt-de-prueba)
   - [Paso 7: Inspeccionar Log Stream en CloudWatch](#paso-7-inspeccionar-log-stream-en-cloudwatch)
   - [Paso 8: Identificar Campos de Auditoría](#paso-8-identificar-campos-de-auditoría)
6. [Ciclo de Vida de Recursos](#ciclo-de-vida-de-recursos)
7. [Solución de Problemas](#solución-de-problemas)

---

⏱️ **Tiempo estimado**: ~20 minutos

## Objetivos de Aprendizaje

Al completar este laboratorio, usted será capaz de:

- Configurar Model Invocation Logging en Amazon Bedrock para capturar automáticamente todas las interacciones con modelos fundacionales en un destino centralizado de auditoría.
- Crear y administrar un CloudWatch Log Group con políticas de retención adecuadas para almacenar registros de invocación de forma eficiente.
- Inspeccionar y validar los registros de auditoría en CloudWatch, identificando campos clave como `accountId`, `modelArn`, `input.inputText` y `output.outputText` para garantizar la gobernanza del uso de IA generativa.

---

## Prerrequisitos

Antes de iniciar este laboratorio, asegúrese de contar con lo siguiente:

- Acceso a la cuenta de AWS proporcionada por el instructor.
- Al menos un modelo habilitado en Amazon Bedrock (por ejemplo, de la familia **Amazon Titan** o **Anthropic Claude**).

> Este laboratorio NO requiere recursos de laboratorios anteriores. Todos los recursos se crean desde cero.

Antes de comenzar, revise la [Guía de Conceptos Fundamentales de Logging y Auditoría](CONCEPTOS-LOGGING.md) para familiarizarse con los conceptos de Model Invocation Logging, CloudWatch Log Groups, políticas de retención, campos de auditoría y casos de uso de gobernanza que se utilizarán durante el laboratorio.

---

## Configuración de CloudWatch

### Paso 1: Verificación de Región AWS

1. Verifique que está trabajando en la región correcta:
   - En la esquina superior derecha de la consola de AWS, observe el nombre de la región
   - Confirme que dice la región estipulada por el instructor
   - Si no es correcta, haga clic en el nombre de la región y seleccione la región indicada

**✓ Verificación**: La esquina superior derecha de la consola muestra la región correcta indicada por el instructor.

---

### Paso 2: Crear Log Group

En este paso creará un CloudWatch Log Group que servirá como destino centralizado para almacenar los registros de invocación de Amazon Bedrock. Para comprender la estructura jerárquica de CloudWatch Logs, consulte la sección [Amazon CloudWatch: Log Groups y Log Streams](CONCEPTOS-LOGGING.md#2-amazon-cloudwatch-log-groups-y-log-streams) del documento de conceptos.

1. Utilice la barra de búsqueda global (parte superior de la consola) y escriba `CloudWatch`.
2. Haga clic en **CloudWatch** en los resultados para acceder a la consola del servicio.
3. En el panel de navegación de la izquierda, haga clic en **Logs** y luego en **Log groups**.
4. Haga clic en el botón **Create log group**.
5. Configure los detalles del Log Group:
   - **Log group name**: `/aws/bedrock/model-invocations`
6. Haga clic en **Create** para finalizar la creación del Log Group.

**✓ Verificación**: El Log Group `/aws/bedrock/model-invocations` aparece en la lista de Log Groups de CloudWatch.

---

### Paso 3: Configurar Política de Retención

En este paso configurará la política de retención del Log Group para que los registros se eliminen automáticamente después de 1 día. Para comprender las opciones de retención y su impacto en costos, consulte la sección [Políticas de Retención de Registros](CONCEPTOS-LOGGING.md#3-políticas-de-retención-de-registros) del documento de conceptos.

1. En la lista de Log Groups, localice `/aws/bedrock/model-invocations`.
2. Haga clic en el nombre del Log Group para acceder a sus detalles.
3. En la pestaña de configuración, localice la opción **Retention setting**.
4. Haga clic en **Edit** junto a la configuración de retención.
5. Seleccione **1 day** como período de retención.
6. Haga clic en **Save** para aplicar la política de retención.

**✓ Verificación**: El Log Group `/aws/bedrock/model-invocations` muestra la retención configurada como **1 day** en la columna de retención de la lista de Log Groups.

---

## Configuración de Model Invocation Logging

### Paso 4: Habilitar Logging en Amazon Bedrock

En este paso habilitará Model Invocation Logging en Amazon Bedrock y lo enlazará con el CloudWatch Log Group creado en el Paso 2. Para comprender qué captura el logging y por qué es necesario, consulte la sección [Model Invocation Logging en Amazon Bedrock](CONCEPTOS-LOGGING.md#1-model-invocation-logging-en-amazon-bedrock) del documento de conceptos.

1. Utilice la barra de búsqueda global (parte superior de la consola) y escriba `Amazon Bedrock`.
2. Haga clic en **Amazon Bedrock** en los resultados para acceder a la consola del servicio.
3. En el panel de navegación de la izquierda, haga clic en **Settings**.
4. Localice la sección **Model invocation logging** y haga clic en **Edit**.
5. Active la opción **Enable model invocation logging**.
6. En la sección **Log destination**, seleccione **CloudWatch Logs** como destino.
7. En **Log group**, seleccione el Log Group `/aws/bedrock/model-invocations` creado en el Paso 2.
8. En la sección **Service role**, configure el rol de servicio que permite a Amazon Bedrock escribir registros en CloudWatch:
   - Seleccione **Create and use a new service role** si no existe un rol previo
   - El rol debe incluir los permisos `logs:CreateLogStream` y `logs:PutLogEvents` sobre el recurso del Log Group
   - Consulte el archivo [`bedrock-logging-policy.json`](bedrock-logging-policy.json) en esta carpeta del laboratorio como referencia de la política IAM requerida
9. Haga clic en **Save** para guardar la configuración de logging.

**✓ Verificación**: La configuración de Model Invocation Logging se guardó exitosamente. La sección de Settings muestra el logging habilitado con el Log Group `/aws/bedrock/model-invocations` como destino.

---

### Paso 5: Verificar Configuración de Logging

1. En la consola de Amazon Bedrock, navegue nuevamente a **Settings** en el panel de navegación de la izquierda.
2. Localice la sección **Model invocation logging**.
3. Confirme que la configuración muestra:
   - **Status**: Habilitado (activo)
   - **Log destination**: CloudWatch Logs
   - **Log group**: `/aws/bedrock/model-invocations`
   - **Service role**: Rol configurado con los permisos necesarios

**✓ Verificación**: La sección de Model Invocation Logging en Settings muestra el estado activo con el Log Group `/aws/bedrock/model-invocations` configurado como destino y el Service Role asignado.

---

## Validación de Registros de Auditoría

### Paso 6: Enviar Prompt de Prueba

En este paso enviará un prompt de prueba a un modelo fundacional a través del Playground de Amazon Bedrock para generar un registro de invocación que pueda ser inspeccionado en CloudWatch.

1. En la consola de Amazon Bedrock, navegue a **Playgrounds** en el panel de navegación de la izquierda.
2. Seleccione **Chat playground** (o **Text playground**).
3. Seleccione un modelo habilitado en su cuenta (por ejemplo, de la familia **Amazon Titan** o **Anthropic Claude**).
4. Escriba el siguiente prompt de prueba:

   ```
   Explica qué es un sismógrafo y cómo funciona en el monitoreo sísmico.
   ```

5. Envíe la consulta y espere la respuesta del modelo.
6. Confirme que el modelo generó una respuesta completa.

**✓ Verificación**: El Playground de Amazon Bedrock muestra la respuesta generada por el modelo al prompt de prueba sobre sismógrafos.

---

### Paso 7: Inspeccionar Log Stream en CloudWatch

⏱️ **Nota**: Los registros de invocación pueden tardar entre 1-2 minutos en aparecer en CloudWatch después de enviar el prompt. Si no ve registros inmediatamente, espere un momento y actualice la página.

1. Utilice la barra de búsqueda global y escriba `CloudWatch`.
2. Haga clic en **CloudWatch** para acceder a la consola del servicio.
3. En el panel de navegación de la izquierda, haga clic en **Logs** y luego en **Log groups**.
4. Busque y haga clic en el Log Group `/aws/bedrock/model-invocations`.
5. En la lista de Log Streams, seleccione el Log Stream más reciente (creado automáticamente por Bedrock).
6. Inspeccione los Log Events disponibles. Cada evento es un objeto JSON que contiene los datos de una invocación.

**✓ Verificación**: El Log Group `/aws/bedrock/model-invocations` contiene al menos un Log Stream con eventos de registro generados por la invocación del Paso 6.

---

### Paso 8: Identificar Campos de Auditoría

En este paso identificará los campos clave de auditoría dentro del registro JSON generado por Model Invocation Logging. Para una descripción detallada de cada campo, consulte la sección [Campos de Auditoría en Registros de Invocación](CONCEPTOS-LOGGING.md#4-campos-de-auditoría-en-registros-de-invocación) del documento de conceptos.

1. En el Log Stream abierto en el paso anterior, haga clic en un Log Event para expandir su contenido JSON.
2. Identifique los siguientes campos de auditoría en el registro:
   - **`accountId`**: Identificador de la cuenta de AWS que realizó la invocación
   - **`modelArn`**: ARN del modelo fundacional utilizado (por ejemplo, `arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-text-express-v1`)
   - **`input.inputText`**: El texto del prompt enviado al modelo ("Explica qué es un sismógrafo...")
   - **`output.outputText`**: La respuesta generada por el modelo
3. Observe también los campos adicionales:
   - **`requestId`**: Identificador único de la solicitud
   - **`timestamp`**: Marca temporal de la invocación
   - **`inputTokenCount`** y **`outputTokenCount`**: Cantidad de tokens procesados

**✓ Verificación**: El registro JSON en CloudWatch contiene los campos de auditoría `accountId`, `modelArn`, `input.inputText` y `output.outputText` con los datos correspondientes a la invocación realizada en el Paso 6.

---

## Ciclo de Vida de Recursos

### Recursos de este Laboratorio

La siguiente tabla muestra los recursos utilizados en este laboratorio:

| Recurso | Origen | Acción al finalizar |
|---------|--------|---------------------|
| Log Group `/aws/bedrock/model-invocations` | Propio del Lab 05 | Eliminar |
| Configuración de Model Invocation Logging | Propio del Lab 05 | Desactivar |
| Service Role de logging | Propio del Lab 05 | Eliminar (opcional) |

> Este es el **último laboratorio** del programa AWS AI Essentials. Todos los recursos creados durante los laboratorios pueden eliminarse al finalizar.

### Limpieza de Recursos del Lab 05

1. **Desactivar Model Invocation Logging**:
   - Navegue a Amazon Bedrock > Settings
   - En la sección **Model invocation logging**, haga clic en **Edit**
   - Desactive la opción de logging
   - Haga clic en **Save**

2. **Eliminar Log Group**:
   - Navegue a CloudWatch > Logs > Log groups
   - Seleccione `/aws/bedrock/model-invocations`
   - Haga clic en **Actions** > **Delete log group(s)**
   - Confirme la eliminación

### Limpieza de Recursos de Laboratorios Anteriores

Al ser el último laboratorio del programa, puede proceder a eliminar todos los recursos creados en laboratorios anteriores. Siga este orden para evitar errores de dependencias:

1. **Recursos del Lab 04** (Guardrails):
   - Navegue a Amazon Bedrock > Guardrails
   - Seleccione `guardrail-geofisica-{nombre-participante}`
   - Haga clic en **Delete**

2. **Recursos del Lab 03** (Knowledge Base y RAG):
   - Navegue a Amazon Bedrock > Knowledge bases
   - Seleccione `kb-geofisica-{nombre-participante}`
   - Haga clic en **Delete** (esto también eliminará el vector store de OpenSearch Serverless asociado)
   - Navegue a S3
   - Seleccione el bucket `s3-lab03-knowledge-source-{nombre-participante}`
   - Primero vacíe el bucket, luego elimínelo

3. **Recursos del Lab 02** (Playgrounds):
   - No se crearon recursos persistentes en este laboratorio

4. **Recursos del Lab 01** (SageMaker Canvas):
   - Navegue a Amazon SageMaker > Canvas
   - Elimine cualquier modelo o dataset creado durante el laboratorio

---

## Solución de Problemas

Si encuentra dificultades durante este laboratorio, siga estos pasos de diagnóstico:

1. **Los registros no aparecen en CloudWatch**:
   - Espere al menos 2 minutos después de enviar el prompt. Los registros pueden tardar en propagarse.
   - Verifique que Model Invocation Logging está habilitado en Amazon Bedrock > Settings con estado activo.
   - Confirme que el Log Group seleccionado es `/aws/bedrock/model-invocations`.
   - Actualice la página de CloudWatch haciendo clic en el botón de refrescar.

2. **Permisos insuficientes (error al guardar configuración de logging)**:
   - Verifique que el Service Role tiene los permisos `logs:CreateLogStream` y `logs:PutLogEvents`.
   - Consulte el archivo [`bedrock-logging-policy.json`](bedrock-logging-policy.json) como referencia de la política IAM requerida.
   - Si el error persiste, notifique al instructor para verificar los permisos de la cuenta.

3. **Log Group ya existe**:
   - Si al crear el Log Group recibe un error indicando que ya existe, utilice el Log Group existente `/aws/bedrock/model-invocations`.
   - Verifique que la política de retención esté configurada a 1 día.
   - Si el Log Group fue creado por otro participante, consulte con el instructor.

Si encuentra otras dificultades durante este laboratorio, consulte la [Guía de Solución de Problemas](../TROUBLESHOOTING.md) que contiene soluciones a errores comunes.

**Errores que requieren asistencia del instructor:**
- Errores de permisos IAM
- Errores de límites de cuota de AWS
- El Service Role no puede ser creado automáticamente
- El Log Group no puede ser eliminado o modificado
