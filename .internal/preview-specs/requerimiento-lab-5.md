# Laboratorio Express: Gobernanza y Auditoría en IA Generativa
## Configuración de "Model Invocation Logging" y CloudWatch

### Introducción
Este documento define los requerimientos técnicos para implementar una solución de auditoría y trazabilidad sobre las interacciones con Inteligencia Artificial en Amazon Bedrock. El objetivo es configurar el entorno para que capture, almacene y permita la inspección de cada solicitud (prompt) y respuesta (completion) generada por los modelos fundacionales, asegurando el cumplimiento normativo (Compliance) sin comprometer el rendimiento del servicio.

### Glosario
* **Model Invocation Logging:** Característica nativa de Amazon Bedrock que captura los metadatos, datos de entrada (prompts) y datos de salida (completions) de todas las invocaciones a los modelos en una cuenta y región específicas.
* **Amazon CloudWatch Log Group:** Contenedor lógico en AWS utilizado para almacenar, monitorear y retener eventos de registro (logs) generados por servicios como Bedrock.
* **Log Retention Policy:** Configuración que determina la cantidad de días que un evento de registro se mantendrá almacenado en CloudWatch antes de ser eliminado automáticamente (crucial para optimizar costos en entornos de laboratorio).

---

### Requerimientos

#### Requerimiento 1: Aprovisionamiento del Destino de Auditoría (CloudWatch)
* **Historia de Usuario:** Cuando el estudiante prepare la infraestructura de auditoría, el Entorno de AWS deberá aprovisionar un grupo de registros centralizado y temporal para almacenar la telemetría de la IA.
* **Criterios de Aceptación:**
  1. Cuando el estudiante solicite la creación del grupo de registros `/aws/bedrock/model-invocations`, el Entorno de AWS deberá aprovisionar el recurso en la región activa del laboratorio.
  2. Mientras el Log Group exista en la cuenta, el Entorno de AWS deberá aplicar automáticamente la política de retención configurada (ej. 1 día) para expirar los registros antiguos de forma autónoma.
  3. Si el estudiante intenta crear un Log Group con un nombre que ya existe, entonces el Entorno de AWS deberá rechazar la solicitud y notificar el conflicto de nomenclatura.

#### Requerimiento 2: Habilitación de la Captura de Interacciones (Bedrock Logging)
* **Historia de Usuario:** Cuando el estudiante configure las opciones de gobernanza, el Entorno de AWS deberá enlazar Amazon Bedrock con CloudWatch, garantizando que el servicio tenga los permisos necesarios para escribir los registros.
* **Criterios de Aceptación:**
  1. Cuando el estudiante active la opción "Model invocation logging" y seleccione el Log Group destino, el Entorno de AWS deberá enrutar toda la telemetría de invocación de texto, imagen y embeddings hacia CloudWatch.
  2. Si el rol de IAM (Service Role) proporcionado no cuenta con los permisos `logs:CreateLogStream` y `logs:PutLogEvents`, entonces el Entorno de AWS deberá bloquear la activación y mostrar un error de validación de permisos.
  3. Cuando la configuración se guarde exitosamente, el Entorno de AWS deberá aplicar la política de registro de forma global para todos los modelos habilitados en esa región para dicha cuenta.

#### Requerimiento 3: Generación de Trazabilidad y Validación de Registros
* **Historia de Usuario:** Cuando el estudiante interactúe con los modelos de IA, el Entorno de AWS deberá generar y mostrar los registros de auditoría detallados para confirmar la visibilidad de los datos.
* **Criterios de Aceptación:**
  1. Cuando el estudiante envíe un *prompt* a cualquier modelo a través del Playground de Bedrock, el Entorno de AWS deberá capturar el *payload* completo (entrada y salida) en formato JSON y enviarlo al flujo de registros.
  2. Cuando el estudiante inspeccione los eventos dentro del Log Group en CloudWatch, el Entorno de AWS deberá mostrar los registros conteniendo campos obligatorios de auditoría como `accountId`, `modelArn`, `input.inputText` y `output.outputText`.
  3. Si el tamaño del *prompt* o del *completion* excede el límite de tamaño de registro de CloudWatch (256 KB), entonces el Entorno de AWS deberá truncar el texto o redirigir el objeto completo a Amazon S3 (si fue configurado como destino secundario).