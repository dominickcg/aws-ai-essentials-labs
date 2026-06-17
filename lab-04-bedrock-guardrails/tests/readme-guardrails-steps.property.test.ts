// Feature: lab-04-bedrock-guardrails, Property 2: Renumeración secuencial de pasos
// **Validates: Requirements 2.5**

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');

const readmeContent = readFileSync(resolve(labRoot, 'README.md'), 'utf-8');

const stepHeadingPattern = /^###\s+Paso\s+(\d+)/gm;
const stepNumbers: number[] = [];
let match: RegExpExecArray | null;
while ((match = stepHeadingPattern.exec(readmeContent)) !== null) {
  stepNumbers.push(parseInt(match[1], 10));
}

describe('Property 2: Renumeración secuencial de pasos en el README del Lab 04', () => {
  it('cada número de paso debe ser >= 1 y no exceder el total de pasos (sin numeración obsoleta 14-22)', () => {
    expect(stepNumbers.length).toBeGreaterThan(0);

    const totalSteps = stepNumbers.length;

    fc.assert(
      fc.property(fc.constantFrom(...stepNumbers), (stepNum) => {
        expect(stepNum, `El paso ${stepNum} es menor que 1`).toBeGreaterThanOrEqual(1);
        expect(
          stepNum > totalSteps,
          `El paso ${stepNum} excede el total de pasos (${totalSteps}), posible numeración obsoleta`,
        ).toBe(false);
      }),
      { numRuns: 100 },
    );
  });

  it('la secuencia de pasos debe ser consecutiva comenzando desde 1', () => {
    expect(stepNumbers.length).toBeGreaterThan(0);
    expect(stepNumbers[0], 'La secuencia debe comenzar en 1').toBe(1);

    for (let i = 1; i < stepNumbers.length; i++) {
      expect(
        stepNumbers[i],
        `El paso ${stepNumbers[i]} no es consecutivo al paso ${stepNumbers[i - 1]}`,
      ).toBe(stepNumbers[i - 1] + 1);
    }
  });
});
