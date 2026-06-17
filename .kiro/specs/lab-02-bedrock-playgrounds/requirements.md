# Documento de Requerimientos

## Introducción

Laboratorio 2: IA Generativa con Amazon Bedrock Playgrounds, enfocado en la exploración y comparación de Modelos Fundacionales (FMs) aplicados al dominio de la geofísica y sismología. Este laboratorio guía al participante en la experimentación con diferentes modelos de lenguaje disponibles en Amazon Bedrock, comparando sus capacidades de síntesis, razonamiento y generación de código mediante técnicas de prompting progresivamente más sofisticadas (Zero-Shot, Few-Shot y Chain-of-Thought) utilizando ejemplos del campo de la geofísica, ondas sísmicas y análisis de eventos telúricos.

Este es el segundo de una serie de 5 laboratorios (Lab 01 a Lab 05) que exploran progresivamente los servicios de inteligencia artificial, aprendizaje automático e IA generativa de AWS.

Duración estimada: 40 minutos.

Objetivo principal: Comparar el comportamiento de Modelos Fundacionales (FMs) ante instrucciones simples y complejas en Amazon Bedrock Playgrounds, evaluando la capacidad de síntesis, el manejo de parámetros de inferencia (Temperature, Top-P) y la aplicación de técnicas de prompting avanzado (Zero-Shot, Few-Shot, Chain-of-Thought) con ejemplos contextualizados en geofísica y sismología.

Nota sobre el contexto temático: Este laboratorio utiliza ejemplos del campo de la geofísica y sismología para contextualizar las interacciones con los modelos de IA generativa. Los participantes actuarán como geofísicos e ingenieros sísmicos evaluando qué modelo responde mejor a consultas técnicas sobre ondas sísmicas, escalas de magnitud, tectónica de placas y análisis de datos sísmicos. El objetivo es demostrar las capacidades de Amazon Bedrock utilizando un dominio científico rico en terminología técnica y razonamiento cuantitativo.

## Glosario

