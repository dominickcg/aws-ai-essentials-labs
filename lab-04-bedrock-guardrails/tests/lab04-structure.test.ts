import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');

describe('Lab 04 Structure', () => {
  it('directory lab-04-bedrock-guardrails/ exists with README.md', () => {
    expect(existsSync(resolve(labRoot, 'README.md'))).toBe(true);
  });

  it('contains prompts-guardrails.md', () => {
    expect(existsSync(resolve(labRoot, 'prompts-guardrails.md'))).toBe(true);
  });

  it('contains CONCEPTOS-GUARDRAILS.md', () => {
    expect(existsSync(resolve(labRoot, 'CONCEPTOS-GUARDRAILS.md'))).toBe(true);
  });

  it('does NOT contain prompts-rag.md', () => {
    expect(existsSync(resolve(labRoot, 'prompts-rag.md'))).toBe(false);
  });

  it('does NOT contain documentos-geofisicos/ directory', () => {
    expect(existsSync(resolve(labRoot, 'documentos-geofisicos'))).toBe(false);
  });

  it('does NOT contain CONCEPTOS-RAG-GUARDRAILS.md', () => {
    expect(existsSync(resolve(labRoot, 'CONCEPTOS-RAG-GUARDRAILS.md'))).toBe(false);
  });
});
