// Feature: lab-01-sagemaker-canvas — Pruebas unitarias de casos de borde para la fórmula del Punto de Rocío
// **Validates: Requirements 4.2, 3.2**

import { describe, it, expect } from 'vitest';

function calcularPuntoRocioAproximado(temperatura: number, humedad: number): number {
  return temperatura - ((100 - humedad) / 5);
}

function calcularPuntoRocioSeguro(
  temperatura: number | null | undefined,
  humedad: number | null | undefined,
): number | null {
  if (temperatura == null || humedad == null) {
    return null;
  }
  return calcularPuntoRocioAproximado(temperatura, humedad);
}

describe('Casos de borde: fórmula del Punto de Rocío Aproximado', () => {
  it('Humedad = 0 produce Temperatura - 20', () => {
    const resultado = calcularPuntoRocioAproximado(25, 0);
    expect(resultado).toBe(5);
  });

  it('Humedad = 100 produce exactamente la Temperatura (punto de rocío = temperatura)', () => {
    const resultado = calcularPuntoRocioAproximado(25, 100);
    expect(resultado).toBe(25);
  });

  it('Fila con valor nulo en Temperatura debe ser rechazada (retorna null)', () => {
    const resultado = calcularPuntoRocioSeguro(null, 50);
    expect(resultado).toBeNull();
  });

  it('Fila con valor undefined en Temperatura debe ser rechazada (retorna null)', () => {
    const resultado = calcularPuntoRocioSeguro(undefined, 50);
    expect(resultado).toBeNull();
  });

  it('Fila con valor nulo en Humedad debe ser rechazada (retorna null)', () => {
    const resultado = calcularPuntoRocioSeguro(25, null);
    expect(resultado).toBeNull();
  });
});