- **Alucinacion**: Respuesta factualmente incorrecta generada por un modelo de IA con alta confianza y coherencia gramatical, presentando información falsa como si fuera verdadera.
- **Amazon_Bedrock**: Servicio de AWS que proporciona acceso a Modelos Fundacionales de múltiples proveedores (Anthropic, Meta, Amazon, entre otros) a través de una API unificada y playgrounds interactivos.
- **Archivo_Soporte**: Archivo complementario proporcionado en la carpeta del laboratorio que el Participante utiliza durante la ejecución (ej. prompts de ejemplo, archivos de referencia).
- **Chain_of_Thought**: Técnica de prompting que solicita al modelo "pensar paso a paso" para mejorar el razonamiento lógico-matemático, desglosando problemas complejos en pasos intermedios antes de dar una respuesta final.
- **Chat_Playground**: Interfaz interactiva de Amazon Bedrock que permite enviar prompts a modelos de lenguaje y recibir respuestas en formato conversacional, con opciones para ajustar parámetros de inferencia.
- **Context_Window**: Límite máximo de información (medido en tokens) que un modelo puede procesar en una sola interacción, incluyendo tanto el prompt de entrada como la respuesta generada.
- **Directrices_Laboratorio**: Conjunto de reglas y estándares definidos en `directrices-laboratorios.md` que gobiernan la estructura, formato y contenido de toda la documentación del laboratorio.
- **Documentacion_AWS**: Documentación oficial de AWS utilizada como fuente de verdad para validar la precisión del contenido del laboratorio.
- **Documento_Troubleshooting**: Documento separado (`TROUBLESHOOTING.md`) que contiene soluciones a errores comunes organizados por laboratorio.
- **Embedding**: Representación numérica (vector) de un texto en un espacio matemático de alta dimensión, que captura el significado semántico de las palabras y frases. Los modelos de lenguaje utilizan embeddings internamente para "comprender" la similitud entre conceptos.
- **Few_Shot**: Técnica de prompting que incluye ejemplos de entrada/salida en el prompt para enseñar al modelo un formato o patrón de respuesta específico antes de solicitar la clasificación o generación de un nuevo caso.
- **Foundation_Model**: Modelo de inteligencia artificial de propósito general entrenado con grandes volúmenes de datos que puede adaptarse a diversas tareas sin necesidad de reentrenamiento completo.
- **Guia_Conceptos_IA_Generativa**: Documento separado (`CONCEPTOS-IA-GENERATIVA.md`) ubicado en la carpeta del laboratorio que contiene el marco teórico fundamental de IA Generativa, incluyendo definiciones de arquitectura de modelos, parámetros de inferencia, estrategias de prompting y conceptos de seguridad. Tiene estructura similar al README del laboratorio (título con emoji, índice con anclas, secciones organizadas pedagógicamente).
- **Guia_Laboratorio**: Documento README del laboratorio que contiene las instrucciones paso a paso. El marco teórico de IA Generativa se encuentra en el documento separado Guia_Conceptos_IA_Generativa.
- **IA_Generativa**: Rama de la inteligencia artificial que produce contenido nuevo (texto, código, imágenes, audio) a partir de instrucciones en lenguaje natural, en contraste con el ML tradicional que clasifica o predice sobre datos existentes.
- **Inferencia**: Proceso de enviar un dato (prompt) al modelo entrenado y recibir una predicción o respuesta generada en tiempo de ejecución.
- **LLM**: Large Language Model. Tipo específico de Foundation_Model especializado en entender y generar texto en lenguaje natural.
- **Latencia**: Tiempo que tarda el primer token de la respuesta en aparecer tras enviar un prompt, medida crítica para aplicaciones interactivas como chatbots.
- **Max_Generation**: Parámetro que establece el límite máximo de tokens de salida que el modelo puede generar en una respuesta, utilizado para controlar costos y evitar respuestas excesivamente largas.
- **MCP_Server_AWS_Docs**: Servidor MCP de documentación de AWS utilizado para verificar y validar el contenido del laboratorio contra la documentación oficial.
- **Multimodalidad**: Capacidad de un modelo de procesar y generar múltiples tipos de datos (texto, imágenes, audio, video) en una misma interacción. Algunos Foundation Models en Amazon Bedrock son multimodales.
- **Participante**: Usuario que ejecuta el laboratorio siguiendo las instrucciones de la guía.
- **PII**: Personally Identifiable Information. Datos personales sensibles (nombres, direcciones, números de identificación) que deben ser protegidos y ofuscados antes o después de la inferencia con modelos de IA.
- **Prediccion_Siguiente_Token**: Mecanismo fundamental de los LLMs que consiste en predecir iterativamente el token más probable dado el contexto previo. La respuesta completa se construye token a token, lo que explica por qué los parámetros Temperature y Top-P afectan directamente la variabilidad del texto generado.
- **Prompt**: Instrucción o entrada de texto que el usuario envía al modelo para obtener una respuesta. La calidad y estructura del prompt determina directamente la calidad de la respuesta generada.
- **Prompt_Injection**: Intento malicioso de manipular el prompt para que el modelo ignore sus directrices de seguridad, revele información prohibida o ejecute instrucciones no autorizadas.
- **README_Principal**: Documento README.md ubicado en la raíz del proyecto que lista todos los laboratorios (Lab 01 a Lab 05) en una tabla con enlaces, títulos, descripciones y tiempos estimados.
- **System_Prompt**: Instrucciones de comportamiento que configuran el rol, tono y restricciones del modelo antes de la conversación con el usuario. En Amazon Bedrock Playgrounds, el system prompt se configura en un campo separado al prompt del usuario y persiste durante toda la sesión.
- **Temperature**: Parámetro de inferencia que controla la aleatoriedad de las respuestas del modelo. Valores cercanos a 0 producen respuestas deterministas y consistentes; valores cercanos a 1 introducen mayor variabilidad y creatividad.
- **Throughput**: Velocidad total de generación de tokens por segundo, medida relevante para evaluar el rendimiento de un modelo en tareas de generación de texto extenso.
- **Token**: Unidad básica de procesamiento de texto en modelos de lenguaje. Aproximadamente 1000 tokens equivalen a 750 palabras en inglés. Es la unidad de facturación en servicios de IA generativa (costo por millón de tokens).
- **Top_P**: Parámetro de inferencia (Nucleus Sampling) que limita la selección de tokens a un subconjunto acumulativo de alta probabilidad, utilizado junto con Temperature para afinar la coherencia y diversidad del texto generado.
- **Zero_Shot**: Técnica de prompting que envía una instrucción directa al modelo sin proporcionar ejemplos previos, evaluando la capacidad del modelo de comprender y ejecutar la tarea basándose únicamente en sus conocimientos preentrenados.

## Requerimientos

### Requerimiento 1: Nivelación Conceptual y Glosario Técnico de IA Generativa (Documento Separado)

**User Story:** Como participante del laboratorio, quiero disponer de un documento de referencia separado con los conceptos fundamentales de IA Generativa, para poder consultarlo antes y durante la ejecución del laboratorio sin interrumpir el flujo de las instrucciones prácticas.

#### Criterios de Aceptación

1. THE Guia_Conceptos_IA_Generativa SHALL existir como un archivo separado `CONCEPTOS-IA-GENERATIVA.md` dentro de la carpeta del laboratorio, con la siguiente estructura:
   - Título con un único emoji al inicio (ej. "🧠 Conceptos Fundamentales de IA Generativa")
   - Índice (tabla de contenidos) con enlaces de ancla a cada sección
   - Secciones organizadas en orden pedagógico de lo básico a lo avanzado
   - Formato consistente con el estilo del README del laboratorio según las Directrices_Laboratorio

