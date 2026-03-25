# 🔬 Laboratorio 2: IA Generativa con Amazon Bedrock Playgrounds

Tiempo estimado: **40 minutos**

Explore y compare Modelos Fundacionales (FMs) disponibles en Amazon Bedrock Playgrounds utilizando ejemplos contextualizados en geofísica y sismología. Aplique técnicas de prompting progresivamente más sofisticadas (Zero-Shot, Few-Shot, Chain-of-Thought) para evaluar la capacidad de síntesis, razonamiento y generación de código de los modelos Meta Llama y Anthropic Claude, y comprenda el impacto de los parámetros de inferencia en la calidad de las respuestas.

---

## Indice

1. [Objetivos de Aprendizaje](#objetivos-de-aprendizaje)
2. [Prerrequisitos](#prerrequisitos)
3. [Instrucciones Paso a Paso](#instrucciones-paso-a-paso)
   - [Paso 1: Verificación de Región AWS](#paso-1-verificación-de-región-aws)
   - [Paso 2: Acceso a Amazon Bedrock y Habilitación de Modelos](#paso-2-acceso-a-amazon-bedrock-y-habilitación-de-modelos)
   - [Paso 3: Comparativa de Modelos — Meta Llama vs Anthropic Claude](#paso-3-comparativa-de-modelos--meta-llama-vs-anthropic-claude)
   - [Paso 4: Impacto de Temperature en la Generación de Código](#paso-4-impacto-de-temperature-en-la-generación-de-código)
   - [Paso 5: Técnica Zero-Shot — Clasificación de Reporte Sísmico](#paso-5-técnica-zero-shot--clasificación-de-reporte-sísmico)
   - [Paso 6: Técnica Few-Shot — Clasificación JSON con Ejemplos](#paso-6-técnica-few-shot--clasificación-json-con-ejemplos)
   - [Paso 7: Técnica Chain-of-Thought — Cálculo de Distancia Epicentral](#paso-7-técnica-chain-of-thought--cálculo-de-distancia-epicentral)
   - [Paso 8: Exploración de Alucinaciones en Geofísica](#paso-8-exploración-de-alucinaciones-en-geofísica)
   - [Paso 9: Gestión de Parámetros de Inferencia y Costos](#paso-9-gestión-de-parámetros-de-inferencia-y-costos)
4. [Tabla Comparativa de Técnicas de Prompting](#tabla-comparativa-de-técnicas-de-prompting)
5. [Ciclo de Vida de Recursos](#ciclo-de-vida-de-recursos)
6. [Solución de Problemas](#solución-de-problemas)

---

## Objetivos de Aprendizaje

Al completar este laboratorio, usted será capaz de:

- Comparar el comportamiento de modelos Meta Llama y Anthropic Claude ante consultas técnicas de geofísica.
- Aplicar técnicas de prompting progresivas (Zero-Shot, Few-Shot, Chain-of-Thought) con ejemplos de sismología.
- Comprender el impacto de los parámetros de inferencia (Temperature, Top-P) en la calidad de las respuestas.
- Identificar y analizar alucinaciones en respuestas sobre eventos sísmicos reales.

---

## Prerrequisitos

Antes de iniciar este laboratorio, asegúrese de contar con lo siguiente:

- Acceso a la consola de AWS con permisos para Amazon Bedrock.
- Modelos Meta Llama y Anthropic Claude habilitados en Amazon Bedrock (los modelos se habilitan automáticamente con los permisos de AWS Marketplace correctos; para Anthropic Claude se requiere completar un formulario de uso la primera vez).
- Archivo `prompts-geofisica.md` disponible en esta carpeta del laboratorio.

Antes de comenzar, revise la [Guía de Conceptos Fundamentales de IA Generativa](CONCEPTOS-IA-GENERATIVA.md) para familiarizarse con los términos y conceptos que se utilizarán durante el laboratorio.

Este laboratorio es independiente del Lab 01 y no requiere recursos ni configuraciones previas de otros laboratorios.

---

## Instrucciones Paso a Paso

### Paso 1: Verificación de Región AWS

1. Verifique que está trabajando en la región correcta:
   - En la esquina superior derecha de la consola de AWS, observe el nombre de la región
   - Confirme que dice la región estipulada por el instructor
   - Si no es correcta, haga clic en el nombre de la región y seleccione la región indicada

**✓ Verificación**: La esquina superior derecha de la consola muestra la región correcta indicada por el instructor.

---

### Paso 2: Acceso a Amazon Bedrock y Habilitación de Modelos

1. Utilice la barra de búsqueda global (parte superior de la consola) y escriba `Amazon Bedrock`.
2. Haga clic en **Amazon Bedrock** en los resultados para acceder a la consola del servicio.
3. En el panel de navegación de la izquierda, haga clic en **Model access** (Acceso a modelos).
4. Revise la lista de modelos disponibles:
   - Localice los modelos de la familia **Meta Llama**
   - Localice los modelos de la familia **Anthropic Claude**
5. Si los modelos no tienen acceso habilitado, solicite acceso:
   - Para modelos de **Anthropic Claude**: seleccione el modelo en el catálogo y complete el formulario de uso requerido por Anthropic (First Time Use). El acceso se concede inmediatamente después de enviar el formulario.
   - Para modelos de **Meta Llama**: el acceso se habilita automáticamente con los permisos de AWS Marketplace correctos. Si no tiene acceso, verifique los permisos IAM con el instructor.

> **Nota**: El instructor puede haber habilitado previamente el acceso a los modelos en la cuenta del laboratorio. En versiones recientes de Amazon Bedrock, el acceso a modelos de terceros se habilita automáticamente con los permisos de AWS Marketplace correctos. Si los modelos ya están disponibles para su uso, puede continuar directamente al siguiente paso.

**✓ Verificación**: Los modelos de Meta Llama y Anthropic Claude están disponibles para su uso en Amazon Bedrock. Puede verificarlo seleccionando un modelo en el Playground o revisando la sección Model access en el panel de navegación.

---

### Paso 3: Comparativa de Modelos — Meta Llama vs Anthropic Claude

1. En el panel de navegación de la izquierda de Amazon Bedrock, en la sección **Test**, haga clic en **Playground** y seleccione el modo **Chat**.
2. Active el modo de comparación haciendo clic en **Compare mode** para visualizar dos modelos lado a lado:
   - Seleccione un modelo de la familia **Meta Llama** en el primer panel
   - Seleccione un modelo de la familia **Anthropic Claude** en el segundo panel
3. Configure el system prompt en ambos modelos. Copie el prompt de la sección 3 del archivo `prompts-geofisica.md`:

   ```
   Eres un geofísico experto en sismología. Responde siempre con datos técnicos y cita fuentes cuando sea posible.
   ```

4. Envíe el siguiente prompt de comparación a ambos modelos simultáneamente. Copie el prompt de la sección 1 del archivo `prompts-geofisica.md`:

   ```
   Explica el concepto de Ondas Sísmicas P y S como si fuera para un estudiante de secundaria de 15 años que nunca ha estudiado geofísica.
   ```

5. Observe las respuestas de ambos modelos y evalúe las diferencias en capacidad de síntesis, precisión técnica y adaptación de tono.

#### Análisis Comparativo

Después de recibir las respuestas de ambos modelos, documente sus observaciones en las siguientes categorías:

| Criterio | Meta Llama | Anthropic Claude |
|----------|-----------|-----------------|
| **Precisión técnica en geofísica** | ¿El modelo utiliza terminología correcta sobre ondas P y S? ¿Los datos son precisos? | ¿El modelo utiliza terminología correcta sobre ondas P y S? ¿Los datos son precisos? |
| **Capacidad de adaptación de tono** | ¿Logra explicar conceptos complejos de forma accesible para un estudiante de 15 años? | ¿Logra explicar conceptos complejos de forma accesible para un estudiante de 15 años? |
| **Comportamiento general** | ¿La respuesta es concisa o extensa? ¿Incluye ejemplos o analogías? | ¿La respuesta es concisa o extensa? ¿Incluye ejemplos o analogías? |

**✓ Verificación**: Ambos modelos generaron respuestas sobre ondas sísmicas P y S, y usted puede identificar diferencias claras en estilo, profundidad técnica y adaptación de tono entre Meta Llama y Anthropic Claude.

---

### Paso 4: Impacto de Temperature en la Generación de Código

En este paso explorará cómo el parámetro Temperature afecta la generación de código SQL. Para comprender la teoría detrás de este parámetro, consulte [Parámetros de Inferencia](CONCEPTOS-IA-GENERATIVA.md#7-parámetros-de-inferencia).

1. En el Chat Playground, ajuste el parámetro **Temperature** a **0.0**:
   - En el panel lateral derecho, localice la sección de parámetros de inferencia
   - Establezca el valor de **Temperature** en **0.0**
2. Envíe el prompt SQL de eventos sísmicos. Copie el prompt de la sección 2 del archivo `prompts-geofisica.md`:

   ```
   Genera una sentencia SQL para listar los 5 eventos sísmicos de mayor magnitud registrados en una tabla denominada 'eventos_sismicos' que contiene las columnas: id, fecha, latitud, longitud, profundidad_km, magnitud, escala.
   ```

3. Verifique que la respuesta con Temperature 0.0 es:
   - Concisa y sin texto explicativo innecesario
   - Determinista (consistente si se repite el mismo prompt)
   - Técnicamente precisa en la sintaxis SQL
4. Ahora ajuste el parámetro **Temperature** a **0.9**:
   - En el panel lateral derecho, cambie el valor de **Temperature** a **0.9**
5. Envíe el mismo prompt SQL nuevamente y observe las diferencias:
   - El modelo puede añadir texto explicativo adicional no solicitado
   - La estructura SQL puede incluir variaciones o alternativas
   - Pueden aparecer comentarios, sugerencias de índices u otras adiciones

**✓ Verificación**: Con Temperature 0.0 la respuesta SQL es concisa y determinista. Con Temperature 0.9 se observa mayor variabilidad en la respuesta, confirmando el impacto de la aleatoriedad en la generación de código.

---

### Paso 5: Técnica Zero-Shot — Clasificación de Reporte Sísmico

La técnica **Zero-Shot** consiste en enviar una instrucción directa al modelo sin proporcionar ejemplos previos. El modelo responde basándose únicamente en su conocimiento preentrenado, sin guía de formato ni estructura de salida esperada.

1. En el Chat Playground, asegúrese de que el system prompt de geofísico experto sigue configurado (sección 3 de `prompts-geofisica.md`).
2. Envíe el prompt Zero-Shot de clasificación sísmica. Copie el prompt de la sección 4 del archivo `prompts-geofisica.md`:

   ```
   Clasifica este reporte sísmico: Se registró un evento de magnitud 4.2 con epicentro a 15 km de profundidad en la zona de subducción de la costa central. Los sismógrafos detectaron ondas P seguidas de ondas S con un intervalo de 8 segundos.
   ```

3. Observe la respuesta del modelo y evalúe:
   - ¿El modelo clasifica el evento sísmico de forma libre o estructurada?
   - ¿El nivel de detalle varía si repite el mismo prompt?
   - ¿El formato de la respuesta es predecible o cambia entre ejecuciones?

Sin ejemplos de formato, el modelo tiene libertad total para estructurar su respuesta, lo que puede resultar en clasificaciones válidas pero con formatos inconsistentes entre ejecuciones.

**✓ Verificación**: El modelo generó una clasificación del reporte sísmico. Observe que el formato de la respuesta es variable y no sigue una estructura predefinida, lo cual es el comportamiento esperado de la técnica Zero-Shot.

---

### Paso 6: Técnica Few-Shot — Clasificación JSON con Ejemplos

La técnica **Few-Shot** incluye ejemplos de entrada/salida en el prompt para enseñar al modelo un formato o patrón de respuesta específico antes de solicitar la clasificación de un nuevo caso. Los ejemplos actúan como guía de formato que el modelo debe imitar estrictamente.

1. En el Chat Playground, mantenga el system prompt de geofísico experto configurado.
2. Envíe el prompt Few-Shot con los 3 ejemplos JSON sísmicos. Copie el prompt de la sección 5 del archivo `prompts-geofisica.md`:

   ```
   Clasifica el siguiente reporte sísmico en formato JSON, siguiendo exactamente el formato de los ejemplos:

   Ejemplo 1:
   {"reporte": "Magnitud 6.1, profundidad 35 km, zona de falla transformante", "clasificacion": "Sismo_Tectonico", "nivel_alerta": "Moderado"}

   Ejemplo 2:
   {"reporte": "Magnitud 2.3, profundidad 5 km, bajo cono volcánico activo, tremor armónico previo", "clasificacion": "Sismo_Volcanico", "nivel_alerta": "Vigilancia"}

   Ejemplo 3:
   {"reporte": "Magnitud 3.1, profundidad 2 km, zona de extracción de fluidos geotermales, patrón de enjambre", "clasificacion": "Sismo_Inducido", "nivel_alerta": "Monitoreo"}

   Caso a clasificar:
   Magnitud 5.4, profundidad 80 km, zona de subducción de placa oceánica bajo placa continental, mecanismo focal de tipo inverso.
   ```

3. Valide que la respuesta del modelo:
   - Utiliza exactamente el mismo formato JSON de los tres ejemplos proporcionados
   - Incluye los campos `reporte`, `clasificacion` y `nivel_alerta`
   - Clasifica el evento como `Sismo_Tectonico` dado el mecanismo focal de tipo inverso en zona de subducción
   - No añade campos adicionales ni cambia la estructura del JSON

**✓ Verificación**: El modelo generó una respuesta en formato JSON que imita estrictamente la estructura de los tres ejemplos proporcionados, demostrando que la técnica Few-Shot controla el formato de salida con precisión.

---

### Paso 7: Técnica Chain-of-Thought — Cálculo de Distancia Epicentral

La técnica **Chain-of-Thought** solicita al modelo razonar paso a paso antes de dar el resultado final. En lugar de responder directamente con un número, el modelo desglosa el problema en pasos intermedios, lo que permite auditar la lógica de razonamiento de la IA. Para profundizar en esta y otras estrategias, consulte [Estrategias de Prompting](CONCEPTOS-IA-GENERATIVA.md#8-estrategias-de-prompting).

1. En el Chat Playground, mantenga el system prompt de geofísico experto configurado.
2. Envíe el prompt Chain-of-Thought de cálculo de distancia epicentral. Copie el prompt de la sección 6 del archivo `prompts-geofisica.md`:

   ```
   Un sismógrafo registra la llegada de ondas P a las 14:32:10 UTC y la llegada de ondas S a las 14:32:18 UTC. Sabiendo que las ondas P viajan a 6 km/s y las ondas S viajan a 3.5 km/s en corteza continental, calcula la distancia aproximada al epicentro. Piensa paso a paso y explica cada parte del cálculo antes de dar el resultado final.
   ```

3. Valide que el modelo desglosa el razonamiento en los siguientes pasos intermedios:
   - **(a) Cálculo del intervalo S-P**: diferencia entre el tiempo de llegada de ondas S y ondas P (18 - 10 = 8 segundos)
   - **(b) Aplicación de la fórmula de distancia**: usando la diferencia de velocidades entre ondas P y S (6 km/s - 3.5 km/s = 2.5 km/s)
   - **(c) Resultado final con unidades**: distancia = intervalo S-P × (Vp × Vs) / (Vp - Vs), expresado en kilómetros

Este desglose permite al geofísico auditar la lógica de razonamiento de la IA y detectar errores en los pasos intermedios, no solo en el resultado final.

**✓ Verificación**: El modelo no proporcionó el resultado directamente, sino que desglosó el cálculo en pasos intermedios identificables, demostrando la capacidad de Chain-of-Thought para hacer el razonamiento matemático auditable.

---

## Tabla Comparativa de Técnicas de Prompting

| Técnica | Cuándo usarla | Ventaja principal | Limitación principal | Ejemplo en geofísica |
|---------|--------------|-------------------|---------------------|----------------------|
| Zero-Shot | Tareas generales, evaluación del modelo | Simple, rápida, sin preparación | Formato de respuesta impredecible | Clasificación libre de un reporte sísmico |
| Few-Shot | Formato de salida específico requerido | Controla el formato con precisión | Requiere diseñar ejemplos de calidad | Clasificación JSON de eventos sísmicos |
| Chain-of-Thought | Razonamiento matemático o lógico complejo | Permite auditar el proceso de razonamiento | Respuestas más largas, mayor costo en tokens | Cálculo de distancia epicentral paso a paso |

---

### Paso 8: Exploración de Alucinaciones en Geofísica

Una **alucinación** es una respuesta factualmente incorrecta generada por un modelo de IA con alta confianza y coherencia gramatical, presentando información falsa como si fuera verdadera. En este paso explorará este fenómeno con un caso real de geofísica.

1. En el Chat Playground, mantenga el system prompt de geofísico experto configurado.
2. Envíe el prompt de alucinaciones sobre el terremoto de Pisco 2007. Copie el prompt de la sección 7 del archivo `prompts-geofisica.md`:

   ```
   ¿Cuál fue la magnitud exacta y las coordenadas del epicentro del terremoto de Pisco, Perú, del 15 de agosto de 2007? Proporciona también el número exacto de réplicas registradas en las primeras 24 horas.
   ```

3. Compare la respuesta del modelo con datos verificables del IGP (Instituto Geofísico del Perú) y USGS, identificando si el modelo inventa datos específicos (magnitud, coordenadas, número de réplicas) con aparente confianza.

#### Por qué las alucinaciones son especialmente peligrosas en geofísica

Las alucinaciones en el dominio geofísico tienen consecuencias que van más allá de la imprecisión académica:

- **Sistemas de alerta temprana de tsunamis**: una magnitud incorrecta puede activar o suprimir alertas erróneamente, poniendo en riesgo vidas humanas en zonas costeras.
- **Evaluación de riesgo sísmico**: datos de profundidad o mecanismo focal incorrectos llevan a evaluaciones de daño estructural equivocadas, afectando decisiones de ingeniería y planificación urbana.
- **Investigación científica**: citas de estudios o datos sísmicos inventados pueden contaminar la literatura científica, propagando información errónea en publicaciones y análisis posteriores.

#### Estrategias de mitigación

Para reducir el riesgo de alucinaciones en aplicaciones geofísicas críticas, considere las siguientes estrategias:

- **RAG (Retrieval Augmented Generation)**: conectar el modelo a bases de datos sísmicas verificadas (IGP, USGS, ISC) para que las respuestas se fundamenten en datos reales en lugar de conocimiento preentrenado.
- **Validación cruzada**: contrastar siempre las respuestas del modelo con fuentes autorizadas como el IGP (Instituto Geofísico del Perú), USGS (United States Geological Survey) e ISC (International Seismological Centre).

Para profundizar en los riesgos de seguridad de la IA Generativa, consulte [Seguridad y Riesgos](CONCEPTOS-IA-GENERATIVA.md#9-seguridad-y-riesgos).

**✓ Verificación**: El modelo generó una respuesta sobre el terremoto de Pisco 2007. Compare los datos proporcionados (magnitud, coordenadas, número de réplicas) con fuentes verificables del IGP y USGS, e identifique si el modelo presentó información incorrecta con aparente confianza.

---

### Paso 9: Gestión de Parámetros de Inferencia y Costos

En este paso consolidará su comprensión de los parámetros de inferencia y su impacto práctico en tareas geofísicas, y aprenderá a ubicar y ajustar estos controles en la interfaz de Amazon Bedrock.

#### Impacto práctico de los parámetros en tareas geofísicas

| Parámetro | Valor | Caso de uso en geofísica |
|-----------|-------|--------------------------|
| Temperature | 0.0 | Generación de código SQL, cálculos de distancia epicentral, reportes técnicos estandarizados donde la consistencia es crítica |
| Temperature | 0.7–0.9 | Descripciones narrativas de eventos sísmicos, resúmenes divulgativos, contenido educativo donde se desea variedad de expresión |
| Max Generation | Bajo (256 tokens) | Clasificaciones de reportes sísmicos y respuestas cortas de alta precisión |
| Max Generation | Alto (2048 tokens) | Análisis detallados, reportes completos y explicaciones paso a paso (Chain-of-Thought) |

#### Ubicación de los controles en Amazon Bedrock

Los parámetros de inferencia se encuentran en el **panel lateral derecho** del Chat Playground de Amazon Bedrock. Los rangos de valores permitidos son:

- **Temperature**: 0.0 – 1.0
- **Top-P**: 0.0 – 1.0
- **Max Generation**: varía según el modelo seleccionado

#### Nota sobre costos

El costo de uso de Amazon Bedrock se calcula por **tokens de entrada** (el prompt que usted envía) más **tokens de salida** (la respuesta generada por el modelo). El parámetro **Max Generation** controla el límite máximo de tokens de salida, lo que permite evitar costos inesperados al establecer un techo en la longitud de las respuestas.

**✓ Verificación**: Localice el panel lateral derecho del Chat Playground y confirme que puede ver los controles de Temperature, Top-P y Max Generation con sus respectivos rangos de valores.

---

## Ciclo de Vida de Recursos

Amazon Bedrock Playgrounds no crea recursos persistentes durante su uso. A diferencia de otros servicios de AWS, no se generan instancias EC2, buckets S3, bases de datos ni ningún otro recurso que requiera administración posterior.

- No hay recursos que eliminar al finalizar este laboratorio.
- El costo se genera únicamente por los tokens procesados durante las interacciones con los modelos (tokens de entrada + tokens de salida).
- Los costos se detienen automáticamente cuando se deja de enviar prompts a los modelos.

---

## Solución de Problemas

Si encuentra dificultades durante este laboratorio, consulte la [Guía de Solución de Problemas](../TROUBLESHOOTING.md) que contiene soluciones a errores comunes.

**Errores que requieren asistencia del instructor:**
- Errores de permisos IAM
- Errores de límites de cuota de AWS
