# Procedimientos de Monitoreo Sísmico — Red Sísmica Nacional del IGP

## Información del Documento

**Versión**: 3.1
**Fecha de aprobación**: 10 de febrero de 2025
**Próxima revisión**: 10 de febrero de 2026
**Responsable del documento**: **Dr. Andrés Felipe Morales Gutiérrez**, Jefe de Operaciones de la Red Sísmica Nacional
- Correo: andres.morales@igp.gob.pe
- Teléfono: +51-923-456-789

---

## Objetivo

Establecer los procedimientos estándar para la operación, mantenimiento y control de calidad de las estaciones sismológicas de la Red Sísmica Nacional del Instituto Geofísico del Perú (IGP). Estos protocolos garantizan la adquisición continua de datos sísmicos con la calidad requerida para la detección, localización y caracterización de eventos sísmicos en el territorio peruano.

---

## Alcance

Estos procedimientos aplican a todas las estaciones sismológicas operadas por el IGP, incluyendo:

- 42 estaciones de banda ancha de la Red Sísmica Nacional
- 15 estaciones acelerométricas en zonas urbanas
- 8 estaciones de monitoreo volcánico
- Centros de procesamiento en Lima (sede central) y Arequipa (sede regional)

---

## Protocolo 1: Operación Diaria de Estaciones Sismológicas

### 1.1 Verificación de Estado de Estaciones

El operador de turno debe realizar las siguientes verificaciones cada 8 horas:

1. Acceder al sistema de monitoreo remoto (SEISCOMP) y verificar el estado de conexión de todas las estaciones.
2. Confirmar que cada estación transmite datos en tiempo real con latencia inferior a 30 segundos.
3. Verificar que los niveles de ruido sísmico de fondo (noise floor) se encuentran dentro de los rangos aceptables según el modelo de ruido de Peterson (NLNM/NHNM).
4. Registrar en la bitácora digital cualquier estación con estado anómalo (desconectada, latencia alta, ruido excesivo).
5. Notificar al coordinador de turno si más de 3 estaciones presentan anomalías simultáneas.

### 1.2 Detección y Localización de Eventos

Cuando el sistema automático de detección registra un evento sísmico:

1. El analista de turno debe revisar la detección automática dentro de los primeros 5 minutos.
2. Verificar las lecturas de tiempo de arribo de ondas P y S en al menos 4 estaciones.
3. Calcular la localización hipocéntrica preliminar utilizando el modelo de velocidades 1D del IGP.
4. Determinar la magnitud local (ML) y, para eventos M ≥ 4.0, calcular la magnitud de momento (Mw).
5. Para eventos percibidos por la población (intensidad ≥ III MM), emitir un reporte preliminar dentro de los primeros 10 minutos.

### 1.3 Emisión de Alertas

Los umbrales de alerta sísmica son los siguientes:

| Nivel de Alerta | Magnitud (Mw) | Profundidad | Acción Requerida |
|-----------------|----------------|-------------|------------------|
| Verde           | < 4.0          | Cualquiera  | Registro en bitácora, sin alerta pública |
| Amarillo        | 4.0 — 5.4      | < 60 km     | Reporte interno en 10 min, notificación a INDECI si es percibido |
| Naranja         | 5.5 — 6.9      | < 100 km    | Reporte público en 5 min, activación de protocolo de réplicas |
| Rojo            | ≥ 7.0          | < 100 km    | Alerta inmediata, activación de protocolo de emergencia nacional |

La coordinadora de alertas y comunicaciones es la **Ing. Lucía Fernanda Torres Paredes**, contacto: lucia.torres@igp.gob.pe, teléfono: +51-956-123-456.

---

## Protocolo 2: Transmisión y Almacenamiento de Datos

### 2.1 Canales de Transmisión

Las estaciones de la Red Sísmica Nacional utilizan los siguientes canales de transmisión de datos:

