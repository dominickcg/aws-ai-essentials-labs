# Prompts de Geofísica — Laboratorio 2: IA Generativa con Amazon Bedrock Playgrounds

Archivo de soporte con todos los prompts de ejemplo del laboratorio. Copie cada prompt directamente en Amazon Bedrock Playgrounds sin necesidad de transcribirlos manualmente desde el README.

---

## Indice

1. [Prompt de comparación de modelos](#1-prompt-de-comparación-de-modelos)
2. [Prompt SQL de eventos sísmicos](#2-prompt-sql-de-eventos-sísmicos)
3. [System prompt de geofísico experto](#3-system-prompt-de-geofísico-experto)
4. [Prompt Zero-Shot](#4-prompt-zero-shot)
5. [Prompt Few-Shot](#5-prompt-few-shot)
6. [Prompt Chain-of-Thought](#6-prompt-chain-of-thought)
7. [Prompt de alucinaciones](#7-prompt-de-alucinaciones)

---

## 1. Prompt de comparación de modelos

Utilice este prompt en el Chat Playground de Amazon Bedrock para comparar simultáneamente las respuestas de Meta Llama y Anthropic Claude. Evalúe la capacidad de síntesis, precisión técnica y adaptación de tono de cada modelo.

```
Explica el concepto de Ondas Sísmicas P y S como si fuera para un estudiante de secundaria de 15 años que nunca ha estudiado geofísica.
```

---

## 2. Prompt SQL de eventos sísmicos

Utilice este prompt para explorar el impacto del parámetro Temperature. Envíelo primero con Temperature 0.0 y luego con Temperature 0.9, observando las diferencias en la respuesta generada.

```
Genera una sentencia SQL para listar los 5 eventos sísmicos de mayor magnitud registrados en una tabla denominada 'eventos_sismicos' que contiene las columnas: id, fecha, latitud, longitud, profundidad_km, magnitud, escala.
```

---

## 3. System prompt de geofísico experto

Configure este system prompt en el campo correspondiente del Chat Playground antes de enviar los prompts del laboratorio. El system prompt persiste durante toda la sesión y define el rol del modelo.

```
Eres un geofísico experto en sismología. Responde siempre con datos técnicos y cita fuentes cuando sea posible.
```

---

## 4. Prompt Zero-Shot

Técnica Zero-Shot: instrucción directa sin ejemplos previos. El modelo responde basándose únicamente en su conocimiento preentrenado. Observe la variabilidad de la clasificación y el nivel de detalle de la respuesta.

```
Clasifica este reporte sísmico: Se registró un evento de magnitud 4.2 con epicentro a 15 km de profundidad en la zona de subducción de la costa central. Los sismógrafos detectaron ondas P seguidas de ondas S con un intervalo de 8 segundos.
```

---

## 5. Prompt Few-Shot

Técnica Few-Shot: incluye 3 ejemplos de clasificación en formato JSON antes de solicitar la clasificación de un nuevo caso. El modelo debe imitar estrictamente el formato de los ejemplos proporcionados.

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

---

## 6. Prompt Chain-of-Thought

Técnica Chain-of-Thought: solicita al modelo razonar paso a paso antes de dar el resultado final. Valide que el modelo desglosa el cálculo en pasos intermedios: (a) intervalo S-P, (b) fórmula de distancia usando diferencia de velocidades, y (c) resultado final con unidades.

```
Un sismógrafo registra la llegada de ondas P a las 14:32:10 UTC y la llegada de ondas S a las 14:32:18 UTC. Sabiendo que las ondas P viajan a 6 km/s y las ondas S viajan a 3.5 km/s en corteza continental, calcula la distancia aproximada al epicentro. Piensa paso a paso y explica cada parte del cálculo antes de dar el resultado final.
```

---

## 7. Prompt de alucinaciones

Utilice este prompt para detectar alucinaciones en el dominio geofísico. Compare la respuesta del modelo con datos verificables del IGP (Instituto Geofísico del Perú) y USGS, identificando si el modelo inventa datos específicos con aparente confianza.

```
¿Cuál fue la magnitud exacta y las coordenadas del epicentro del terremoto de Pisco, Perú, del 15 de agosto de 2007? Proporciona también el número exacto de réplicas registradas en las primeras 24 horas.
```
