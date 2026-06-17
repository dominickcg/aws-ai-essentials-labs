# Validación del README del Lab 03 contra AWS — Diseño de Bugfix

## Resumen

El archivo `lab-03-bedrock-rag/README.md` contiene instrucciones paso a paso para crear una Knowledge Base en Amazon Bedrock con RAG. Las instrucciones pueden no coincidir con la interfaz actual de la consola de AWS, lo que genera confusión en los participantes. El enfoque de corrección consiste en verificar cada paso contra la documentación oficial de AWS usando el servidor MCP de documentación de AWS, corregir las discrepancias encontradas, y validar el resultado con tests automatizados usando vitest + fast-check.

## Glosario

- **Bug_Condition (C)**: La condición que dispara el bug — cuando las instrucciones de un paso del README no coinciden con la interfaz real de la consola de AWS
- **Property (P)**: El comportamiento deseado — cada paso del README describe con precisión la navegación, terminología y opciones de la consola de AWS actual
- **Preservation**: Contenido existente que no depende de la interfaz de AWS y debe permanecer intacto (objetivos, prerrequisitos, referencias a archivos, placeholders, checkpoints, prompts RAG, nota de conservación de recursos, formato según directrices)
- **README**: El archivo `lab-03-bedrock-rag/README.md` que contiene la guía paso a paso del laboratorio
- **Paso**: Cada sección numerada (Paso 1 a Paso 10) del README que describe una acción en la consola de AWS
- **Wizard de Knowledge Base**: El flujo de creación de Knowledge Bases en Amazon Bedrock que puede incluir configuración de Data Source, modelo de embeddings y vector store en un solo flujo
- **MCP AWS Docs**: El servidor MCP `mcp_awslabsaws_documentation_mcp_server` que permite consultar la documentación oficial de AWS

## Detalles del Bug

### Bug Condition

El bug se manifiesta cuando un participante sigue cualquiera de los Pasos 2-10 del README y las instrucciones no coinciden con la interfaz actual de la consola de AWS. Esto incluye: nombres de secciones incorrectos, ubicación de elementos diferente, opciones de configuración desactualizadas, flujos de wizard que han cambiado, o terminología que no coincide con la interfaz en español.

**Especificación Formal:**
```
FUNCTION isBugCondition(input)
  INPUT: input de tipo { pasoNumero: number, instruccionTexto: string, consolaAWSActual: AWSConsoleState }
  OUTPUT: boolean
  
  RETURN input.pasoNumero IN [2, 3, 4, 5, 6, 7, 8, 9, 10]
         AND instruccionDescribeNavegacionConsola(input.instruccionTexto)
         AND NOT coincideConInterfazActual(input.instruccionTexto, input.consolaAWSActual)
END FUNCTION
```

### Ejemplos

- **Paso 5 (Crear Knowledge Base)**: El README describe la configuración de Data Source, modelo de embeddings y vector store como campos separados en el wizard, pero el wizard actual de Amazon Bedrock puede presentar estos en un flujo diferente con pasos/secciones distintas
- **Paso 6 (Configurar Data Source)**: El README describe la configuración del Data Source como un paso separado posterior a la creación de la KB, pero en la interfaz actual la configuración del Data Source podría estar integrada en el wizard de creación (Paso 5), haciendo que el Paso 6 sea redundante o necesite reestructuración
- **Paso 3 (Crear Bucket S3)**: Las secciones de cifrado y la disposición de campos en la interfaz de creación de buckets pueden haber cambiado respecto a lo descrito
- **Paso 8 (Seleccionar Modelo)**: La ubicación de la ventana de prueba, el selector de modelo y las opciones disponibles pueden diferir de lo descrito

## Comportamiento Esperado

### Requisitos de Preservación

**Comportamientos que NO deben cambiar:**
- El contenido introductorio del README (título, descripción, objetivos de aprendizaje, prerrequisitos) debe permanecer intacto
- Todas las referencias a archivos de soporte (`prompts-rag.md`, `CONCEPTOS-RAG.md`, `documentos-geofisicos/`) deben mantenerse correctas
- El placeholder `{nombre-participante}` debe usarse consistentemente en todos los nombres de recursos
- Los prompts RAG exactos copiados de `prompts-rag.md` en los bloques de código de consultas deben permanecer idénticos
- La sección de Solución de Problemas debe mantenerse intacta
- Los checkpoints de verificación visual (`✓ Verificación`) deben existir después de cada paso principal
- La nota de conservación de recursos para el Lab 04 debe permanecer intacta
- El formato debe cumplir con las directrices de `directrices-laboratorios.md` (emojis, estructura, terminología en español)
- Los anchor links del índice deben corresponder a encabezados existentes en el documento

**Alcance:**
Todo el contenido que NO describe navegación o interacción con la consola de AWS debe permanecer completamente inalterado. Esto incluye:
- Texto conceptual y explicaciones teóricas
- Referencias a documentos de conceptos (CONCEPTOS-RAG.md)
- Bloques de código con prompts de prueba
- Notas de tiempo estimado
- Advertencias e instrucciones para el instructor