- **Enlace satelital VSAT**: Utilizado por 28 estaciones en zonas remotas de la Cordillera de los Andes y la selva amazónica. Ancho de banda: 64 kbps por estación. Proveedor: Hughes Network Systems.
- **Enlace celular 4G/LTE**: Utilizado por 10 estaciones en zonas con cobertura celular. Ancho de banda: 512 kbps. Operadores: Claro y Movistar.
- **Enlace de fibra óptica**: Utilizado por 4 estaciones urbanas (NNA, CHO, Lima Centro, Callao). Ancho de banda: 10 Mbps.

### 2.2 Formato de Datos

Los datos sísmicos se adquieren y almacenan en los siguientes formatos:

- **MiniSEED**: Formato estándar de la Federación Internacional de Redes Sismológicas Digitales (FDSN) para formas de onda continuas. Tasa de muestreo: 100 Hz para banda ancha, 200 Hz para acelerómetros.
- **QuakeML**: Formato XML estándar para catálogos de eventos sísmicos, incluyendo parámetros hipocentrales, magnitudes y mecanismos focales.
- **StationXML**: Formato de metadatos de estaciones que incluye respuesta instrumental, coordenadas y períodos de operación.

### 2.3 Respaldo y Redundancia

- Los datos en tiempo real se almacenan en el servidor primario del Centro Nacional de Datos Sísmicos (CNDS) en la sede del IGP en Ate, Lima.
- Un respaldo automático se realiza cada 6 horas al servidor secundario ubicado en la sede regional de Arequipa.
- Los datos históricos se archivan mensualmente en almacenamiento de largo plazo y se comparten con el IRIS Data Management Center (DMC) para acceso internacional.

---

## Protocolo 3: Mantenimiento de Estaciones

### 3.1 Mantenimiento Preventivo

El mantenimiento preventivo se realiza según el siguiente calendario:

| Componente | Frecuencia | Actividades |
|------------|------------|-------------|
| Sensor sismológico | Trimestral | Verificación de nivelación, calibración de respuesta, limpieza de conectores |
| Sistema de adquisición (digitalizador) | Semestral | Actualización de firmware, verificación de sincronización GPS, prueba de canales |
| Sistema de energía (paneles solares + baterías) | Trimestral | Limpieza de paneles, medición de voltaje de baterías, verificación de regulador de carga |
| Sistema de comunicaciones | Semestral | Alineación de antena satelital, verificación de señal, prueba de throughput |
| Infraestructura física (caseta, cerco) | Anual | Inspección estructural, pintura anticorrosiva, verificación de pararrayos |

### 3.2 Mantenimiento Correctivo

Ante una falla detectada en una estación:

1. El operador de turno registra la falla en el sistema de tickets con prioridad (Crítica, Alta, Media, Baja).
2. El coordinador de mantenimiento asigna un técnico de campo dentro de las primeras 24 horas para fallas críticas.
3. El técnico realiza el diagnóstico remoto antes de la visita de campo cuando es posible.
4. Durante la intervención en campo, el técnico documenta el procedimiento con fotografías y registros en la bitácora de mantenimiento.
5. Después de la reparación, se verifica la calidad de datos durante 24 horas antes de declarar la estación operativa.

### 3.3 Inventario de Repuestos

Se mantiene un inventario mínimo de repuestos en la sede central del IGP:

- 4 sensores de banda ancha (2 STS-2, 2 Trillium Compact)
- 6 digitalizadores Centaur (Nanometrics)
- 10 baterías de ciclo profundo 100 Ah
- 8 paneles solares de 150 W
- 4 módems satelitales VSAT de repuesto
- Cableado, conectores y herramientas de campo

---

## Protocolo 4: Control de Calidad de Datos Sísmicos

### 4.1 Control de Calidad en Tiempo Real

El sistema automático de control de calidad evalúa continuamente:

