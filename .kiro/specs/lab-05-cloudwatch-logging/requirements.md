# Documento de Requerimientos

## Introducción

Creación del Laboratorio 5 — Gobernanza y Auditoría en IA Generativa, el laboratorio final del programa AWS AI Essentials. Este laboratorio guía al participante en la configuración de Model Invocation Logging en Amazon Bedrock con Amazon CloudWatch como destino de auditoría. El objetivo es capturar, almacenar e inspeccionar cada solicitud (prompt) y respuesta (completion) generada por los modelos fundacionales, asegurando trazabilidad y cumplimiento normativo.

El Lab 05 es un laboratorio express (~20 minutos) que sigue al Lab 04 pero NO utiliza recursos de laboratorios anteriores. Todos los recursos se crean desde cero: un CloudWatch Log Group para almacenar la telemetría, la configuración de Model Invocation Logging en Bedrock y la validación de registros de auditoría mediante el Playground.

La carpeta `lab-05-cloudwatch-logging/` debe contener la guía paso a paso (README.md), el documento de conceptos teóricos (CONCEPTOS-LOGGING.md), la infraestructura de tests (package.json, tsconfig.json, vitest.config.ts, tests/) y archivos de soporte como políticas IAM de ejemplo. Además, el README principal del proyecto debe actualizarse para reflejar el Lab 05 como laboratorio final con enlaces, descripción y objetivos de aprendizaje actualizados.

## Glosario

- **Entorno_AWS**: Cuenta de AWS proporcionada por el instructor donde el participante ejecuta las acciones del laboratorio.
- **Model_Invocation_Logging**: Característica nativa de Amazon Bedrock que captura los metadatos, datos de entrada (prompts) y datos de salida (completions) de todas las invocaciones a los modelos en una cuenta y región específicas.
- **CloudWatch_Log_Group**: Contenedor lógico en Amazon CloudWatch utilizado para almacenar, monitorear y retener eventos de registro (logs) generados por servicios como Amazon Bedrock.
- **Log_Retention_Policy**: Configuración que determina la cantidad de días que un evento de registro se mantendrá almacenado en CloudWatch antes de ser eliminado automáticamente.
- **Log_Stream**: Secuencia de eventos de registro dentro de un Log Group, creada automáticamente por el servicio que emite los registros.
- **Service_Role**: Rol de IAM que permite a Amazon Bedrock escribir registros en CloudWatch en nombre del participante.
- **README_Lab05**: Archivo `README.md` dentro de `lab-05-cloudwatch-logging/`. Guía principal paso a paso del Lab 05.
- **Conceptos_Logging**: Archivo `CONCEPTOS-LOGGING.md` dentro de `lab-05-cloudwatch-logging/`. Documento de conceptos teóricos sobre logging y auditoría.
- **README_Principal**: Archivo `README.md` en la raíz del proyecto.
- **Directrices_Laboratorio**: Reglas definidas en `directrices-laboratorios.md`.
- **Participante**: Usuario que ejecuta los laboratorios del programa AWS AI Essentials.

## Requerimientos

### Requerimiento 1: Aprovisionamiento del Destino de Auditoría (CloudWatch)

**User Story:** Como participante del programa AWS AI Essentials, quiero aprovisionar un grupo de registros centralizado en CloudWatch para almacenar la telemetría de invocaciones de IA, para que exista un destino de auditoría listo antes de habilitar el logging.

#### Criterios de Aceptación

1. WHEN el Participante solicite la creación del CloudWatch_Log_Group con nombre `/aws/bedrock/model-invocations`, THE Entorno_AWS SHALL aprovisionar el recurso en la región activa del laboratorio.
2. WHILE el CloudWatch_Log_Group exista en la cuenta, THE Entorno_AWS SHALL aplicar automáticamente la Log_Retention_Policy configurada (1 día) para expirar los registros antiguos de forma autónoma.
3. IF el Participante intenta crear un CloudWatch_Log_Group con un nombre que ya existe en la cuenta, THEN THE Entorno_AWS SHALL rechazar la solicitud y notificar el conflicto de nomenclatura.
4. THE README_Lab05 SHALL incluir instrucciones paso a paso para crear el CloudWatch_Log_Group desde la consola de CloudWatch, incluyendo la configuración de la Log_Retention_Policy.
5. THE README_Lab05 SHALL incluir un checkpoint de verificación confirmando que el CloudWatch_Log_Group aparece en la lista de Log Groups con la retención configurada.


