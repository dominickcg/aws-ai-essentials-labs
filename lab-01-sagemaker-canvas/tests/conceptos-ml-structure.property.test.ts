// Feature: lab-01-sagemaker-canvas, Property 1: Estructura válida de CONCEPTOS-ML.md
// **Validates: Requirements 1.1**

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const mdPath = resolve(__dirname, '..', 'CONCEPTOS-ML.md');
const mdContent = readFileSync(mdPath, 'utf-8');

/** Expected 12 sections in pedagogical order (keywords to match in H2 headings) */
const EXPECTED_SECTIONS = [
  'paradigma',
  'tipos de aprendizaje',
  'clasificación binaria',
  'roles de los datos',
  'ciclo de vida',
  'parámetros',
  'generalización',
  'división de datos',
  'sesgo',
  'métricas',
  'inferencia',
  'automl',
];

/** Regex that matches a single emoji (including compound emoji sequences) */
const EMOJI_RE =
  /[\p{Emoji_Presentation}\p{Extended_Pictographic}](\u200D[\p{Emoji_Presentation}\p{Extended_Pictographic}])*/gu;

function getTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

function getH2Headings(content: string): string[] {
  return [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
}

/** Get the 12 content section headings (excluding the table of contents heading) */
function getContentSections(content: string): string[] {
  return getH2Headings(content).filter(
    (h) => !h.toLowerCase().startsWith('indice') && !h.toLowerCase().startsWith('índice'),
  );
}

function getAnchorLinks(content: string): string[] {
  return [...content.matchAll(/\[.*?\]\(#([^)]+)\)/g)].map((m) => m[1]);
}

/**
 * Convert a heading to a GitHub-style anchor.
 * GitHub lowercases, strips non-alphanumeric (keeping unicode letters, digits, spaces, hyphens),
 * replaces spaces with hyphens, and collapses consecutive hyphens.
 * Special chars like — (em dash) are removed, leaving adjacent hyphens from surrounding spaces.
 */
function headingToAnchor(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/ /g, '-')
    .replace(/^-|-$/g, '');
}

describe('Property 1: Estructura válida de CONCEPTOS-ML.md', () => {
  it('el título debe contener exactamente un emoji al inicio', () => {
    fc.assert(
      fc.property(fc.constant(mdContent), (content) => {
        const title = getTitle(content);
        expect(title.length).toBeGreaterThan(0);

        const emojis = title.match(EMOJI_RE);
        expect(emojis).not.toBeNull();
        expect(emojis!.length).toBe(1);

        // The emoji must be at the start of the title
        const firstChar = [...title][0];
        const firstCharEmojis = firstChar.match(EMOJI_RE);
        expect(firstCharEmojis).not.toBeNull();
      }),
      { numRuns: 100 },
    );
  });

  it('el índice debe contener enlaces de ancla que apunten a secciones existentes', () => {
    fc.assert(
      fc.property(fc.constant(mdContent), (content) => {
        const anchorLinks = getAnchorLinks(content);
        expect(anchorLinks.length).toBeGreaterThan(0);

        const allH2 = getH2Headings(content);
        const existingAnchors = new Set(allH2.map((h) => headingToAnchor(h)));

        for (const link of anchorLinks) {
          expect(
            existingAnchors.has(link),
            `El enlace de ancla "#${link}" no apunta a ninguna sección existente. Secciones disponibles: ${[...existingAnchors].join(', ')}`,
          ).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('debe contener exactamente 12 secciones en orden pedagógico', () => {
    fc.assert(
      fc.property(fc.constant(mdContent), (content) => {
        const sections = getContentSections(content);
        expect(sections.length).toBe(12);

        // Verify each expected section keyword appears in the corresponding heading
        for (let i = 0; i < EXPECTED_SECTIONS.length; i++) {
          const keyword = EXPECTED_SECTIONS[i];
          const heading = sections[i].toLowerCase();
          expect(
            heading.includes(keyword),
            `La sección ${i + 1} debería contener "${keyword}" pero tiene: "${sections[i]}"`,
          ).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });
});
