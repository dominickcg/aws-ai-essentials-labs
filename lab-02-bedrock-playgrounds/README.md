# 🔬 Laboratorio 2: IA Generativa con Amazon Bedrock Playgrounds

Tiempo estimado: **40 minutos**

Explore y compare Modelos Fundacionales (FMs) disponibles en Amazon Bedrock Playgrounds utilizando ejemplos contextualizados en retail y comercio electrónico. Aplique técnicas de prompting progresivamente más sofisticadas (Zero-Shot, Few-Shot, Chain-of-Thought) para evaluar la capacidad de síntesis, razonamiento y generación de código de los modelos Meta Llama y Anthropic Claude, y comprenda el impacto de los parámetros de inferencia en la calidad de las respuestas.

---

## Indice

1. [Objetivos de Aprendizaje](#objetivos-de-aprendizaje)
2. [Prerrequisitos](#prerrequisitos)
3. [Instrucciones Paso a Paso](#instrucciones-paso-a-paso)
   - [Paso 1: Verificación de Región AWS](#paso-1-verificación-de-región-aws)
   - [Paso 2: Acceso a Amazon Bedrock](#paso-2-acceso-a-amazon-bedrock)
   - [Paso 3: Comparativa de Modelos: Meta Llama vs Anthropic Claude](#paso-3-comparativa-de-modelos--meta-llama-vs-anthropic-claude)
   - [Paso 4: Impacto de Temperature](#paso-4-impacto-de-temperature-en-la-generación-de-código)
   - [Paso 5: Técnica Zero-Shot](#paso-5-técnica-zero-shot--clasificación-de-reseña-de-cliente)
   - [Paso 6: Técnica Few-Shot](#paso-6-técnica-few-shot--clasificación-json-con-ejemplos)
   - [Paso 7: Técnica Chain-of-Thought](#paso-7-técnica-chain-of-thought--cálculo-de-precio-con-descuento)
   - [Paso 8: Exploración de Alucinaciones](#paso-8-exploración-de-alucinaciones-en-datos-de-negocio)
   - [Paso 9: Gestión de Parámetros de Inferencia y Costos](#paso-9-gestión-de-parámetros-de-inferencia-y-costos)
4. [Tabla Comparativa de Técnicas de Prompting](#tabla-comparativa-de-técnicas-de-prompting)
5. [Ciclo de Vida de Recursos](#ciclo-de-vida-de-recursos)
6. [Solución de Problemas](#solución-de-problemas)

---

## Objetivos de Aprendizaje

Al completar este laboratorio, usted será capaz de:

- Comparar el comportamiento de modelos Meta Llama y Anthropic Claude ante consultas de negocio de retail y comercio electrónico.
- Aplicar técnicas de prompting progresivas (Zero-Shot, Few-Shot, Chain-of-Thought) con ejemplos de ventas y atención al cliente.
- Comprender el impacto de los parámetros de inferencia (Temperature, Top-P) en la calidad de las respuestas.
- Identificar y analizar alucinaciones en respuestas sobre datos corporativos reales.

---

## Prerrequisitos

Antes de iniciar este laboratorio, asegúrese de contar con lo siguiente:

- Acceso a la consola de AWS con permisos para Amazon Bedrock.
- Archivo `prompts-negocio.md` disponible en esta carpeta del laboratorio.

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

### Paso 2: Acceso a Amazon Bedrock

1. Utilice la barra de búsqueda global (parte superior de la consola) y escriba `Amazon Bedrock`.
2. Haga clic en **Amazon Bedrock** en los resultados para acceder a la consola del servicio.
3. En el panel de navegación de la izquierda, en la sección **Test**, haga clic en **Playground** y seleccione el modo **Chat**.

**✓ Verificación**: La consola de Amazon Bedrock está abierta y puede ver el Chat Playground con la opción de seleccionar modelos.

---

### Paso 3: Comparativa de Modelos — Meta Llama vs Anthropic Claude

1. En el Chat Playground, active el modo de comparación haciendo clic en **Compare mode** para visualizar dos modelos lado a lado:
   - Seleccione un modelo de la familia **Meta Llama** en el primer panel
   - Seleccione un modelo de la familia **Anthropic Claude** en el segundo panel
2. Configure el system prompt en ambos modelos. Copie el prompt de la sección 3 del archivo `prompts-negocio.md`:

   ```
   Eres un analista de negocio experto en retail y comercio electrónico. Responde siempre con datos cuantitativos y cita fuentes cuando sea posible.
   ```

3. Envíe el siguiente prompt de comparación a ambos modelos simultáneamente. Copie el prompt de la sección 1 del archivo `prompts-negocio.md`:

   ```
   Explica el concepto de churn de clientes (tasa de abandono) como si fuera para un vendedor de tienda que nunca ha trabajado con métricas de negocio.
   ```

4. Observe las respuestas de ambos modelos y evalúe las diferencias en capacidad de síntesis, precisión técnica y adaptación de tono.

#### Análisis Comparativo

Después de recibir las respuestas de ambos modelos, documente sus observaciones en las siguientes categorías:

| Criterio | Meta Llama | Anthropic Claude |
|----------|-----------|-----------------|
| **Precisión técnica en conceptos de negocio** | ¿El modelo utiliza terminología correcta sobre churn y métricas de retención? ¿Los datos son precisos? | ¿El modelo utiliza terminología correcta sobre churn y métricas de retención? ¿Los datos son precisos? |
| **Capacidad de adaptación de tono** | ¿Logra explicar conceptos complejos de forma accesible para un vendedor de tienda? | ¿Logra explicar conceptos complejos de forma accesible para un vendedor de tienda? |
| **Comportamiento general** | ¿La respuesta es concisa o extensa? ¿Incluye ejemplos o analogías? | ¿La respuesta es concisa o extensa? ¿Incluye ejemplos o analogías? |

**✓ Verificación**: Ambos modelos generaron respuestas sobre el churn de clientes, y usted puede identificar diferencias claras en estilo, profundidad técnica y adaptación de tono entre Meta Llama y Anthropic Claude.

---

### Paso 4: Impacto de Temperature en la Generación de Código

En este paso explorará cómo el parámetro Temperature afecta la generación de código SQL. Para comprender la teoría detrás de este parámetro, consulte [Parámetros de Inferencia](CONCEPTOS-IA-GENERATIVA.md#7-parámetros-de-inferencia).

1. En el Chat Playground, ajuste el parámetro **Temperature** a **0.0**:
   - En el panel lateral derecho, localice la sección de parámetros de inferencia
   - Establezca el valor de **Temperature** en **0.0**
2. Envíe el prompt SQL de ventas. Copie el prompt de la sección 2 del archivo `prompts-negocio.md`:

   ```
   Genera una sentencia SQL para listar los 5 productos de mayor ingreso registrados en una tabla denominada 'ventas' que contiene las columnas: id, fecha, id_cliente, producto, categoria, cantidad, monto_total.
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

### Paso 5: Técnica Zero-Shot — Clasificación de Reseña de Cliente

La técnica **Zero-Shot** consiste en enviar una instrucción directa al modelo sin proporcionar ejemplos previos. El modelo responde basándose únicamente en su conocimiento preentrenado, sin guía de formato ni estructura de salida esperada.

1. En el Chat Playground, asegúrese de que el system prompt de analista de negocio sigue configurado (sección 3 de `prompts-negocio.md`).
2. Envíe el prompt Zero-Shot de clasificación de reseña. Copie el prompt de la sección 4 del archivo `prompts-negocio.md`:

   ```
   Clasifica esta reseña de cliente: Compré unos audífonos inalámbricos hace dos semanas y dejaron de cargar al cuarto día. Intenté contactar al soporte tres veces por correo y nadie respondió. Pésima experiencia, quiero un reembolso.
   ```

3. Observe la respuesta del modelo y evalúe:
   - ¿El modelo clasifica la reseña de forma libre o estructurada?
   - ¿El nivel de detalle varía si repite el mismo prompt?
   - ¿El formato de la respuesta es predecible o cambia entre ejecuciones?

Sin ejemplos de formato, el modelo tiene libertad total para estructurar su respuesta, lo que puede resultar en clasificaciones válidas pero con formatos inconsistentes entre ejecuciones.

**✓ Verificación**: El modelo generó una clasificación de la reseña de cliente. Observe que el formato de la respuesta es variable y no sigue una estructura predefinida, lo cual es el comportamiento esperado de la técnica Zero-Shot.

---

### Paso 6: Técnica Few-Shot — Clasificación JSON con Ejemplos

La técnica **Few-Shot** incluye ejemplos de entrada/salida en el prompt para enseñar al modelo un formato o patrón de respuesta específico antes de solicitar la clasificación de un nuevo caso. Los ejemplos actúan como guía de formato que el modelo debe imitar estrictamente.

1. En el Chat Playground, mantenga el system prompt de analista de negocio configurado.
2. Envíe el prompt Few-Shot con los 3 ejemplos JSON de tickets. Copie el prompt de la sección 5 del archivo `prompts-negocio.md`:

   ```
   Clasifica el siguiente ticket de soporte en formato JSON, siguiendo exactamente el formato de los ejemplos:

   Ejemplo 1:
   {"ticket": "Me cobraron dos veces el mismo pedido en mi tarjeta de credito", "categoria": "Facturacion", "prioridad": "Alta"}

   Ejemplo 2:
   {"ticket": "El paquete dice entregado pero no ha llegado a mi domicilio", "categoria": "Envio", "prioridad": "Media"}

   Ejemplo 3:
   {"ticket": "La licuadora llego con la jarra rota y no enciende", "categoria": "Producto_Defectuoso", "prioridad": "Alta"}

   Caso a clasificar:
   Solicite un cambio de talla hace una semana y aun no recibo la guia de devolucion ni respuesta del equipo de logistica.
   ```

3. Valide que la respuesta del modelo:
   - Utiliza exactamente el mismo formato JSON de los tres ejemplos proporcionados
   - Incluye los campos `ticket`, `categoria` y `prioridad`
   - Clasifica el caso como `Envio` dado que se trata de una devolución y guía de logística pendiente
   - No añade campos adicionales ni cambia la estructura del JSON

**✓ Verificación**: El modelo generó una respuesta en formato JSON que imita estrictamente la estructura de los tres ejemplos proporcionados, demostrando que la técnica Few-Shot controla el formato de salida con precisión.

---

### Paso 7: Técnica Chain-of-Thought — Cálculo de Precio con Descuento

La técnica **Chain-of-Thought** solicita al modelo razonar paso a paso antes de dar el resultado final. En lugar de responder directamente con un número, el modelo desglosa el problema en pasos intermedios, lo que permite auditar la lógica de razonamiento de la IA. Para profundizar en esta y otras estrategias, consulte [Estrategias de Prompting](CONCEPTOS-IA-GENERATIVA.md#8-estrategias-de-prompting).

1. En el Chat Playground, mantenga el system prompt de analista de negocio configurado.
2. Envíe el prompt Chain-of-Thought de cálculo de precio con descuento. Copie el prompt de la sección 6 del archivo `prompts-negocio.md`:

   ```
   Un cliente compra una laptop con precio de lista de 1200 dolares. La tienda aplica un descuento del 15% por temporada y, sobre el precio ya rebajado, se añade un impuesto de ventas (IGV) del 18%. Calcula el precio final que pagará el cliente. Piensa paso a paso y explica cada parte del cálculo antes de dar el resultado final.
   ```

3. Valide que el modelo desglosa el razonamiento en los siguientes pasos intermedios:
   - **(a) Cálculo del descuento**: 15% sobre el precio de lista (1200 × 0.15 = 180 dólares)
   - **(b) Precio con descuento aplicado**: precio de lista menos descuento (1200 - 180 = 1020 dólares)
   - **(c) Precio final con impuesto incluido**: precio rebajado más 18% de IGV (1020 × 1.18 = 1203.60 dólares)

Este desglose permite al analista auditar la lógica de razonamiento de la IA y detectar errores en los pasos intermedios, no solo en el resultado final.

**✓ Verificación**: El modelo no proporcionó el resultado directamente, sino que desglosó el cálculo en pasos intermedios identificables, demostrando la capacidad de Chain-of-Thought para hacer el razonamiento matemático auditable.

---

## Tabla Comparativa de Técnicas de Prompting

| Técnica | Cuándo usarla | Ventaja principal | Limitación principal | Ejemplo en negocio |
|---------|--------------|-------------------|---------------------|----------------------|
| Zero-Shot | Tareas generales, evaluación del modelo | Simple, rápida, sin preparación | Formato de respuesta impredecible | Clasificación libre de una reseña de cliente |
| Few-Shot | Formato de salida específico requerido | Controla el formato con precisión | Requiere diseñar ejemplos de calidad | Clasificación JSON de tickets de soporte |
| Chain-of-Thought | Razonamiento matemático o lógico complejo | Permite auditar el proceso de razonamiento | Respuestas más largas, mayor costo en tokens | Cálculo de precio con descuento paso a paso |

---

### Paso 8: Exploración de Alucinaciones en Datos de Negocio

Una **alucinación** es una respuesta factualmente incorrecta generada por un modelo de IA con alta confianza y coherencia gramatical, presentando información falsa como si fuera verdadera. En este paso explorará este fenómeno con un caso real de datos corporativos.

1. En el Chat Playground, mantenga el system prompt de analista de negocio configurado.
2. Envíe el prompt de alucinaciones sobre datos financieros de Amazon. Copie el prompt de la sección 7 del archivo `prompts-negocio.md`:

   ```
   ¿Cuál fue el ingreso neto exacto (net sales) de Amazon en el cuarto trimestre del año fiscal 2007 y en qué fecha exacta se fundó la empresa? Proporciona también el número exacto de empleados que tenía al cierre de ese año.
   ```

3. Compare la respuesta del modelo con datos verificables del informe anual (10-K) de Amazon y de fuentes oficiales, identificando si el modelo inventa datos específicos (cifras de ingresos, fechas, número de empleados) con aparente confianza.

#### Por qué las alucinaciones son especialmente peligrosas en el ámbito de negocio

Las alucinaciones en el dominio de negocio tienen consecuencias que van más allá de la imprecisión:

- **Decisiones de inversión y planificación**: cifras financieras incorrectas pueden llevar a decisiones de compra de inventario, expansión o inversión basadas en datos falsos, con impacto económico directo.
- **Reportes y comunicación corporativa**: datos inventados en informes ejecutivos o presentaciones a stakeholders dañan la credibilidad y pueden tener implicaciones legales o regulatorias.
- **Atención al cliente**: información falsa sobre precios, políticas de devolución o disponibilidad de productos genera insatisfacción, reclamos y pérdida de confianza en la marca.

#### Estrategias de mitigación

Para reducir el riesgo de alucinaciones en aplicaciones de negocio críticas, considere las siguientes estrategias:

- **RAG (Retrieval Augmented Generation)**: conectar el modelo a bases de datos corporativas verificadas (sistemas ERP, CRM, catálogos de productos, informes financieros) para que las respuestas se fundamenten en datos reales en lugar de conocimiento preentrenado.
- **Validación cruzada**: contrastar siempre las respuestas del modelo con fuentes autorizadas como informes anuales (10-K), estados financieros auditados y las bases de datos internas de la empresa.

Para profundizar en los riesgos de seguridad de la IA Generativa, consulte [Seguridad y Riesgos](CONCEPTOS-IA-GENERATIVA.md#9-seguridad-y-riesgos).

**✓ Verificación**: El modelo generó una respuesta sobre los datos financieros de Amazon. Compare los datos proporcionados (ingresos, fecha de fundación, número de empleados) con fuentes verificables como el informe anual 10-K, e identifique si el modelo presentó información incorrecta con aparente confianza.

---

### Paso 9: Gestión de Parámetros de Inferencia y Costos

En este paso consolidará su comprensión de los parámetros de inferencia y su impacto práctico en tareas de negocio, y aprenderá a ubicar y ajustar estos controles en la interfaz de Amazon Bedrock.

#### Impacto práctico de los parámetros en tareas de negocio

| Parámetro | Valor | Caso de uso en retail / e-commerce |
|-----------|-------|--------------------------|
| Temperature | 0.0 | Generación de código SQL, cálculos de precios y descuentos, reportes financieros estandarizados donde la consistencia es crítica |
| Temperature | 0.7–0.9 | Descripciones de productos, campañas de marketing, contenido divulgativo donde se desea variedad de expresión |
| Max Generation | Bajo (256 tokens) | Clasificaciones de tickets de soporte y respuestas cortas de alta precisión |
| Max Generation | Alto (2048 tokens) | Análisis de negocio detallados, reportes completos y explicaciones paso a paso (Chain-of-Thought) |

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
