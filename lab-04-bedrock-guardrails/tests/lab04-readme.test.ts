import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const readme = readFileSync(resolve(labRoot, 'README.md'), 'utf-8');

describe('Lab 04 README', () => {
  it('title contains "Laboratorio 4" and "Guardrails con Amazon Bedrock"', () => {
    expect(readme).toMatch(/^#\s.*Laboratorio 4/m);
    expect(readme).toContain('Guardrails con Amazon Bedrock');
  });

  it('contains time estimate "20-25 minutos"', () => {
    expect(readme).toContain('20-25 minutos');
  });

  it('does NOT contain "Parte 3" in title or index', () => {
    const titleAndIndex = readme.split('---').slice(0, 3).join('---');
    expect(titleAndIndex).not.toContain('Parte 3');
  });

  it('contains instructional content about temas denegados', () => {
    expect(readme).toContain('temas denegados');
  });

  it('contains instructional content about filtros PII', () => {
    expect(readme).toMatch(/filtros?\s+PII/i);
  });

  it('contains instructional content about filtros de contenido', () => {
    expect(readme).toMatch(/filtros?\s+de\s+contenido/i);
  });

  it('prerequisites reference Lab 03 with "../lab-03-bedrock-rag/README.md"', () => {
    expect(readme).toContain('../lab-03-bedrock-rag/README.md');
  });

  it('contains continuation note mentioning "Lab 05"', () => {
    expect(readme).toMatch(/Lab\s*05/i);
  });

  it('first step (Paso 1) is about region verification ("Verificación de Región AWS")', () => {
    expect(readme).toMatch(/###\s+Paso 1[:\s—]*Verificación de Región AWS/i);
  });

  it('contains resource lifecycle table distinguishing "Propio" and "Heredado"', () => {
    expect(readme).toContain('Propio');
    expect(readme).toContain('Heredado');
  });

  it('contains cleanup warning about impact on Lab 04 and Lab 05', () => {
    const cleanupSection = readme.substring(readme.indexOf('Limpieza'));
    expect(cleanupSection).toMatch(/Lab\s*04/i);
    expect(cleanupSection).toMatch(/Lab\s*05/i);
  });
});