### Requerimiento 2: Habilitación de la Captura de Interacciones (Bedrock Logging)

**User Story:** Como participante del programa AWS AI Essentials, quiero configurar Model Invocation Logging en Amazon Bedrock enlazado con CloudWatch, para que todas las invocaciones a modelos fundacionales queden registradas automáticamente.

#### Criterios de Aceptación

1. WHEN el Participante active la opción Model_Invocation_Logging y seleccione el CloudWatch_Log_Group destino, THE Entorno_AWS SHALL enrutar toda la telemetría de invocación de texto, imagen y embeddings hacia CloudWatch.
2. IF el Service_Role proporcionado no cuenta con los permisos `logs:CreateLogStream` y `logs:PutLogEvents`, THEN THE Entorno_AWS SHALL bloquear la activación y mostrar un error de validación de permisos.
3. WHEN la configuración de Model_Invocation_Logging se guarde exitosamente, THE Entorno_AWS SHALL aplicar la política de registro de forma global para todos los modelos habilitados en esa región para dicha cuenta.
4. THE README_Lab05 SHALL incluir instrucciones paso a paso para habilitar Model_Invocation_Logging desde la consola de Amazon Bedrock, incluyendo la selección del CloudWatch_Log_Group y la configuración del Service_Role.
5. THE README_Lab05 SHALL incluir un checkpoint de verificación confirmando que la configuración de logging se guardó exitosamente con el estado activo.


### Requerimiento 3: Generación de Trazabilidad y Validación de Registros

**User Story:** Como participante del programa AWS AI Essentials, quiero generar invocaciones a modelos de IA y verificar los registros de auditoría en CloudWatch, para confirmar que la trazabilidad funciona correctamente.

#### Criterios de Aceptación

1. WHEN el Participante envíe un prompt a cualquier modelo a través del Playground de Amazon Bedrock, THE Entorno_AWS SHALL capturar el payload completo (entrada y salida) en formato JSON y enviarlo al Log_Stream correspondiente dentro del CloudWatch_Log_Group.
2. WHEN el Participante inspeccione los eventos dentro del CloudWatch_Log_Group, THE Entorno_AWS SHALL mostrar los registros conteniendo campos obligatorios de auditoría: `accountId`, `modelArn`, `input.inputText` y `output.outputText`.
3. IF el tamaño del prompt o del completion excede el límite de tamaño de registro de CloudWatch (256 KB), THEN THE Entorno_AWS SHALL truncar el texto o redirigir el objeto completo a Amazon S3 si fue configurado como destino secundario.
4. THE README_Lab05 SHALL incluir instrucciones para enviar un prompt de prueba desde el Playground de Amazon Bedrock y navegar a CloudWatch para inspeccionar los registros generados.
5. THE README_Lab05 SHALL incluir un checkpoint de verificación confirmando que los registros en CloudWatch contienen los campos de auditoría `accountId`, `modelArn`, `input.inputText` y `output.outputText`.


### Requerimiento 4: Estructura del Directorio del Laboratorio

**User Story:** Como desarrollador del proyecto AWS AI Essentials, quiero que el Lab 05 siga la misma estructura de directorio que los laboratorios anteriores, para mantener consistencia en el proyecto y facilitar la navegación.

#### Criterios de Aceptación