## Causa Raíz Hipotética

Basado en el análisis del bug, las causas más probables son:

1. **Flujo del Wizard de Knowledge Base desactualizado (Pasos 5-6)**: El wizard de creación de Knowledge Bases en Amazon Bedrock ha evolucionado y puede integrar la configuración del Data Source, modelo de embeddings y vector store en un flujo unificado, haciendo que el Paso 6 (Configurar Data Source por separado) sea incorrecto o redundante
   - La sección **Orchestration** en el panel de navegación puede haberse renombrado
   - Los campos y secciones del wizard pueden tener nombres o disposición diferente
   - La opción "Quick create a new vector store" puede haberse renombrado o reubicado

2. **Terminología de la consola S3 desactualizada (Pasos 3-4)**: La interfaz de creación de buckets S3 y carga de archivos puede haber cambiado
   - Las secciones de cifrado pueden tener nombres o disposición diferente
   - Los botones y opciones pueden haberse renombrado

3. **Interfaz de IAM desactualizada (Paso 2)**: La navegación en la consola de IAM para verificar roles puede haber cambiado
   - La disposición del panel de navegación puede ser diferente
   - La forma de visualizar entidades de confianza y permisos puede haber cambiado

4. **Ventana de prueba de Knowledge Base desactualizada (Pasos 8-10)**: La interfaz de prueba de Knowledge Bases puede haber cambiado
   - La ubicación del selector de modelo puede ser diferente
   - La forma de presentar citas y referencias puede haber cambiado

5. **Reestructuración de pasos necesaria**: Si el Data Source se configura dentro del wizard de creación de la KB, los Pasos 5-10 actuales necesitarían renumerarse, lo que afectaría el índice y los anchor links

## Propiedades de Correctitud

Property 1: Bug Condition - Instrucciones del README coinciden con la consola de AWS

_Para cualquier_ paso del README (Pasos 2-10) que describe navegación o interacción con la consola de AWS, las instrucciones corregidas SHALL coincidir con la interfaz actual de la consola de AWS según la documentación oficial, incluyendo nombres de secciones, disposición de campos, opciones de configuración y terminología en español.

**Valida: Requerimientos 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8**

Property 2: Preservation - Contenido no dependiente de la consola AWS

_Para cualquier_ contenido del README que NO describe navegación o interacción con la consola de AWS (objetivos, prerrequisitos, referencias a archivos, placeholders, prompts RAG, checkpoints, nota de conservación, formato), el README corregido SHALL mantener este contenido idéntico al original, preservando todas las referencias, formato y convenciones existentes.

**Valida: Requerimientos 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8**

## Implementación del Fix

### Cambios Requeridos

Asumiendo que nuestro análisis de causa raíz es correcto:

**Archivo**: `lab-03-bedrock-rag/README.md`

**Cambios Específicos**:

1. **Verificar y corregir Paso 2 (IAM)**: Usar el MCP de AWS Docs para verificar la navegación en la consola de IAM. Corregir nombres de secciones, ubicación de elementos y terminología si difieren de la interfaz actual.

2. **Verificar y corregir Paso 3 (Crear Bucket S3)**: Usar el MCP de AWS Docs para verificar el flujo de creación de buckets S3. Corregir la disposición de secciones de cifrado y opciones de configuración.

3. **Verificar y corregir Paso 4 (Cargar Documentos)**: Usar el MCP de AWS Docs para verificar el flujo de carga de archivos en S3. Corregir botones y opciones si han cambiado.

4. **Verificar y corregir Paso 5 (Crear Knowledge Base)**: Usar el MCP de AWS Docs para verificar el wizard actual de creación de Knowledge Bases. Esta es la área con mayor probabilidad de discrepancias. Corregir:
   - Nombre de la sección en el panel de navegación
   - Campos y secciones del wizard
   - Opciones de Data Source, modelo de embeddings y vector store
   - Determinar si la configuración del Data Source está integrada en el wizard

5. **Evaluar y reestructurar Paso 6 (Data Source)**: Si la configuración del Data Source está integrada en el wizard del Paso 5, fusionar el contenido del Paso 6 en el Paso 5 y renumerar los pasos subsiguientes. Si es un paso separado, corregir las instrucciones según la interfaz actual.

6. **Verificar y corregir Pasos 7-10 (Sync, Modelo, Consultas, Citas)**: Usar el MCP de AWS Docs para verificar la interfaz de sincronización, ventana de prueba, selector de modelo y presentación de citas.

7. **Actualizar índice y anchor links**: Si se reestructuran los pasos (fusión del Paso 6), actualizar el índice del README para reflejar la nueva numeración y asegurar que todos los anchor links sean válidos.

## Estrategia de Testing

### Enfoque de Validación

La estrategia de testing sigue un enfoque de dos fases: primero, identificar contraejemplos que demuestren el bug en el código sin corregir, luego verificar que el fix funciona correctamente y preserva el comportamiento existente.

