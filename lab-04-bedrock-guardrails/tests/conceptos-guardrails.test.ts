import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const content = readFileSync(resolve(labRoot, 'CONCEPTOS-GUARDRAILS.md'), 'utf-8');

describe('CONCEPTOS-GUARDRAILS.md Content', () => {
  it('title contains "Guardrails con Amazon Bedrock"', () => {
    expect(content).toMatch(/^#\s.*Guardrails con Amazon Bedrock/m);
  });

  it('contains reference to Lab 03 as prerequisite', () => {
    expect(content).toMatch(/Lab\s*03|CONCEPTOS-RAG\.md/i);
  });

  it('contains section about "Guardrails para Amazon Bedrock"', () => {
    expect(content).toContain('Guardrails para Amazon Bedrock');
  });

  it('contains section about "Integración de Guardrails con RAG"', () => {
    expect(content).toContain('Integración de Guardrails con RAG');
  });

  it('contains section about "Terminología AWS"', () => {
    expect(content).toContain('Terminología AWS');
  });

  it('contains Guardrails terminology: Guardrail, Denied Topic, PII Filter, Content Filter, Mask, Block, Trace', () => {
    expect(content).toContain('Guardrail');
    expect(content).toContain('Denied Topic');
    expect(content).toContain('PII Filter');
    expect(content).toContain('Content Filter');
    expect(content).toContain('Mask');
    expect(content).toContain('Block');
    expect(content).toContain('Trace');
  });

  it('contains preserved theoretical content (key diagram "Flujo de evaluación")', () => {
    expect(content).toContain('Flujo de evaluación');
  });
});