2. THE Guia_Conceptos_IA_Generativa SHALL definir qué es la IA_Generativa como punto de partida conceptual, incluyendo:
   - Definición: Rama de la inteligencia artificial que produce contenido nuevo y original (texto, código, imágenes, audio) a partir de instrucciones en lenguaje natural, en contraste con el ML tradicional que clasifica o predice sobre datos existentes.
   - Distinción clave: Mientras que un modelo de ML tradicional (Lab 01) responde "¿Lloverá mañana? → Sí/No", un modelo generativo puede responder "Escribe un informe técnico sobre las condiciones sísmicas de la región andina" produciendo texto completamente nuevo.
   - Nota: La IA Generativa no "entiende" el contenido como un humano; genera respuestas estadísticamente probables basadas en patrones aprendidos durante el preentrenamiento con grandes volúmenes de datos.

3. THE Guia_Conceptos_IA_Generativa SHALL definir los Conceptos Arquitectónicos de IA Generativa, incluyendo:
   - Foundation_Model (FM): Modelo de IA de propósito general entrenado con grandes volúmenes de datos (texto, imágenes, código) que puede adaptarse a diversas tareas como generación de texto, resumen, traducción y razonamiento.
   - LLM (Large Language Model): Tipo específico de FM especializado en entender y generar texto en lenguaje natural. Ejemplos: Anthropic Claude, Meta Llama.
   - Context_Window (Ventana de Contexto): Límite máximo de información (en tokens) que el modelo puede "recordar" o procesar en una sola interacción, incluyendo el prompt de entrada y la respuesta generada.
   - Inferencia: Proceso de enviar un prompt al modelo entrenado y recibir una respuesta generada en tiempo de ejecución. A diferencia del entrenamiento (que ajusta los parámetros del modelo), la inferencia utiliza el modelo tal como está para producir resultados.

4. THE Guia_Conceptos_IA_Generativa SHALL explicar el mecanismo de Prediccion_Siguiente_Token como base para comprender el funcionamiento interno de los LLMs, incluyendo:
   - Concepto: Un LLM genera texto prediciendo iterativamente el siguiente token más probable dado todo el contexto previo (el prompt del usuario más los tokens ya generados). La respuesta completa se construye token a token, como si el modelo "escribiera" una palabra a la vez.
   - Distribución de probabilidad: En cada paso, el modelo calcula una distribución de probabilidad sobre todo su vocabulario (decenas de miles de tokens posibles) y selecciona uno. Esta selección es donde los parámetros Temperature y Top_P intervienen directamente: Temperature controla cuánto se "aplana" o "agudiza" la distribución, y Top_P limita el subconjunto de tokens candidatos.
   - Implicación práctica: Esto explica por qué el modelo puede generar respuestas diferentes ante el mismo prompt (cuando Temperature > 0), y por qué con Temperature = 0 la respuesta tiende a ser determinista (siempre selecciona el token de mayor probabilidad).

5. THE Guia_Conceptos_IA_Generativa SHALL definir los conceptos de Prompt y System_Prompt, incluyendo:
   - Prompt (Prompt de usuario): Instrucción o entrada de texto que el usuario envía al modelo para obtener una respuesta. La calidad, claridad y estructura del prompt determina directamente la calidad de la respuesta generada. Este concepto es la base de la disciplina de "Prompt Engineering" que se practica en este laboratorio.
   - System_Prompt (Prompt de sistema): Instrucciones de comportamiento que configuran el rol, tono, restricciones y contexto del modelo antes de la conversación con el usuario. En Amazon Bedrock Playgrounds, el system prompt se configura en un campo separado y persiste durante toda la sesión. Ejemplo: "Eres un geofísico experto en sismología. Responde siempre con datos técnicos y cita fuentes cuando sea posible."
   - Diferencia clave: El system prompt define "quién es" el modelo y cómo debe comportarse; el prompt del usuario define "qué debe hacer" en cada interacción específica.

6. THE Guia_Conceptos_IA_Generativa SHALL explicar las Familias de Modelos disponibles en Amazon Bedrock, incluyendo:
   - Concepto de marketplace: Amazon Bedrock actúa como un marketplace unificado que proporciona acceso a Foundation_Models de múltiples proveedores a través de una sola API, sin necesidad de gestionar infraestructura.
   - Familias principales utilizadas en este laboratorio:
     - Anthropic Claude: Familia de modelos reconocida por su capacidad de razonamiento, seguimiento de instrucciones complejas y generación de texto extenso y coherente.
     - Meta Llama: Familia de modelos de código abierto con buen balance entre rendimiento y eficiencia, disponible en múltiples tamaños.
   - Criterios de selección: Cada familia tiene fortalezas distintas en términos de razonamiento, velocidad de respuesta, costo por token y tamaño de Context_Window. La elección del modelo depende del caso de uso específico (precisión técnica vs. velocidad vs. costo).
   - Nota: Amazon Bedrock también ofrece modelos de Amazon (Titan), Cohere, AI21 Labs, Stability AI y otros proveedores, aunque este laboratorio se enfoca en Anthropic Claude y Meta Llama.

