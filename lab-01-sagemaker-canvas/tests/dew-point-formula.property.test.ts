// Feature: lab-01-sagemaker-canvas, Property 6: Correctitud de la fórmula del Punto de Rocío Aproximado
// **Validates: Requirements 4.2**

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

function calcularPuntoRocioAproximado(temperatura: number, humedad: number): number {
  return temperatura - ((100 - humedad) / 5);
}

describe('Property 6: Correctitud de la fórmula del Punto de Rocío Aproximado', () => {
  it('debe producir el resultado correcto para pares aleatorios (Temperatura, Humedad)', () => {
    fc.assert(
      fc.property(
        fc.float({ min: -40, max: 50, noNaN: true }),
        fc.float({ min: 0, max: 100, noNaN: true }),
        (temperatura, humedad) => {
          const resultado = calcularPuntoRocioAproximado(temperatura, humedad);
          const esperado = temperatura - ((100 - humedad) / 5);
          expect(resultado).toBeCloseTo(esperado, 10);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('el resultado debe ser siempre menor o igual a la Temperatura original', () => {
    fc.assert(
      fc.property(
        fc.float({ min: -40, max: 50, noNaN: true }),
        fc.float({ min: 0, max: 100, noNaN: true }),
        (temperatura, humedad) => {
          const resultado = calcularPuntoRocioAproximado(temperatura, humedad);
          expect(resultado).toBeLessThanOrEqual(temperatura);
        },
      ),
      { numRuns: 100 },
    );
  });
});
