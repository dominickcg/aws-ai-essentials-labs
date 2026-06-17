### **Laboratorio 4.2: IA Generativa con Amazon Bedrock Playgrounds**

**Duración:** 40 minutos.

**Objetivo principal:** Comparar el comportamiento de Modelos Fundacionales (FMs) ante instrucciones simples y complejas.

**Requerimiento 1: Nivelación Conceptual y Glosario Técnico de IA Generativa (Ubiquitous)**

El sistema deberá proveer un marco conceptual y glosario extendido en la guía del laboratorio para estandarizar el conocimiento sobre arquitectura de modelos, parámetros de inferencia y vectores de ataque antes de la interacción práctica.

* **Criterio de Aceptación 1.1:** La guía debe definir los Conceptos Arquitectónicos:  
  * Foundation Model (FM): Modelo de IA de propósito general entrenado con grandes volúmenes de datos que puede adaptarse a diversas tareas.  
  * LLM (Large Language Model): Tipo específico de FM especializado en entender y generar texto.  
  * Ventana de Contexto (Context Window): Límite máximo de información (en tokens) que el modelo puede "recordar" o procesar en una sola interacción.  
  * Inferencia: El proceso de enviar un dato al modelo entrenado y recibir una predicción o respuesta (tiempo de ejecución).  
* **Criterio de Aceptación 1.2:** Se deben clarificar las Unidades y Métricas:  
  * Token: Unidad básica de procesamiento. Nota técnica: 1000 tokens equivalen aprox. a 750 palabras en inglés. En el BCRP se debe entender esto como la unidad de facturación (costo por millón de tokens).  
  * Latencia vs. Throughput: Diferencia entre el tiempo que tarda el primer token en aparecer (vital para chat) y la velocidad de generación total.  
* **Criterio de Aceptación 1.3:** La guía debe detallar los Parámetros de Configuración (Hyperparameters) disponibles en Bedrock:  
  * Temperatura (Temperature): Controla la "creatividad". Valores cercanos a 0 hacen al modelo determinista (siempre la misma respuesta, ideal para reportes financieros). Valores cercanos a 1 introducen aleatoriedad.  
  * Top-P (Nucleus Sampling): Limita la selección de palabras a un subconjunto de alta probabilidad. Se usa junto a la temperatura para afinar la coherencia del texto.  
  * Longitud Máxima (Max Generation): Límite forzado de tokens de salida para controlar costos y evitar respuestas infinitas.  
* **Criterio de Aceptación 1.4:** Se deben estandarizar las Estrategias de Prompting:  
  * Zero-Shot: Instrucción directa sin contexto previo.  
  * Few-Shot: Inclusión de ejemplos (input/output) para enseñar al modelo un formato específico (ej. JSON bancario).  
  * Chain-of-Thought (CoT): Técnica que solicita al modelo "pensar paso a paso" para mejorar el razonamiento lógico-matemático.  
* **Criterio de Aceptación 1.5:** Se deben definir los conceptos de Seguridad y Riesgos:  
  * Alucinación (Hallucination): Respuesta factualmente incorrecta generada con alta confianza y coherencia gramatical.  
  * Prompt Injection / Jailbreaking: Intento malicioso de manipular el prompt para que el modelo ignore sus directrices de seguridad y revele información prohibida.  
  * PII (Personally Identifiable Information): Datos sensibles que deben ser ofuscados antes o después de la inferencia.

#### **Parte 1: Experimentación y "Prompt Engineering" (25 min)**

**Contexto:** Los participantes actuarán como "AI Engineers" evaluando qué modelo responde mejor a consultas de índole técnica y económica.

**Requerimiento 2: Comparativa de Modelos y Alucinaciones (Ubiquitous)**  
El sistema deberá permitir la comparación simultánea de resultados de inferencia entre diferentes familias de modelos ajustando parámetros de aleatoriedad.

* **Criterio de Aceptación 2.1:** En el "Chat Playground", seleccionar un modelo de Meta Llama y un modelo de Anthropic Claude. Enviar el siguiente prompt a ambos: "Explica el concepto de Encaje Legal Bancario como si fuera para un niño de 10 años". Evaluar la capacidad de síntesis y adaptación de tono de cada uno.  
* **Criterio de Aceptación 2.2:** Modificar el parámetro de Temperatura (Temperature):  
  * Configurarlo a **0.0** y preguntar: "Genera una sentencia SQL para listar las 5 transacciones más altas para una tabla  denominada 'movimientos'". Verificar que la respuesta es concisa y técnica.  
  * Configurarlo a **0.9** y repetir la pregunta, observando si el modelo añade texto innecesario o variaciones creativas no deseadas para código.

**Requerimiento 3: Técnicas de Prompting Avanzado (Ubiquitous)**  
El sistema deberá soportar el uso de técnicas de "Few-Shot" y "Chain-of-Thought" para mejorar la precisión y el razonamiento lógico de las respuestas del modelo.

* **Criterio de Aceptación 3.1 (Zero-Shot):** Enviar una instrucción directa sin ejemplos: "Clasifica este reclamo: Mi cajero no me entregó el dinero completo". Observar la variabilidad de la respuesta.  
* **Criterio de Aceptación 3.2 (Few-Shot):** Proveer una estructura con 3 ejemplos de clasificación en formato JSON (Soporte, Reclamo, Consulta) y pedir la clasificación de un cuarto caso. Validar que el modelo imite estrictamente el formato JSON de los ejemplos.  
* **Criterio de Aceptación 3.3 (Chain-of-Thought \- CoT):** Evaluar la capacidad de razonamiento lógico mediante el siguiente prompt complejo:

	*"Un analista debe calcular el interés total de un bono de 5000 soles con una tasa del 4% anual simple durante 18 meses. **Piensa paso a paso y explica cada parte del cálculo antes de dar el resultado final.**"*

	*Validación*: El modelo no debe dar el número directamente; debe desglosar la conversión de meses a años, la aplicación de la fórmula y finalmente la suma. Esto permite al técnico auditar la "lógica" de la IA.