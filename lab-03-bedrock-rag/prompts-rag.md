# Prompts de Prueba — Knowledge Base RAG

Archivo de soporte con los prompts de prueba para verificar el funcionamiento de la Knowledge Base RAG de Amazon Bedrock. Copie cada prompt directamente desde los bloques de código para usarlos en la ventana de prueba de la Knowledge Base.

---

## Prompts de Prueba RAG

### Prompt 1 — Consulta sobre datos sísmicos específicos

Consulta diseñada para recuperar datos concretos del reporte de actividad sísmica (magnitudes, profundidades, ubicaciones de eventos).

```
¿Cuáles fueron los eventos sísmicos más significativos registrados y cuáles fueron sus magnitudes, profundidades y ubicaciones?
```

### Prompt 2 — Síntesis de múltiples documentos

Consulta que requiere combinar información del reporte de actividad sísmica y los procedimientos de monitoreo para generar una respuesta integrada.

```
¿Cómo se relacionan los procedimientos de monitoreo sísmico del IGP con la detección y análisis de los eventos sísmicos recientes documentados?
```

### Prompt 3 — Consulta técnica sobre terminología geofísica

Consulta que busca información del glosario técnico para verificar la recuperación de definiciones y conceptos del dominio.

```
Explica qué es la zona de Wadati-Benioff y cuál es su relevancia para la sismicidad en el Perú.
```

### Prompt 4 — Consulta sobre protocolos y umbrales de alerta

Consulta que busca información específica de los procedimientos de monitoreo sobre los niveles de alerta sísmica y las acciones requeridas.

```
¿Cuáles son los niveles de alerta sísmica definidos por el IGP y qué acciones se requieren para cada nivel según los procedimientos de monitoreo?
```

### Prompt 5 — Consulta fuera de dominio

Consulta sobre un tema que NO está contenido en los documentos geofísicos indexados, para verificar que el modelo indica la falta de información en lugar de alucinar una respuesta.

```
¿Cuáles son las principales erupciones volcánicas registradas en el Perú durante los últimos 10 años y qué impacto tuvieron en las comunidades cercanas?
```
