// Unit tests: README cross-references and documentation guidelines validation
// **Validates: Requirements 3.2, 3.5, 3.8**

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');

let readmeContent: string;

beforeAll(() => {
  readmeContent = readFileSync(resolve(labRoot, 'README.md'), 'utf-8');
});

// ============================================================================
// Cross-references between README and support files
// ============================================================================

describe('Cross-references: prompts-rag.md', () => {
  it('prompts-rag.md exists in the lab directory', () => {
    expect(existsSync(resolve(labRoot, 'prompts-rag.md'))).toBe(true);
  });

  it('README references prompts-rag.md', () => {
    expect(readmeContent).toContain('prompts-rag.md');
  });
});

describe('Cross-references: CONCEPTOS-RAG.md', () => {
  it('CONCEPTOS-RAG.md exists in the lab directory', () => {
    expect(existsSync(resolve(labRoot, 'CONCEPTOS-RAG.md'))).toBe(true);
  });

  it('README references CONCEPTOS-RAG.md', () => {
    expect(readmeContent).toContain('CONCEPTOS-RAG.md');
  });
});

describe('Cross-references: documentos-geofisicos/', () => {
  it('documentos-geofisicos/ directory exists', () => {
    expect(existsSync(resolve(labRoot, 'documentos-geofisicos'))).toBe(true);
  });

  const expectedFiles = [
    'reporte-actividad-sismica.md',
    'procedimientos-monitoreo-sismico.md',
    'glosario-geofisica-sismologia.md',
  ];

  for (const file of expectedFiles) {
    it(`contains ${file}`, () => {
      expect(
        existsSync(resolve(labRoot, 'documentos-geofisicos', file)),
      ).toBe(true);
    });
  }
});

// ============================================================================
// README follows lab documentation guidelines
// ============================================================================

describe('README follows directrices-laboratorios.md guidelines', () => {
  it('title uses only one emoji at the start', () => {
    const titleMatch = readmeContent.match(/^# (.+)$/m);
    expect(titleMatch).not.toBeNull();
    const title = titleMatch![1];
    // Should start with an emoji, then the rest should have no emojis
    // Emoji regex: matches common emoji ranges
    const emojiPattern = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    const emojis = title.match(emojiPattern) || [];
    expect(emojis.length).toBe(1);
  });

  it('body text does not contain emojis (except allowed: ⏱️, ⚠️, ✓)', () => {
    // Remove the title line
    const bodyContent = readmeContent.replace(/^# .+$/m, '');
    // Remove allowed emojis
    const cleaned = bodyContent
      .replace(/⏱️/g, '')
      .replace(/⚠️/g, '')
      .replace(/✓/g, '');
    // Check for remaining emojis in the general emoji range (excluding common symbols)
    const emojiPattern = /[\u{1F300}-\u{1F9FF}]/gu;
    const strayEmojis = cleaned.match(emojiPattern) || [];
    expect(strayEmojis, 'Body should not contain emojis beyond ⏱️, ⚠️, ✓').toHaveLength(0);
  });

  it('is written in Spanish (key section headings are in Spanish)', () => {
    expect(readmeContent).toContain('Objetivos de Aprendizaje');
    expect(readmeContent).toContain('Prerrequisitos');
    expect(readmeContent).toContain('Solución de Problemas');
  });

  it('has verification checkpoints after major steps', () => {
    const checkpoints = readmeContent.match(/\*\*✓ Verificación\*\*/g) || [];
    // At least one per step (8 steps)
    expect(checkpoints.length).toBeGreaterThanOrEqual(8);
  });
});