1. THE Lab 05 SHALL existir como directorio `lab-05-cloudwatch-logging/` en la raíz del proyecto.
2. THE directorio `lab-05-cloudwatch-logging/` SHALL contener un archivo `README.md` como guía principal paso a paso del laboratorio.
3. THE directorio `lab-05-cloudwatch-logging/` SHALL contener un archivo `CONCEPTOS-LOGGING.md` como documento de conceptos teóricos sobre logging y auditoría.
4. THE directorio `lab-05-cloudwatch-logging/` SHALL contener archivos de infraestructura de tests: `package.json`, `tsconfig.json` y `vitest.config.ts`.
5. THE directorio `lab-05-cloudwatch-logging/` SHALL contener un directorio `tests/` con los archivos de tests de validación.
6. THE directorio `lab-05-cloudwatch-logging/` SHALL contener archivos de soporte necesarios para el laboratorio, como políticas IAM de ejemplo en formato JSON para el Service_Role de logging.


### Requerimiento 5: Actualización del README Principal del Proyecto

**User Story:** Como participante del programa AWS AI Essentials, quiero que el README principal del proyecto refleje el Lab 05 como laboratorio final con enlaces y descripción correctos, para navegar fácilmente al nuevo laboratorio.

#### Criterios de Aceptación

1. WHEN el Lab 05 esté creado, THE README_Principal SHALL reemplazar la fila placeholder "Lab 05 | Próximamente" en la tabla de laboratorios con la información real del Lab 05: enlace a `lab-05-cloudwatch-logging/`, título "Gobernanza y Auditoría con CloudWatch", descripción del laboratorio y tiempo estimado de 20 minutos.
2. THE README_Principal SHALL agregar enlaces de documentación de AWS relevantes en la sección "Contenido Adicional": enlace a la documentación de Amazon CloudWatch Logs y enlace a la documentación de Model Invocation Logging en Amazon Bedrock.
3. THE README_Principal SHALL actualizar la sección "Objetivos de Aprendizaje" para incluir objetivos relacionados con logging, gobernanza y auditoría de invocaciones de modelos de IA generativa.
4. THE README_Principal SHALL mantener intactas las secciones de Contribuciones y Licencia sin modificaciones.
5. THE README_Principal SHALL mantener intactas las filas de Lab 01, Lab 02, Lab 03 y Lab 04 en la tabla de laboratorios.


### Requerimiento 6: Guía de Conceptos de Logging y Auditoría

**User Story:** Como participante del programa AWS AI Essentials, quiero un documento de conceptos teóricos sobre Model Invocation Logging y CloudWatch, para comprender los fundamentos de gobernanza y auditoría antes de ejecutar el laboratorio.

#### Criterios de Aceptación

1. THE Conceptos_Logging SHALL existir como archivo `CONCEPTOS-LOGGING.md` dentro de `lab-05-cloudwatch-logging/`.
2. THE Conceptos_Logging SHALL contener una sección explicando Model_Invocation_Logging en Amazon Bedrock: qué captura, por qué es necesario y qué tipos de datos registra (metadatos, prompts, completions).
3. THE Conceptos_Logging SHALL contener una sección explicando CloudWatch_Log_Group y Log_Stream: estructura jerárquica, cómo se organizan los eventos de registro y cómo navegar en la consola.
4. THE Conceptos_Logging SHALL contener una sección explicando Log_Retention_Policy: opciones de retención disponibles, impacto en costos y mejores prácticas para entornos de laboratorio.
5. THE Conceptos_Logging SHALL contener una sección explicando los campos de auditoría presentes en los registros de invocación: `accountId`, `modelArn`, `input.inputText`, `output.outputText`, `requestId` y timestamps.
6. THE Conceptos_Logging SHALL contener una sección explicando casos de uso de cumplimiento y gobernanza: auditoría de uso de IA, detección de uso indebido, trazabilidad de costos y cumplimiento normativo.
7. THE Conceptos_Logging SHALL estar escrito en español según las Directrices_Laboratorio, manteniendo nombres de servicios AWS y parámetros técnicos en inglés.
8. THE README_Lab05 SHALL referenciar el Conceptos_Logging en la sección de prerrequisitos con enlace relativo `CONCEPTOS-LOGGING.md`.


### Requerimiento 7: Tests de Validación

