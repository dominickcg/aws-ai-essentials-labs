// Feature: lab-01-sagemaker-canvas, Property 4: Ausencia de valores nulos en columnas críticas del dataset
// **Validates: Requirements 3.2**

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = resolve(__dirname, '..', 'weather-forecast-data.csv');

interface CsvRow {
  rowIndex: number;
  Temperatura: string;
  Humedad: string;
  Presion_Atmosferica: string;
}

function parseCsvRows(csvContent: string): CsvRow[] {
  const lines = csvContent.trim().split(/\r?\n/);
  const header = lines[0].split(',');

  const tempIdx = header.indexOf('Temperatura');
  const humIdx = header.indexOf('Humedad');
  const presIdx = header.indexOf('Presion_Atmosferica');

  return lines.slice(1).map((line, i) => {
    const cols = line.split(',');
    return {
      rowIndex: i + 1,
      Temperatura: cols[tempIdx] ?? '',
      Humedad: cols[humIdx] ?? '',
      Presion_Atmosferica: cols[presIdx] ?? '',
    };
  });
}

function isNullOrEmpty(value: string): boolean {
  const trimmed = value.trim().toLowerCase();
  return trimmed === '' || trimmed === 'null' || trimmed === 'undefined' || trimmed === 'nan' || trimmed === 'na' || trimmed === 'n/a';
}

describe('Property 4: Ausencia de valores nulos en columnas críticas del dataset', () => {
  const csvContent = readFileSync(csvPath, 'utf-8');
  const rows = parseCsvRows(csvContent);

  it('las columnas Temperatura, Humedad y Presion_Atmosferica no deben contener valores nulos ni vacíos en ninguna fila', () => {
    const criticalColumns: (keyof Omit<CsvRow, 'rowIndex'>)[] = ['Temperatura', 'Humedad', 'Presion_Atmosferica'];

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: rows.length - 1 }),
        (rowIdx) => {
          const row = rows[rowIdx];
          for (const col of criticalColumns) {
            expect(isNullOrEmpty(row[col])).toBe(false);
          }
        },
      ),
      { numRuns: Math.max(100, rows.length) },
    );
  });
});
