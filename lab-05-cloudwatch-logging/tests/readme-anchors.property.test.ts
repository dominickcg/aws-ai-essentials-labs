// Feature: lab-05-cloudwatch-logging, Property 1: Anchor links del índice válidos
// **Validates: Requirements 7.1, 8.2**

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const readme = readFileSync(resolve(labRoot, 'README.md'), 'utf-8');

function headingToAnchor(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\w\s\u00C0-\u024F-]/g, '')
    .replace(/ /g, '-')
    .replace(/^-|-$/g, '');
}

// Extract anchor links from the Indice section only
function extractIndiceAnchors(content: string): string[] {
  const indiceMatch = content.match(/^## Indice\s*\n([\s\S]*?)(?=\n---|\n## )/m);
  if (!indiceMatch) return [];
  const indiceSection = indiceMatch[1];
  return [...indiceSection.matchAll(/\[([^\]]*)\]\(#([^)]+)\)/g)].map((m) => m[2]);
}

// Extract all headings and convert to anchors
function extractHeadingAnchors(content: string): Set<string> {
  const headings = [...content.matchAll(/^#{1,6}\s+(.+)$/gm)].map((m) => m[1].trim());
  return new Set(headings.map((h) => headingToAnchor(h)));
}

const anchorLinks = extractIndiceAnchors(readme);
const existingAnchors = extractHeadingAnchors(readme);

describe('Property 1: Todo anchor link del índice corresponde a un heading real', () => {
  it('el índice tiene anchor links', () => {
    expect(anchorLinks.length).toBeGreaterThan(0);
  });

  it('cada anchor link del índice corresponde a un encabezado existente en el documento', () => {
    fc.assert(
      fc.property(fc.constantFrom(...anchorLinks), (anchor) => {
        expect(
          existingAnchors.has(anchor),
          `El anchor "#${anchor}" no corresponde a ningún encabezado. Anchors disponibles: ${[...existingAnchors].join(', ')}`,
        ).toBe(true);
      }),
      { numRuns: anchorLinks.length * 3 },
    );
  });
});
