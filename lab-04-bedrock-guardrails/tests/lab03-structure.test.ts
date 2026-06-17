import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const lab03Root = resolve(labRoot, '..', 'lab-03-bedrock-rag');

describe('Lab 03 Structure', () => {
  it('directory lab-03-bedrock-rag/ exists', () => {
    expect(existsSync(lab03Root)).toBe(true);
  });

  it('contains README.md', () => {
    expect(existsSync(resolve(lab03Root, 'README.md'))).toBe(true);
  });

  it('contains prompts-rag.md', () => {
    expect(existsSync(resolve(lab03Root, 'prompts-rag.md'))).toBe(true);
  });

  it('contains CONCEPTOS-RAG.md', () => {
    expect(existsSync(resolve(lab03Root, 'CONCEPTOS-RAG.md'))).toBe(true);
  });

  it('contains documentos-geofisicos/ directory', () => {
    expect(existsSync(resolve(lab03Root, 'documentos-geofisicos'))).toBe(true);
  });

  it('does NOT contain prompts-guardrails.md', () => {
    expect(existsSync(resolve(lab03Root, 'prompts-guardrails.md'))).toBe(false);
  });

  it('does NOT contain CONCEPTOS-RAG-GUARDRAILS.md', () => {
    expect(existsSync(resolve(lab03Root, 'CONCEPTOS-RAG-GUARDRAILS.md'))).toBe(false);
  });

  it('does NOT contain README-GUARDRAILS.md', () => {
    expect(existsSync(resolve(lab03Root, 'README-GUARDRAILS.md'))).toBe(false);
  });
});