7. THE Guia_Conceptos_IA_Generativa SHALL clarificar las Unidades y Métricas de procesamiento, incluyendo:
   - Token: Unidad básica de procesamiento de texto. Nota técnica: 1000 tokens equivalen aproximadamente a 750 palabras en inglés. En el contexto de Amazon Bedrock, el token es la unidad de facturación (costo por millón de tokens de entrada y salida).
   - Latencia vs. Throughput: Diferencia entre el tiempo que tarda el primer token en aparecer (Latencia, vital para aplicaciones interactivas como chatbots) y la velocidad total de generación de tokens por segundo (Throughput, relevante para procesamiento por lotes).

8. THE Guia_Conceptos_IA_Generativa SHALL detallar los Parámetros de Configuración (Hyperparameters de Inferencia) disponibles en Amazon Bedrock, incluyendo:
   - Temperature: Controla la aleatoriedad de las respuestas. Valores cercanos a 0 hacen al modelo determinista (respuestas consistentes y predecibles, ideal para reportes técnicos y análisis sísmicos). Valores cercanos a 1 introducen mayor variabilidad y creatividad.
   - Top_P (Nucleus Sampling): Limita la selección de tokens a un subconjunto acumulativo de alta probabilidad. Se utiliza junto con Temperature para afinar la coherencia del texto generado.
   - Max_Generation (Longitud Máxima): Límite forzado de tokens de salida para controlar costos y evitar respuestas excesivamente largas.

9. THE Guia_Conceptos_IA_Generativa SHALL estandarizar las Estrategias de Prompting, incluyendo:
   - Zero_Shot: Instrucción directa sin ejemplos previos. El modelo responde basándose únicamente en su conocimiento preentrenado.
   - Few_Shot: Inclusión de ejemplos de entrada/salida en el prompt para enseñar al modelo un formato o patrón específico (ej. clasificación de eventos sísmicos en formato JSON).
   - Chain_of_Thought (CoT): Técnica que solicita al modelo "pensar paso a paso" para mejorar el razonamiento lógico-matemático, desglosando problemas complejos en pasos intermedios antes de dar la respuesta final.

10. THE Guia_Conceptos_IA_Generativa SHALL definir los conceptos de Seguridad y Riesgos de IA Generativa, incluyendo:
   - Alucinacion (Hallucination): Respuesta factualmente incorrecta generada con alta confianza y coherencia gramatical. En el contexto de geofísica, un modelo podría inventar datos de magnitud sísmica o atribuir terremotos a fallas geológicas inexistentes con total convicción.
   - Prompt_Injection / Jailbreaking: Intento malicioso de manipular el prompt para que el modelo ignore sus directrices de seguridad y revele información prohibida o ejecute instrucciones no autorizadas.
   - PII (Personally Identifiable Information): Datos personales sensibles que deben ser ofuscados antes o después de la inferencia para proteger la privacidad de los individuos.

11. THE Guia_Conceptos_IA_Generativa SHALL explicar la diferencia entre IA Generativa y Machine Learning Tradicional:
   - ML Tradicional (Lab 01): Modelos entrenados con datos específicos para una tarea concreta (ej. predecir lluvia). Requieren dataset etiquetado y entrenamiento personalizado.
   - IA Generativa (Lab 02): Modelos preentrenados de propósito general que generan contenido nuevo (texto, código, imágenes) a partir de instrucciones en lenguaje natural. No requieren entrenamiento por parte del usuario.
   - Nota: Amazon Bedrock proporciona acceso a Foundation_Models preentrenados, mientras que SageMaker Canvas (Lab 01) permite entrenar modelos personalizados con datos propios.

12. THE Guia_Conceptos_IA_Generativa SHALL incluir menciones breves de conceptos avanzados para dar visión de futuro al participante, incluyendo:
   - Embedding (Representación Vectorial): Explicar brevemente que los modelos de lenguaje representan internamente el texto como vectores numéricos (embeddings) en un espacio matemático de alta dimensión. Esto permite al modelo capturar relaciones semánticas: por ejemplo, los vectores de "terremoto" y "sismo" estarán cercanos en este espacio, mientras que "terremoto" y "receta de cocina" estarán distantes. Los embeddings son el puente conceptual entre el mundo numérico del ML (Lab 01) y el mundo textual de la IA Generativa (Lab 02).
   - Multimodalidad (mención breve): Explicar que los Foundation_Models modernos no se limitan a texto. Algunos modelos disponibles en Amazon Bedrock pueden procesar y generar múltiples tipos de datos (imágenes, audio, video) en una misma interacción. Aunque este laboratorio se enfoca en modelos de texto (LLMs), la multimodalidad es una tendencia creciente relevante para aplicaciones como el análisis de imágenes satelitales o la interpretación de sismogramas visuales.

