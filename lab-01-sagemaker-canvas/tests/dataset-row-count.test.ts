// Feature: lab-01-sagemaker-canvas, Property 3: Invariante de cantidad de registros del dataset
// **Validates: Requirements 2.4**

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = resolve(__dirname, '..', 'weather-forecast-data.csv');

function parseCSVRowCount(csvContent: string): number {
  const lines = csvContent.trim().split(/\r?\n/);
  // First line is the header, the rest are data rows
  return lines.length - 1;
}

describe('Property 3: Invariante de cantidad de registros del dataset', () => {
  const csvContent = readFileSync(csvPath, 'utf-8');

  it('el archivo CSV debe tener exactamente 400 filas de datos (excluyendo encabezado)', () => {
    fc.assert(
      fc.property(fc.constant(csvContent), (content) => {
        const rowCount = parseCSVRowCount(content);
        expect(rowCount).toBe(400);
      }),
      { numRuns: 100 },
    );
  });
});
