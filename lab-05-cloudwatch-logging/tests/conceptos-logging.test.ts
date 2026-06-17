import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const conceptos = readFileSync(resolve(labRoot, 'CONCEPTOS-LOGGING.md'), 'utf-8');

describe('CONCEPTOS-LOGGING.md — Contenido', () => {
  it('contiene sección sobre Model Invocation Logging', () => {
    expect(conceptos).toMatch(/Model Invocation Logging/);
  });

  it('contiene sección sobre CloudWatch Log Groups y Log Streams', () => {
    expect(conceptos).toMatch(/Log Groups y Log Streams/);
  });

  it('contiene sección sobre Políticas de Retención', () => {
    expect(conceptos).toMatch(/Políticas de Retención/);
  });

  it('contiene sección sobre Campos de Auditoría', () => {
    expect(conceptos).toMatch(/Campos de Auditoría/);
  });

  it('contiene sección sobre Gobernanza y Cumplimiento', () => {
    expect(conceptos).toMatch(/Gobernanza y Cumplimiento/);
  });

  it('contiene sección de Terminología AWS', () => {
    expect(conceptos).toMatch(/Terminología AWS/);
  });

  it('está escrito en español', () => {
    expect(conceptos.toLowerCase()).toContain('registros');
    expect(conceptos.toLowerCase()).toContain('auditoría');
    expect(conceptos.toLowerCase()).toContain('cumplimiento');
    expect(conceptos.toLowerCase()).toContain('retención');
  });
});
