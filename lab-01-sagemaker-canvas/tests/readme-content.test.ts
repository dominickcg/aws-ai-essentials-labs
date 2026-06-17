// Unit tests for README.md content — verifies presence of required sections and content
// **Validates: Requirements 2.1, 2.2, 2.3, 4.3, 5.2, 5.3, 6.2, 8.3, 8.4, 8.5, 8.8, 8.10**

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const mdPath = resolve(__dirname, '..', 'README.md');

let content: string;

beforeAll(() => {
  content = readFileSync(mdPath, 'utf-8');
});

describe('Contenido de README.md — secciones y elementos requeridos', () => {
  // **Validates: Requirement 2.1**
  it('Diccionario de datos documenta las 9 columnas del CSV', () => {
    const columns = [
      'Fecha',
      'Mes',
      'Temperatura',
      'Humedad',
      'Presion_Atmosferica',
      'Velocidad_Viento',
      'Nubosidad',
      'Precipitacion',
      'Lluvia',
    ];
    for (const col of columns) {
      expect(content).toContain(col);
    }
  });

  // **Validates: Requirement 2.2**
  it('Contexto de aplicación menciona los cuatro sectores clave', () => {
    const lower = content.toLowerCase();
    expect(lower).toContain('planificación agrícola');
    expect(lower).toContain('prevención de desastres');
    expect(lower).toContain('aviación');
    expect(lower).toContain('recursos hídricos');
  });

  // **Validates: Requirement 2.3**
  it('Nota de modelo simplificado menciona SENAMHI, NOAA y ECMWF', () => {
    expect(content).toContain('SENAMHI');
    expect(content).toContain('NOAA');
    expect(content).toContain('ECMWF');
  });

  // **Validates: Requirement 4.3**
  it('Explicación meteorológica del punto de rocío menciona aproximación de Magnus y punto de rocío', () => {
    const lower = content.toLowerCase();
    expect(lower).toContain('aproximación de magnus');
    expect(lower).toContain('punto de rocío');
  });

  // **Validates: Requirement 5.2**
  it('Guía de interpretación identifica Falsos Negativos como error de mayor impacto', () => {
    const lower = content.toLowerCase();
    expect(lower).toContain('falso negativo');
    expect(lower).toContain('mayor impacto');
  });

  // **Validates: Requirement 5.3**
  it('Indica verificar peso del Punto_Rocio_Aproximado en Column impact', () => {
    expect(content).toContain('Punto_Rocio_Aproximado');
    expect(content).toContain('Column impact');
  });

  // **Validates: Requirement 6.2**
  it('Indica localizar código Pandas de la fórmula en el notebook', () => {
    const lower = content.toLowerCase();
    expect(lower).toContain('pandas');
    expect(lower).toContain('fórmula');
  });

  // **Validates: Requirement 8.3**
  it('Sección de Solución de Problemas con enlace a TROUBLESHOOTING.md', () => {
    expect(content).toContain('Solución de Problemas');
    expect(content).toContain('TROUBLESHOOTING.md');
  });

  // **Validates: Requirement 8.4**
  it('Sección de Ciclo de Vida de Recursos', () => {
    expect(content).toContain('Ciclo de Vida de Recursos');
  });

  // **Validates: Requirement 8.5**
  it('Referencia al archivo weather-forecast-data.csv', () => {
    expect(content).toContain('weather-forecast-data.csv');
  });

  // **Validates: Requirement 8.8**
  it('Estimaciones de tiempo con ⏱️ o "minutos"', () => {
    const hasTimeEmoji = content.includes('⏱️');
    const hasMinutos = content.toLowerCase().includes('minutos');
    expect(hasTimeEmoji || hasMinutos).toBe(true);
  });

  // **Validates: Requirement 8.10**
  it('Sección de Prerrequisitos', () => {
    expect(content).toContain('Prerrequisitos');
  });
});