13. THE Guia_Conceptos_IA_Generativa SHALL utilizar terminología de IA Generativa consistente con la Documentacion_AWS oficial de Amazon Bedrock, verificando que los nombres de funcionalidades, parámetros y conceptos coincidan con los utilizados en la documentación del servicio.

14. THE Guia_Laboratorio SHALL referenciar la Guia_Conceptos_IA_Generativa en los siguientes puntos:
   - Al inicio del README, antes de las instrucciones paso a paso, indicando: "Antes de comenzar, revise la [Guía de Conceptos Fundamentales de IA Generativa](CONCEPTOS-IA-GENERATIVA.md) para familiarizarse con los términos y conceptos que se utilizarán durante el laboratorio."
   - En cada paso del laboratorio donde un concepto teórico sea relevante, incluir un enlace contextual a la sección correspondiente de la Guia_Conceptos_IA_Generativa (ej. al ajustar Temperature, enlazar a la sección de Parámetros de Configuración).

### Requerimiento 2: Comparativa de Modelos y Detección de Alucinaciones en Contexto Geofísico

**User Story:** Como geofísico evaluando modelos de IA, quiero comparar simultáneamente las respuestas de diferentes Modelos Fundacionales ante una consulta técnica de sismología, para determinar cuál modelo ofrece mayor precisión, síntesis y adaptación de tono en el dominio científico.

#### Criterios de Aceptación

1. WHEN el Participante acceda al Chat_Playground de Amazon Bedrock, THE Guia_Laboratorio SHALL indicar los pasos para seleccionar un modelo de la familia Meta Llama y un modelo de la familia Anthropic Claude en el modo de comparación de modelos, describiendo la ruta de navegación explícita en la consola de Amazon Bedrock.

2. WHEN el Participante envíe el prompt de comparación inicial, THE Guia_Laboratorio SHALL especificar el siguiente prompt contextualizado en geofísica para ser enviado a ambos modelos simultáneamente:
   "Explica el concepto de Ondas Sísmicas P y S como si fuera para un estudiante de secundaria de 15 años que nunca ha estudiado geofísica."
   El Participante debe evaluar la capacidad de síntesis, precisión técnica y adaptación de tono de cada modelo.

3. WHEN el Participante ajuste el parámetro Temperature a 0.0, THE Guia_Laboratorio SHALL indicar que se debe enviar el siguiente prompt técnico y verificar que la respuesta es concisa, determinista y técnicamente precisa:
   "Genera una sentencia SQL para listar los 5 eventos sísmicos de mayor magnitud registrados en una tabla denominada 'eventos_sismicos' que contiene las columnas: id, fecha, latitud, longitud, profundidad_km, magnitud, escala."
   El Participante debe verificar que con Temperature 0.0 la respuesta es consistente y sin texto innecesario.

4. WHEN el Participante ajuste el parámetro Temperature a 0.9, THE Guia_Laboratorio SHALL indicar que se debe repetir el mismo prompt SQL del criterio anterior y observar si el modelo añade variaciones, texto explicativo adicional o estructuras alternativas no solicitadas, comprendiendo el impacto de la aleatoriedad en tareas de generación de código.

5. THE Guia_Laboratorio SHALL incluir una sección de análisis comparativo donde el Participante documente las diferencias observadas entre los modelos Meta Llama y Anthropic Claude en términos de: precisión técnica en geofísica, capacidad de adaptación de tono, y comportamiento ante variaciones de Temperature.

### Requerimiento 3: Técnicas de Prompting Avanzado con Ejemplos de Geofísica y Sismología

**User Story:** Como geofísico evaluando modelos de IA, quiero aplicar técnicas de prompting progresivamente más sofisticadas (Zero-Shot, Few-Shot y Chain-of-Thought) con ejemplos del dominio sísmico, para comprender cómo estructurar instrucciones que mejoren la precisión y el razonamiento de los modelos de IA generativa.

#### Criterios de Aceptación

1. WHEN el Participante aplique la técnica Zero_Shot, THE Guia_Laboratorio SHALL especificar el siguiente prompt directo sin ejemplos previos:
   "Clasifica este reporte sísmico: Se registró un evento de magnitud 4.2 con epicentro a 15 km de profundidad en la zona de subducción de la costa central. Los sismógrafos detectaron ondas P seguidas de ondas S con un intervalo de 8 segundos."
   El Participante debe observar la variabilidad de la clasificación y el nivel de detalle de la respuesta sin guía de formato.