**User Story:** Como desarrollador del proyecto AWS AI Essentials, quiero tests automatizados que validen la estructura y contenido del Lab 05, para asegurar que la documentación cumple con las directrices del proyecto y las referencias cruzadas son correctas.

#### Criterios de Aceptación

1. THE directorio `tests/` SHALL contener tests que validen que el README_Lab05 cumple con la estructura definida en las Directrices_Laboratorio: índice con anchor links, checkpoints de verificación y paso de verificación de región AWS como primer paso.
2. THE directorio `tests/` SHALL contener tests que validen que el Conceptos_Logging contiene las secciones requeridas: Model Invocation Logging, CloudWatch Log Groups, Log Retention Policies, campos de auditoría y casos de uso de gobernanza.
3. THE directorio `tests/` SHALL contener tests que validen que el README_Principal contiene la entrada correcta del Lab 05 en la tabla de laboratorios con enlace a `lab-05-cloudwatch-logging/`, título, descripción y tiempo estimado.
4. THE directorio `tests/` SHALL contener tests que validen que las referencias cruzadas entre archivos del Lab 05 son válidas: enlaces del README_Lab05 al Conceptos_Logging, enlaces del README_Principal al Lab 05, y enlaces a documentación de AWS.
5. THE Lab 05 SHALL contener `package.json` con nombre `lab-05-cloudwatch-logging-tests`, tipo `module`, script `test` con `vitest --run`, y dependencias `vitest` y `fast-check`.
6. THE Lab 05 SHALL contener `tsconfig.json` con configuración consistente con los laboratorios anteriores (target ES2022, module ESNext, moduleResolution bundler, strict true).
7. THE Lab 05 SHALL contener `vitest.config.ts` configurado para ejecutar tests en `tests/**/*.test.ts`.
8. WHEN se ejecute `npm test` dentro de `lab-05-cloudwatch-logging/`, THE infraestructura de tests SHALL ejecutar todos los tests y reportar resultados sin errores de configuración.


### Requerimiento 8: Conformidad del README del Lab 05 con Directrices del Proyecto

**User Story:** Como participante del programa AWS AI Essentials, quiero que la guía del Lab 05 siga las mismas convenciones de formato y contenido que los laboratorios anteriores, para tener una experiencia de aprendizaje consistente.

#### Criterios de Aceptación

1. THE README_Lab05 SHALL comenzar con verificación de región AWS como primer paso, según las Directrices_Laboratorio.
2. THE README_Lab05 SHALL contener un índice con anchor links a cada sección principal del laboratorio.
3. THE README_Lab05 SHALL usar el patrón de nomenclatura `{nombre-participante}` en todos los nombres de recursos AWS donde aplique, según las Directrices_Laboratorio.
4. THE README_Lab05 SHALL incluir tiempo estimado de completación (~20 minutos) visible al inicio del documento.
5. THE README_Lab05 SHALL incluir una sección de objetivos de aprendizaje con 2-4 puntos específicos sobre logging, auditoría y gobernanza en IA generativa.
6. THE README_Lab05 SHALL incluir una sección de prerrequisitos indicando que NO se requieren recursos de laboratorios anteriores, solo acceso a la cuenta de AWS y un modelo habilitado en Amazon Bedrock.
7. THE README_Lab05 SHALL incluir instrucciones numeradas paso a paso con sub-bullets para detalles de configuración.
8. THE README_Lab05 SHALL incluir checkpoints de verificación visual (✓ Verificación) después de cada paso principal de creación o configuración de recursos.
9. THE README_Lab05 SHALL incluir una sección de ciclo de vida de recursos indicando que todos los recursos del Lab 05 pueden eliminarse al finalizar, ya que es el último laboratorio del programa.
10. THE README_Lab05 SHALL incluir una sección de solución de problemas con referencia a la guía general de troubleshooting y errores que requieren asistencia del instructor.
11. THE README_Lab05 SHALL estar escrito en español según las Directrices_Laboratorio, manteniendo nombres de servicios AWS y parámetros técnicos en inglés.
12. THE README_Lab05 SHALL usar un único emoji en el título principal del laboratorio, según las Directrices_Laboratorio.
