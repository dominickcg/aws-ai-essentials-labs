// Feature: lab-04-bedrock-guardrails, Property 1: Ausencia de referencias obsoletas
// **Validates: Requirements 1.6, 2.7, 2.8**

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const projectRoot = resolve(labRoot, '..');

const STALE_REFERENCES = [
  'CONCEPTOS-RAG-GUARDRAILS.md',
  'README-RAG.md',
  'README-GUARDRAILS.md',
  'lab-03-bedrock-rag-guardrails/',
];

function findMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules') continue;
    const fullPath = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

const lab03Dir = resolve(projectRoot, 'lab-03-bedrock-rag');
const lab04Dir = resolve(projectRoot, 'lab-04-bedrock-guardrails');

const markdownFiles = [
  ...findMarkdownFiles(lab03Dir),
  ...findMarkdownFiles(lab04Dir),
];

describe('Property 1: Ausencia de referencias obsoletas en ambos laboratorios', () => {
  it('ningún archivo Markdown debe contener referencias a nombres obsoletos', () => {
    expect(markdownFiles.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(fc.constantFrom(...markdownFiles), (filePath) => {
        const content = readFileSync(filePath, 'utf-8');
        for (const staleRef of STALE_REFERENCES) {
          expect(
            content.includes(staleRef),
            `El archivo "${filePath}" contiene referencia obsoleta: "${staleRef}"`,
          ).toBe(false);
        }
      }),
      { numRuns: 100 },
    );
  });
});