2. WHEN el Participante aplique la técnica Few_Shot, THE Guia_Laboratorio SHALL especificar un prompt que incluya exactamente 3 ejemplos de clasificación de eventos sísmicos en formato JSON antes de solicitar la clasificación de un cuarto caso, con la siguiente estructura de ejemplos:
   - Ejemplo 1 (Sismo Tectónico): `{"reporte": "Magnitud 6.1, profundidad 35 km, zona de falla transformante", "clasificacion": "Sismo_Tectonico", "nivel_alerta": "Moderado"}`
   - Ejemplo 2 (Sismo Volcánico): `{"reporte": "Magnitud 2.3, profundidad 5 km, bajo cono volcánico activo, tremor armónico previo", "clasificacion": "Sismo_Volcanico", "nivel_alerta": "Vigilancia"}`
   - Ejemplo 3 (Sismo Inducido): `{"reporte": "Magnitud 3.1, profundidad 2 km, zona de extracción de fluidos geotermales, patrón de enjambre", "clasificacion": "Sismo_Inducido", "nivel_alerta": "Monitoreo"}`
   - Caso a clasificar: "Magnitud 5.4, profundidad 80 km, zona de subducción de placa oceánica bajo placa continental, mecanismo focal de tipo inverso."
   El Participante debe validar que el modelo imita estrictamente el formato JSON de los ejemplos proporcionados.

3. WHEN el Participante aplique la técnica Chain_of_Thought, THE Guia_Laboratorio SHALL especificar el siguiente prompt de razonamiento cuantitativo en geofísica:
   "Un sismógrafo registra la llegada de ondas P a las 14:32:10 UTC y la llegada de ondas S a las 14:32:18 UTC. Sabiendo que las ondas P viajan a 6 km/s y las ondas S viajan a 3.5 km/s en corteza continental, calcula la distancia aproximada al epicentro. Piensa paso a paso y explica cada parte del cálculo antes de dar el resultado final."
   El Participante debe validar que el modelo no da el número directamente, sino que desglosa: (a) el cálculo del intervalo S-P, (b) la aplicación de la fórmula de distancia usando la diferencia de velocidades, y (c) el resultado final con unidades. Esto permite al geofísico auditar la lógica de razonamiento de la IA.

4. THE Guia_Laboratorio SHALL incluir una tabla comparativa de las tres técnicas de prompting (Zero_Shot, Few_Shot, Chain_of_Thought) con las siguientes columnas: Técnica, Cuándo usarla, Ventaja principal, Limitación principal, y Ejemplo de aplicación en geofísica.

5. THE Guia_Laboratorio SHALL documentar los prompts de ejemplo de las tres técnicas como Archivos_Soporte en un archivo separado `prompts-geofisica.md` dentro de la carpeta del laboratorio, para que los Participantes puedan copiarlos directamente sin necesidad de transcribirlos manualmente desde el README.

### Requerimiento 4: Gestión de Parámetros de Inferencia y Comprensión de Costos

**User Story:** Como geofísico evaluando modelos de IA para uso en producción, quiero comprender el impacto de los parámetros de inferencia (Temperature, Top-P, Max Generation) en la calidad y costo de las respuestas, para tomar decisiones informadas sobre la configuración óptima según el tipo de tarea.

#### Criterios de Aceptación

1. THE Guia_Laboratorio SHALL explicar el impacto práctico de cada parámetro de inferencia en el contexto de tareas geofísicas:
   - Temperature 0.0: Ideal para generación de código SQL de consultas sísmicas, cálculos de distancia epicentral y reportes técnicos estandarizados donde la consistencia es crítica.
   - Temperature 0.7-0.9: Adecuado para generación de descripciones narrativas de eventos sísmicos, resúmenes divulgativos y contenido educativo donde se desea variedad de expresión.
   - Max_Generation bajo (ej. 256 tokens): Apropiado para clasificaciones y respuestas cortas de alta precisión.
   - Max_Generation alto (ej. 2048 tokens): Necesario para análisis detallados, reportes completos y explicaciones paso a paso (Chain_of_Thought).

2. WHEN el Participante configure los parámetros de inferencia en el Chat_Playground, THE Guia_Laboratorio SHALL describir la ubicación exacta de los controles de Temperature, Top_P y Max_Generation en la interfaz de Amazon Bedrock, incluyendo los rangos de valores permitidos para cada parámetro.

3. THE Guia_Laboratorio SHALL incluir una nota sobre el modelo de costos de Amazon Bedrock, explicando que el costo se calcula por tokens de entrada (prompt) más tokens de salida (respuesta), y que el parámetro Max_Generation controla el límite máximo de tokens de salida para evitar costos inesperados.

### Requerimiento 5: Exploración de Alucinaciones en el Dominio Geofísico

