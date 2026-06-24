# Prompts de Negocio — Laboratorio 2: IA Generativa con Amazon Bedrock Playgrounds

Archivo de soporte con todos los prompts de ejemplo del laboratorio, contextualizados en retail y comercio electrónico. Copie cada prompt directamente en Amazon Bedrock Playgrounds sin necesidad de transcribirlos manualmente desde el README.

---

## Indice

1. [Prompt de comparación de modelos](#1-prompt-de-comparación-de-modelos)
2. [Prompt SQL de ventas](#2-prompt-sql-de-ventas)
3. [System prompt de analista de negocio](#3-system-prompt-de-analista-de-negocio)
4. [Prompt Zero-Shot](#4-prompt-zero-shot)
5. [Prompt Few-Shot](#5-prompt-few-shot)
6. [Prompt Chain-of-Thought](#6-prompt-chain-of-thought)
7. [Prompt de alucinaciones](#7-prompt-de-alucinaciones)

---

## 1. Prompt de comparación de modelos

Utilice este prompt en el Chat Playground de Amazon Bedrock para comparar simultáneamente las respuestas de Meta Llama y Anthropic Claude. Evalúe la capacidad de síntesis, precisión técnica y adaptación de tono de cada modelo.

```
Explica el concepto de churn de clientes (tasa de abandono) como si fuera para un vendedor de tienda que nunca ha trabajado con métricas de negocio.
```

---

## 2. Prompt SQL de ventas

Utilice este prompt para explorar el impacto del parámetro Temperature. Envíelo primero con Temperature 0.0 y luego con Temperature 0.9, observando las diferencias en la respuesta generada.

```
Genera una sentencia SQL para listar los 5 productos de mayor ingreso registrados en una tabla denominada 'ventas' que contiene las columnas: id, fecha, id_cliente, producto, categoria, cantidad, monto_total.
```

---

## 3. System prompt de analista de negocio

Configure este system prompt en el campo correspondiente del Chat Playground antes de enviar los prompts del laboratorio. El system prompt persiste durante toda la sesión y define el rol del modelo.

```
Eres un analista de negocio experto en retail y comercio electrónico. Responde siempre con datos cuantitativos y cita fuentes cuando sea posible.
```

---

## 4. Prompt Zero-Shot

Técnica Zero-Shot: instrucción directa sin ejemplos previos. El modelo responde basándose únicamente en su conocimiento preentrenado. Observe la variabilidad de la clasificación y el nivel de detalle de la respuesta.

```
Clasifica esta reseña de cliente: Compré unos audífonos inalámbricos hace dos semanas y dejaron de cargar al cuarto día. Intenté contactar al soporte tres veces por correo y nadie respondió. Pésima experiencia, quiero un reembolso.
```

---

## 5. Prompt Few-Shot

Técnica Few-Shot: incluye 3 ejemplos de clasificación en formato JSON antes de solicitar la clasificación de un nuevo caso. El modelo debe imitar estrictamente el formato de los ejemplos proporcionados.

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

---

## 6. Prompt Chain-of-Thought

Técnica Chain-of-Thought: solicita al modelo razonar paso a paso antes de dar el resultado final. Valide que el modelo desglosa el cálculo en pasos intermedios: (a) cálculo del descuento, (b) precio con descuento aplicado, y (c) precio final con impuesto incluido.

```
Un cliente compra una laptop con precio de lista de 1200 dolares. La tienda aplica un descuento del 15% por temporada y, sobre el precio ya rebajado, se añade un impuesto de ventas (IGV) del 18%. Calcula el precio final que pagará el cliente. Piensa paso a paso y explica cada parte del cálculo antes de dar el resultado final.
```

---

## 7. Prompt de alucinaciones

Utilice este prompt para detectar alucinaciones en el dominio de negocio. Compare la respuesta del modelo con datos verificables del informe anual (10-K) de Amazon y de fuentes oficiales, identificando si el modelo inventa datos específicos con aparente confianza.

```
¿Cuál fue el ingreso neto exacto (net sales) de Amazon en el cuarto trimestre del año fiscal 2007 y en qué fecha exacta se fundó la empresa? Proporciona también el número exacto de empleados que tenía al cierre de ese año.
```
