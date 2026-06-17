import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const lab03Root = resolve(labRoot, '..', 'lab-03-bedrock-rag');
const readme = readFileSync(resolve(lab03Root, 'README.md'), 'utf-8');

describe('Lab 03 README', () => {
  it('title contains "Laboratorio 3" and "RAG con Amazon Bedrock Knowledge Bases"', () => {
    expect(readme).toMatch(/^#\s.*Laboratorio 3/m);
    expect(readme).toContain('RAG con Amazon Bedrock Knowledge Bases');
  });

  it('contains time estimate "30-35 minutos"', () => {
    expect(readme).toContain('30-35 minutos');
  });

  it('contains steps 1 through 10', () => {
    for (let i = 1; i <= 10; i++) {
      expect(readme).toMatch(new RegExp(`###\\s+Paso ${i}[:\\s—]`));
    }
  });

  it('does NOT contain "Parte 1 y 2" or "Parte 1" or "Parte 2" in title/index area', () => {
    const titleAndIndex = readme.split('---').slice(0, 3).join('---');
    expect(titleAndIndex).not.toContain('Parte 1 y 2');
    expect(titleAndIndex).not.toContain('Parte 1');
    expect(titleAndIndex).not.toContain('Parte 2');
  });

  it('contains continuation note mentioning "Lab 04"', () => {
    expect(readme).toMatch(/Lab\s*04/i);
  });

  it('references CONCEPTOS-RAG.md (not CONCEPTOS-RAG-GUARDRAILS.md)', () => {
    expect(readme).toContain('CONCEPTOS-RAG.md');
    expect(readme).not.toContain('CONCEPTOS-RAG-GUARDRAILS.md');
  });
});