**User Story:** Como geofísico evaluando la confiabilidad de modelos de IA, quiero identificar y documentar casos de alucinación en respuestas sobre geofísica y sismología, para comprender los riesgos de usar IA generativa sin validación experta en aplicaciones científicas críticas.

#### Criterios de Aceptación

1. WHEN el Participante evalúe la confiabilidad de los modelos, THE Guia_Laboratorio SHALL indicar que se debe enviar el siguiente prompt diseñado para detectar alucinaciones en el dominio geofísico:
   "¿Cuál fue la magnitud exacta y las coordenadas del epicentro del terremoto de Pisco, Perú, del 15 de agosto de 2007? Proporciona también el número exacto de réplicas registradas en las primeras 24 horas."
   El Participante debe comparar la respuesta del modelo con datos verificables del IGP (Instituto Geofísico del Perú) y USGS, identificando si el modelo inventa datos específicos con aparente confianza.

2. THE Guia_Laboratorio SHALL explicar por qué las alucinaciones son especialmente peligrosas en aplicaciones geofísicas críticas, incluyendo:
   - Sistemas de alerta temprana de tsunamis: Una magnitud incorrecta puede activar o suprimir alertas de manera errónea.
   - Evaluación de riesgo sísmico: Datos de profundidad o mecanismo focal incorrectos pueden llevar a evaluaciones de daño estructural equivocadas.
   - Investigación científica: Citas de estudios o datos sísmicos inventados pueden contaminar la literatura científica.

3. THE Guia_Laboratorio SHALL indicar las estrategias de mitigación de alucinaciones disponibles en Amazon Bedrock, incluyendo el uso de Retrieval Augmented Generation (RAG) con bases de datos sísmicas verificadas como fuente de verdad, y la importancia de validar siempre las respuestas del modelo contra fuentes oficiales como el IGP, USGS y el ISC (International Seismological Centre).

### Requerimiento 6: Validación de Contenido contra Documentación Oficial de AWS

**User Story:** Como participante del laboratorio, quiero que todas las instrucciones, pasos de navegación y configuraciones del laboratorio estén validadas contra la documentación oficial de AWS, para evitar confusiones causadas por información desactualizada o incorrecta.

#### Criterios de Aceptación

1. THE Guia_Laboratorio SHALL validar todos los pasos de navegación en la consola de Amazon Bedrock contra la Documentacion_AWS utilizando el MCP_Server_AWS_Docs, verificando que las rutas de menú, nombres de botones y flujos de la interfaz reflejen la versión actual de la consola de AWS.

2. THE Guia_Laboratorio SHALL validar que los nombres de los modelos de Meta Llama y Anthropic Claude disponibles en Amazon Bedrock Playgrounds sean correctos y estén disponibles en la región de AWS utilizada para el laboratorio, consultando la Documentacion_AWS para confirmar la disponibilidad regional de cada modelo.

3. THE Guia_Laboratorio SHALL validar que los rangos de valores de los parámetros Temperature, Top_P y Max_Generation descritos en el laboratorio coincidan con los rangos actuales soportados por los modelos seleccionados en Amazon Bedrock, según la Documentacion_AWS oficial.

4. THE Guia_Laboratorio SHALL validar que la terminología en español utilizada en las instrucciones sea consistente con la interfaz en español de la consola de AWS y con la Documentacion_AWS oficial, incluyendo nombres de servicios, opciones de menú y mensajes del sistema.

5. IF la Guia_Laboratorio contiene instrucciones que difieren de la Documentacion_AWS actual, THEN THE Guia_Laboratorio SHALL documentar la desviación con una justificación explícita del motivo de la diferencia.

6. THE Guia_Laboratorio SHALL utilizar el MCP_Server_AWS_Docs para buscar la documentación específica de Amazon Bedrock Playgrounds y verificar que los nombres de parámetros, valores de configuración y recomendaciones de seguridad sean precisos y estén actualizados.

### Requerimiento 7: README Principal del Proyecto con Tabla de Laboratorios

**User Story:** Como participante del programa AWS AI Essentials, quiero disponer de un README principal en la raíz del proyecto que liste todos los laboratorios de la serie (Lab 01 a Lab 05) con sus descripciones y tiempos estimados, para tener una visión completa del programa y navegar fácilmente entre los laboratorios.

#### Criterios de Aceptación

1. THE README_Principal SHALL existir como el archivo `README.md` en la raíz del proyecto, con la siguiente estructura obligatoria según las Directrices_Laboratorio:
   - Título principal con un único emoji al inicio: "☁️ AWS AI Essentials"
   - Descripción general del programa de laboratorios
   - Resumen de objetivos de aprendizaje del programa completo
   - Prerrequisitos o dependencias generales del programa
   - Tabla de laboratorios con columnas: Número de Lab (con enlace a la carpeta), Título, Descripción, Tiempo Estimado
   - Sección de contenido adicional (Documentación AWS, AWS Skill Builder, AWS Certification, comunidad)
   - Sección de contribuciones
   - Licencia MIT: "Este proyecto está licenciado bajo la Licencia MIT. Copyright © 2026 AMBER CLOUD GLOBAL LLC"

