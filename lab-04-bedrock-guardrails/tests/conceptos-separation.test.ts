import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const lab03Root = resolve(labRoot, '..', 'lab-03-bedrock-rag');

describe('Concepts Separation', () => {
  it('CONCEPTOS-RAG.md exists in lab-03-bedrock-rag/', () => {
    expect(existsSync(resolve(lab03Root, 'CONCEPTOS-RAG.md'))).toBe(true);
  });

  it('CONCEPTOS-GUARDRAILS.md exists in lab-04-bedrock-guardrails/', () => {
    expect(existsSync(resolve(labRoot, 'CONCEPTOS-GUARDRAILS.md'))).toBe(true);
  });

  it('CONCEPTOS-RAG-GUARDRAILS.md does NOT exist in lab-03-bedrock-rag/', () => {
    expect(existsSync(resolve(lab03Root, 'CONCEPTOS-RAG-GUARDRAILS.md'))).toBe(false);
  });
});
