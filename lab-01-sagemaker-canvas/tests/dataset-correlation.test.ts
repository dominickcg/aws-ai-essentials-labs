// Feature: lab-01-sagemaker-canvas, Property 5: Validez estadística del dataset — correlación con variable objetivo
// **Validates: Requirements 3.3**

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = resolve(__dirname, '..', 'weather-forecast-data.csv');

interface CsvRow {
  Humedad: number;
  Nubosidad: number;
  Precipitacion: number;
  Lluvia: number;
}

function parseCsvRows(csvContent: string): CsvRow[] {
  const lines = csvContent.trim().split(/\r?\n/);
  const header = lines[0].split(',');

  const humIdx = header.indexOf('Humedad');
  const nubIdx = header.indexOf('Nubosidad');
  const precIdx = header.indexOf('Precipitacion');
  const lluviaIdx = header.indexOf('Lluvia');

  return lines.slice(1).map((line) => {
    const cols = line.split(',');
    return {
      Humedad: parseFloat(cols[humIdx]),
      Nubosidad: parseFloat(cols[nubIdx]),
      Precipitacion: parseFloat(cols[precIdx]),
      Lluvia: parseInt(cols[lluviaIdx], 10),
    };
  });
}

function mean(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

describe('Property 5: Validez estadística del dataset — correlación con variable objetivo', () => {
  const csvContent = readFileSync(csvPath, 'utf-8');
  const rows = parseCsvRows(csvContent);

  const rowsLluvia1 = rows.filter((r) => r.Lluvia === 1);
  const rowsLluvia0 = rows.filter((r) => r.Lluvia === 0);

  const correlationVars: (keyof Omit<CsvRow, 'Lluvia'>)[] = ['Humedad', 'Nubosidad', 'Precipitacion'];

  const means: Record<string, { lluvia1: number; lluvia0: number }> = {};
  for (const col of correlationVars) {
    means[col] = {
      lluvia1: mean(rowsLluvia1.map((r) => r[col])),
      lluvia0: mean(rowsLluvia0.map((r) => r[col])),
    };
  }

  it('la media de Humedad, Nubosidad y Precipitacion debe ser mayor cuando Lluvia=1 que cuando Lluvia=0', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...correlationVars),
        (variable) => {
          const meanLluvia1 = means[variable].lluvia1;
          const meanLluvia0 = means[variable].lluvia0;
          expect(meanLluvia1).toBeGreaterThan(meanLluvia0);
        },
      ),
      { numRuns: 100 },
    );
  });
});