2. THE README_Principal SHALL incluir en la tabla de laboratorios las siguientes entradas para los 5 laboratorios de la serie:
   - Lab 01: Machine Learning No-Code con Amazon SageMaker Canvas (40 min)
   - Lab 02: IA Generativa con Amazon Bedrock Playgrounds (40 min)
   - Lab 03: [Pendiente - por definir en especificaciones futuras]
   - Lab 04: [Pendiente - por definir en especificaciones futuras]
   - Lab 05: [Pendiente - por definir en especificaciones futuras]
   Los laboratorios 03, 04 y 05 deben aparecer en la tabla con estado "Próximamente" hasta que sus especificaciones sean definidas.

3. THE README_Principal SHALL incluir enlaces funcionales a las carpetas de los laboratorios completados (Lab 01 y Lab 02) y marcadores de posición para los laboratorios pendientes (Lab 03, 04 y 05).

4. THE README_Principal SHALL ser escrito completamente en español, manteniendo en inglés únicamente los nombres de servicios AWS, parámetros técnicos y nombres de archivos, según las Directrices_Laboratorio.

### Requerimiento 8: Estructura y Cumplimiento de Directrices de Documentación

**User Story:** Como participante del laboratorio, quiero que la documentación del laboratorio cumpla con todas las directrices de estructura, formato y organización establecidas, para tener una experiencia de aprendizaje consistente, navegable y completa.

#### Criterios de Aceptación

1. THE Guia_Laboratorio SHALL iniciar las instrucciones paso a paso con la verificación de región de AWS como primer paso, indicando al Participante que confirme la región correcta en la esquina superior derecha de la consola de AWS antes de proceder con cualquier otra acción.

2. THE Guia_Laboratorio SHALL incluir un índice (tabla de contenidos) con enlaces de ancla a cada sección del documento, permitiendo la navegación directa a cualquier parte del laboratorio.

3. THE Guia_Laboratorio SHALL incluir al final una sección de "Solución de Problemas" que referencie al Documento_Troubleshooting separado (`TROUBLESHOOTING.md`), indicando que el Participante debe consultar dicho documento ante dificultades y que los errores de permisos IAM o límites de cuota requieren asistencia del instructor.

4. THE Guia_Laboratorio SHALL especificar el ciclo de vida de los recursos creados durante el laboratorio, indicando que Amazon Bedrock Playgrounds no crea recursos persistentes que deban eliminarse, pero que el Participante debe ser consciente del costo por tokens generados durante la experimentación.

5. THE Guia_Laboratorio SHALL proporcionar el archivo de soporte `prompts-geofisica.md` como un Archivo_Soporte separado dentro de la carpeta del laboratorio, y las instrucciones deben referenciar este archivo explícitamente por su nombre y ruta relativa.

6. THE Guia_Laboratorio SHALL incluir puntos de verificación visual después de cada paso mayor de configuración o experimentación, permitiendo al Participante confirmar que el resultado obtenido coincide con el esperado antes de continuar.

7. THE Guia_Laboratorio SHALL incluir el título del laboratorio con un único emoji al inicio, seguido del tiempo estimado de finalización y los objetivos de aprendizaje, cumpliendo con las reglas de uso de emojis definidas en las Directrices_Laboratorio.

8. THE Guia_Laboratorio SHALL incluir una sección de prerrequisitos que liste los recursos necesarios antes de iniciar el laboratorio, incluyendo el acceso a Amazon Bedrock con los modelos de Meta Llama y Anthropic Claude habilitados, y la disponibilidad del archivo `prompts-geofisica.md`.

9. THE Guia_Laboratorio SHALL incluir la Guia_Conceptos_IA_Generativa (`CONCEPTOS-IA-GENERATIVA.md`) como un Archivo_Soporte dentro de la carpeta del laboratorio, referenciándolo explícitamente en la sección de prerrequisitos y al inicio de las instrucciones paso a paso.

10. THE Guia_Laboratorio SHALL indicar que este laboratorio es independiente del Lab 01 (SageMaker Canvas) y no requiere recursos creados en ese laboratorio, aunque forma parte de la misma serie progresiva de 5 laboratorios AWS AI Essentials.

11. WHEN el Participante necesite habilitar el acceso a modelos en Amazon Bedrock, THE Guia_Laboratorio SHALL incluir instrucciones para solicitar acceso a los modelos de Meta Llama y Anthropic Claude a través de la sección "Model access" de Amazon Bedrock, indicando que este proceso puede requerir aprobación previa y que el instructor debe confirmar que los modelos están habilitados antes de iniciar el laboratorio.
