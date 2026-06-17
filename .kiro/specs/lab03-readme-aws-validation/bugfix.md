# Documento de Requerimientos de Bugfix

## Introducción

Las instrucciones paso a paso del archivo `lab-03-bedrock-rag/README.md` (Laboratorio 3 — RAG con Amazon Bedrock Knowledge Bases) no coinciden con la interfaz real de la consola de AWS. Los participantes que siguen la guía encuentran discrepancias entre lo descrito en el README y lo que ven en la consola, lo que genera confusión y bloquea el avance del laboratorio. Este bugfix requiere verificar exhaustivamente cada paso del README contra la documentación oficial de AWS y corregir todas las discrepancias encontradas.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN un participante sigue el Paso 2 (Verificar Service-Linked Role de IAM) THEN las instrucciones de navegación en la consola de IAM y los pasos para verificar el rol pueden no coincidir con la interfaz actual de la consola de AWS (nombres de secciones, ubicación de elementos, terminología en español)

1.2 WHEN un participante sigue el Paso 3 (Crear Bucket S3) THEN las opciones de configuración descritas (secciones de cifrado, disposición de campos, opciones predeterminadas) pueden no reflejar la interfaz actual de creación de buckets en la consola de S3

1.3 WHEN un participante sigue el Paso 4 (Cargar Documentos Geofísicos) THEN los pasos de carga de archivos y las opciones de la interfaz de S3 pueden no coincidir con la experiencia actual de la consola

1.4 WHEN un participante sigue el Paso 5 (Crear Knowledge Base) THEN el flujo de creación del wizard de Knowledge Bases en Amazon Bedrock puede diferir significativamente de lo descrito — incluyendo la disposición de secciones, nombres de campos, opciones de configuración de Data Source, modelo de embeddings y vector store que se presentan durante el wizard de creación

1.5 WHEN un participante sigue el Paso 6 (Configurar Data Source) THEN las instrucciones para configurar el Data Source pueden no reflejar el flujo real, ya que la configuración del Data Source podría estar integrada en el wizard de creación de la Knowledge Base (Paso 5) en lugar de ser un paso separado posterior

1.6 WHEN un participante sigue el Paso 7 (Sincronización) THEN las instrucciones para iniciar la sincronización y los indicadores de estado pueden no coincidir con la interfaz actual de la consola de Amazon Bedrock

1.7 WHEN un participante sigue el Paso 8 (Seleccionar Modelo de Generación) THEN la ubicación de la ventana de prueba, el selector de modelo y las opciones disponibles pueden no coincidir con la interfaz actual de la consola de Amazon Bedrock Knowledge Bases

1.8 WHEN un participante sigue los Pasos 9 y 10 (Consultas RAG y Verificar Citas) THEN la descripción de la interfaz de prueba, la forma de enviar consultas y la presentación de citas/referencias pueden no coincidir con la experiencia actual de la consola

### Expected Behavior (Correct)

2.1 WHEN un participante sigue el Paso 2 (Verificar Service-Linked Role de IAM) THEN las instrucciones SHALL coincidir exactamente con la navegación y terminología actual de la consola de IAM según la documentación oficial de AWS, incluyendo nombres de secciones y ubicación de elementos en la interfaz

2.2 WHEN un participante sigue el Paso 3 (Crear Bucket S3) THEN las instrucciones SHALL reflejar con precisión la interfaz actual de creación de buckets en la consola de S3, incluyendo la disposición correcta de secciones, nombres de campos y opciones de cifrado según la documentación oficial de AWS

2.3 WHEN un participante sigue el Paso 4 (Cargar Documentos Geofísicos) THEN las instrucciones SHALL coincidir con la interfaz actual de carga de archivos en S3 según la documentación oficial de AWS

2.4 WHEN un participante sigue el Paso 5 (Crear Knowledge Base) THEN las instrucciones SHALL reflejar con precisión el wizard actual de creación de Knowledge Bases en Amazon Bedrock, incluyendo todos los pasos del wizard, la disposición de campos, las opciones de configuración de Data Source, modelo de embeddings y vector store según la documentación oficial de AWS

2.5 WHEN un participante sigue el Paso 6 (Configurar Data Source) THEN las instrucciones SHALL reflejar el flujo real de configuración del Data Source — ya sea integrado en el wizard de creación (Paso 5) o como paso separado — según la documentación oficial de AWS, y el README SHALL ser reestructurado si el flujo real difiere del descrito

2.6 WHEN un participante sigue el Paso 7 (Sincronización) THEN las instrucciones SHALL coincidir con la interfaz actual para iniciar la sincronización y los indicadores de estado según la documentación oficial de AWS

2.7 WHEN un participante sigue el Paso 8 (Seleccionar Modelo de Generación) THEN las instrucciones SHALL reflejar con precisión la ubicación de la ventana de prueba, el selector de modelo y las opciones disponibles según la interfaz actual de Amazon Bedrock Knowledge Bases documentada oficialmente

2.8 WHEN un participante sigue los Pasos 9 y 10 (Consultas RAG y Verificar Citas) THEN las instrucciones SHALL coincidir con la interfaz actual de la ventana de prueba, la forma de enviar consultas y la presentación de citas/referencias según la documentación oficial de AWS

### Unchanged Behavior (Regression Prevention)

3.1 WHEN el README describe los objetivos de aprendizaje, prerrequisitos y la introducción del laboratorio THEN el sistema SHALL CONTINUE TO mantener este contenido intacto, ya que no depende de la interfaz de la consola de AWS

3.2 WHEN el README referencia archivos de soporte (prompts-rag.md, CONCEPTOS-RAG.md, documentos-geofisicos/) THEN el sistema SHALL CONTINUE TO mantener todas las referencias y enlaces relativos correctos e intactos

3.3 WHEN el README utiliza el placeholder `{nombre-participante}` en nombres de recursos THEN el sistema SHALL CONTINUE TO usar esta convención de nomenclatura consistentemente en todos los pasos

3.4 WHEN el README incluye los prompts de prueba RAG copiados del archivo prompts-rag.md THEN el sistema SHALL CONTINUE TO incluir los mismos prompts exactos en los bloques de código de las consultas

3.5 WHEN el README incluye la sección de Solución de Problemas THEN el sistema SHALL CONTINUE TO mantener las instrucciones de diagnóstico y las referencias al instructor

3.6 WHEN el README incluye checkpoints de verificación visual (✓ Verificación) después de cada paso THEN el sistema SHALL CONTINUE TO incluir checkpoints de verificación después de cada paso principal

3.7 WHEN el README incluye la nota de conservación de recursos para el Lab 04 THEN el sistema SHALL CONTINUE TO mantener esta advertencia intacta

3.8 WHEN el README sigue las directrices de formato del workspace (emojis, estructura, terminología en español) THEN el sistema SHALL CONTINUE TO cumplir con todas las reglas definidas en `directrices-laboratorios.md`