- **Continuidad temporal**: Detección de gaps (interrupciones) en el flujo de datos. Un gap superior a 60 segundos genera una alerta automática.
- **Nivel de ruido**: Comparación del espectro de potencia (PSD) de cada estación contra el modelo de ruido de Peterson. Estaciones con ruido por encima del NHNM (New High Noise Model) se marcan para revisión.
- **Calibración instrumental**: Verificación periódica de la respuesta del sensor mediante inyección de señales de calibración.
- **Sincronización temporal**: Verificación de la precisión del reloj GPS. Desviaciones superiores a 10 ms generan una alerta.

### 4.2 Control de Calidad Post-Procesamiento

El analista de calidad realiza las siguientes verificaciones semanales:

1. Revisión de la completitud de datos: porcentaje de datos disponibles por estación (objetivo: ≥ 95%).
2. Análisis de espectros de ruido para identificar fuentes de ruido antropogénico o instrumental.
3. Verificación de la consistencia de localizaciones automáticas vs. manuales (residuos de tiempo de viaje < 1.5 s).
4. Generación de reportes de calidad mensuales con métricas de disponibilidad, latencia y precisión.

### 4.3 Métricas de Desempeño

Las métricas clave de desempeño de la Red Sísmica Nacional son:

| Métrica | Objetivo | Período de Evaluación |
|---------|----------|-----------------------|
| Disponibilidad de estaciones | ≥ 95% | Mensual |
| Latencia de datos en tiempo real | < 30 s | Diario |
| Precisión de localización epicentral | ± 5 km (M ≥ 3.0) | Trimestral |
| Precisión de profundidad focal | ± 8 km (M ≥ 3.0) | Trimestral |
| Tiempo de emisión de reporte preliminar | < 10 min (M ≥ 4.0) | Por evento |
| Magnitud de completitud de la red | Mc ≤ 3.5 | Anual |

---

## Protocolo 5: Procedimientos de Emergencia

### 5.1 Activación del Protocolo de Emergencia

Ante un sismo de magnitud M ≥ 6.0 con profundidad focal menor a 100 km:

1. El sistema automático emite una alerta sonora y visual en el Centro de Operaciones.
2. El analista de turno confirma los parámetros del evento en un máximo de 3 minutos.
3. Se activa la cadena de comunicación: Director de Sismología → INDECI → Medios de comunicación.
4. Se inicia el monitoreo intensivo de réplicas con reportes cada 30 minutos durante las primeras 6 horas.
5. Se despliegan equipos portátiles de campo en la zona epicentral dentro de las primeras 12 horas.

### 5.2 Evaluación de Tsunami

Para sismos costeros con M ≥ 7.0 y profundidad focal menor a 60 km:

1. Se calcula el potencial tsunamigénico basado en la magnitud, profundidad y mecanismo focal.
2. Se notifica inmediatamente a la Dirección de Hidrografía y Navegación (DHN) de la Marina de Guerra del Perú.
3. Se activa el monitoreo de mareógrafos en la costa peruana.
4. Se coordina con el Pacific Tsunami Warning Center (PTWC) para la evaluación regional.

---

## Registro de Revisiones

| Versión | Fecha | Autor | Descripción del Cambio |
|---------|-------|-------|------------------------|
| 1.0 | 2020-03-15 | Dr. Andrés Felipe Morales Gutiérrez | Versión inicial del documento |
| 2.0 | 2022-08-20 | Ing. Lucía Fernanda Torres Paredes | Actualización de protocolos de alerta y comunicaciones |
| 3.0 | 2024-01-10 | Dr. Andrés Felipe Morales Gutiérrez | Incorporación de estaciones acelerométricas y protocolo de tsunami |
| 3.1 | 2025-02-10 | Dr. Andrés Felipe Morales Gutiérrez | Actualización de umbrales de alerta y métricas de desempeño |

---

*Instituto Geofísico del Perú (IGP) — Calle Badajoz 169, Mayorazgo IV Etapa, Ate, Lima, Perú*
*Documento de uso interno de la Dirección de Sismología. Distribución controlada.*