### Exploración del Bug Condition

**Objetivo**: Identificar contraejemplos que demuestren las discrepancias ANTES de implementar el fix. Confirmar o refutar el análisis de causa raíz. Si refutamos, necesitaremos re-hipotetizar.

**Plan de Test**: Usar el servidor MCP de documentación de AWS para consultar la documentación oficial de cada servicio involucrado (IAM, S3, Amazon Bedrock Knowledge Bases). Comparar las instrucciones del README actual con la documentación oficial para identificar discrepancias concretas.

**Casos de Test**:
1. **Test de navegación IAM (Paso 2)**: Verificar contra docs oficiales que la navegación descrita para verificar roles IAM coincide con la interfaz actual (fallará si hay discrepancias)
2. **Test de creación S3 (Paso 3)**: Verificar contra docs oficiales que el flujo de creación de buckets y opciones de cifrado coinciden (fallará si hay discrepancias)
3. **Test de wizard KB (Paso 5)**: Verificar contra docs oficiales que el wizard de creación de Knowledge Bases coincide con lo descrito (alta probabilidad de fallo)
4. **Test de Data Source separado (Paso 6)**: Verificar si la configuración del Data Source es realmente un paso separado o está integrada en el wizard (fallará si está integrada)
5. **Test de ventana de prueba (Pasos 8-10)**: Verificar contra docs oficiales la interfaz de prueba y presentación de citas (fallará si hay discrepancias)

**Contraejemplos Esperados**:
- El wizard de Knowledge Base tiene pasos/secciones diferentes a los descritos
- La configuración del Data Source está integrada en el wizard, no es un paso separado
- Posibles causas: evolución de la interfaz de AWS, renombramiento de secciones, reorganización de flujos

### Fix Checking

**Objetivo**: Verificar que para todas las instrucciones donde existía una discrepancia, el README corregido describe con precisión la interfaz actual de AWS.

**Pseudocódigo:**
```
FOR ALL paso WHERE isBugCondition(paso) DO
  resultado := verificarContraDocsAWS(paso.instruccionCorregida)
  ASSERT coincideConDocumentacionOficial(resultado)
END FOR
```

### Preservation Checking

**Objetivo**: Verificar que para todo el contenido que NO describe navegación en la consola de AWS, el README corregido produce el mismo resultado que el original.

**Pseudocódigo:**
```
FOR ALL contenido WHERE NOT isBugCondition(contenido) DO
  ASSERT contenidoOriginal(contenido) = contenidoCorregido(contenido)
END FOR
```

**Enfoque de Testing**: Se recomienda property-based testing para la verificación de preservación porque:
- Genera muchos casos de test automáticamente sobre el dominio de entrada
- Detecta casos borde que los tests unitarios manuales podrían omitir
- Proporciona garantías sólidas de que el comportamiento no cambió para todos los inputs no afectados por el bug

**Plan de Test**: Observar el comportamiento del README sin corregir para contenido no relacionado con la consola (referencias, placeholders, checkpoints, formato), luego escribir property-based tests que capturen ese comportamiento.

**Casos de Test**:
1. **Preservación de referencias a archivos**: Verificar que todas las referencias a `prompts-rag.md`, `CONCEPTOS-RAG.md` y `documentos-geofisicos/` siguen siendo correctas y los archivos existen
2. **Preservación de placeholders**: Verificar que `{nombre-participante}` se usa consistentemente en todos los nombres de recursos
3. **Preservación de checkpoints**: Verificar que cada paso principal tiene un checkpoint `✓ Verificación`
4. **Preservación de anchor links**: Verificar que todos los anchor links del índice corresponden a encabezados existentes

### Unit Tests

- Verificar que el README contiene todas las secciones requeridas (título, índice, objetivos, prerrequisitos, pasos, solución de problemas)
- Verificar que los prompts RAG en los bloques de código coinciden exactamente con los de `prompts-rag.md`
- Verificar que la nota de conservación de recursos para Lab 04 existe
- Verificar que la sección de Solución de Problemas referencia `TROUBLESHOOTING.md`
- Verificar que los pasos están numerados secuencialmente
- Verificar que no existen referencias obsoletas

### Property-Based Tests

- Generar selecciones aleatorias de anchor links del índice y verificar que cada uno corresponde a un encabezado existente en el documento
- Generar selecciones aleatorias de pasos y verificar que cada uno tiene un checkpoint de verificación
- Verificar que el placeholder `{nombre-participante}` aparece en todos los nombres de recursos AWS mencionados en el README
- Verificar la ausencia de referencias obsoletas en todos los archivos Markdown del lab

### Integration Tests

- Verificar la estructura completa del directorio `lab-03-bedrock-rag/` (README.md, CONCEPTOS-RAG.md, prompts-rag.md, documentos-geofisicos/)
- Verificar que las referencias cruzadas entre README.md y los archivos de soporte son bidireccionales y correctas
- Verificar que el contenido del README cumple con todas las directrices de `directrices-laboratorios.md`
