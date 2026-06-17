// Feature: lab-04-bedrock-guardrails, Property 3: Índices con anchor links válidos
// **Validates: Requirements 2.11, 3.8, 3.9**

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const projectRoot = resolve(labRoot, '..');

interface DocEntry {
  path: string;
  label: string;
}

const documents: DocEntry[] = [
  { path: resolve(projectRoot, 'lab-03-bedrock-rag', 'README.md'), label: 'Lab 03 README' },
  { path: resolve(projectRoot, 'lab-04-bedrock-guardrails', 'README.md'), label: 'Lab 04 README' },
  { path: resolve(projectRoot, 'lab-03-bedrock-rag', 'CONCEPTOS-RAG.md'), label: 'CONCEPTOS-RAG' },
  { path: resolve(projectRoot, 'lab-04-bedrock-guardrails', 'CONCEPTOS-GUARDRAILS.md'), label: 'CONCEPTOS-GUARDRAILS' },
].filter((d) => existsSync(d.path));

function headingToAnchor(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\w\s\u00C0-\u024F-]/g, '')
    .replace(/ /g, '-')
    .replace(/^-|-$/g, '');
}

function extractAnchorLinks(content: string): string[] {
  return [...content.matchAll(/\[([^\]]*)\]\(#([^)]+)\)/g)].map((m) => m[2]);
}

function extractHeadings(content: string): string[] {
  return [...content.matchAll(/^#{1,6}\s+(.+)$/gm)].map((m) => m[1].trim());
}

describe('Property 3: Índices con anchor links válidos en documentos con índice', () => {
  it('cada anchor link del índice debe corresponder a un encabezado existente', () => {
    expect(documents.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(fc.constantFrom(...documents), (doc) => {
        const content = readFileSync(doc.path, 'utf-8');
        const anchorLinks = extractAnchorLinks(content);
        const headings = extractHeadings(content);
        const existingAnchors = new Set(headings.map((h) => headingToAnchor(h)));

        expect(
          anchorLinks.length,
          `${doc.label} no tiene anchor links en el índice`,
        ).toBeGreaterThan(0);

        for (const link of anchorLinks) {
          expect(
            existingAnchors.has(link),
            `${doc.label}: el anchor "#${link}" no corresponde a ningún encabezado existente. Anchors disponibles: ${[...existingAnchors].join(', ')}`,
          ).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });
});
