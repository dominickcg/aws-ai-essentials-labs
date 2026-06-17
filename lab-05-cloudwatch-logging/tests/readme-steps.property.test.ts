// Feature: lab-05-cloudwatch-logging, Property 2: Secuencia estrictamente creciente de pasos
// **Validates: Requirements 7.2, 8.7**

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const readme = readFileSync(resolve(labRoot, 'README.md'), 'utf-8');

// Extract all "### Paso N" step numbers
const stepPattern = /^###\s+Paso\s+(\d+)/gm;
const stepNumbers: number[] = [];
let match: RegExpExecArray | null;
while ((match = stepPattern.exec(readme)) !== null) {
  stepNumbers.push(parseInt(match[1], 10));
}

describe('Property 2: Los pasos "### Paso N" siguen secuencia estrictamente creciente sin saltos', () => {
  it('existen pasos en el README', () => {
    expect(stepNumbers.length).toBeGreaterThan(0);
  });

  it('la secuencia comienza en 1 y es consecutiva sin saltos', () => {
    expect(stepNumbers[0]).toBe(1);
    for (let i = 1; i < stepNumbers.length; i++) {
      expect(
        stepNumbers[i],
        `Paso ${stepNumbers[i]} no es consecutivo al paso ${stepNumbers[i - 1]}`,
      ).toBe(stepNumbers[i - 1] + 1);
    }
  });

  it('cada par consecutivo de pasos tiene diferencia exacta de 1', () => {
    const pairs: Array<[number, number]> = [];
    for (let i = 0; i < stepNumbers.length - 1; i++) {
      pairs.push([stepNumbers[i], stepNumbers[i + 1]]);
    }
    expect(pairs.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(fc.constantFrom(...pairs), ([current, next]) => {
        expect(
          next - current,
          `Salto detectado: Paso ${current} → Paso ${next} (diferencia ${next - current})`,
        ).toBe(1);
      }),
      { numRuns: pairs.length * 5 },
    );
  });

  it('ningún paso excede el total de pasos (sin numeración obsoleta)', () => {
    const totalSteps = stepNumbers.length;
    fc.assert(
      fc.property(fc.constantFrom(...stepNumbers), (stepNum) => {
        expect(stepNum).toBeGreaterThanOrEqual(1);
        expect(stepNum).toBeLessThanOrEqual(totalSteps);
      }),
      { numRuns: 100 },
    );
  });
});
