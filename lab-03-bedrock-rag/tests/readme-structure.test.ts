// Unit tests: README structural validation
// **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 3.1, 3.5, 3.8**

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
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
// Required sections
// ============================================================================

describe('README contains all required sections', () => {
  it('has a title with emoji', () => {
    expect(readmeContent).toMatch(/^# .+ Laboratorio 3/m);
  });

  it('has a table of contents (Indice)', () => {
    expect(readmeContent).toMatch(/^## Indice/m);
  });

  it('has learning objectives (Objetivos de Aprendizaje)', () => {
    expect(readmeContent).toMatch(/^## Objetivos de Aprendizaje/m);
  });

  it('has prerequisites (Prerrequisitos)', () => {
    expect(readmeContent).toMatch(/^## Prerrequisitos/m);
  });

  it('has numbered steps (Paso 1 through Paso 8)', () => {
    for (let i = 1; i <= 8; i++) {
      expect(
        readmeContent,
        `Should contain Paso ${i}`,
      ).toMatch(new RegExp(`### Paso ${i}[:\\s]`));
    }
  });

  it('has a troubleshooting section (Solución de Problemas)', () => {
    expect(readmeContent).toMatch(/^## Solución de Problemas/m);
  });
});

// ============================================================================
// Sequential step numbering
// ============================================================================

describe('Steps are numbered sequentially without gaps', () => {
  it('steps 1-8 appear in order with no gaps', () => {
    const stepPattern = /### Paso (\d+)[:\s]/g;
    const stepNumbers: number[] = [];
    let match: RegExpExecArray | null;
    while ((match = stepPattern.exec(readmeContent)) !== null) {
      stepNumbers.push(parseInt(match[1], 10));
    }

    expect(stepNumbers.length).toBe(8);
    for (let i = 0; i < stepNumbers.length; i++) {
      expect(stepNumbers[i]).toBe(i + 1);
    }
  });
});

// ============================================================================
// Resource conservation note for Lab 04
// ============================================================================

describe('Resource conservation note for Lab 04', () => {
  it('contains a conservation note referencing Lab 04', () => {
    expect(readmeContent).toContain('Conserve todos los recursos');
  });

  it('references ../lab-04-bedrock-guardrails/README.md', () => {
    expect(readmeContent).toContain('../lab-04-bedrock-guardrails/README.md');
  });
});

// ============================================================================
// Troubleshooting references TROUBLESHOOTING.md
// ============================================================================

describe('Troubleshooting section references TROUBLESHOOTING.md', () => {
  it('references TROUBLESHOOTING.md in the troubleshooting section', () => {
    const troubleshootingSection = readmeContent.slice(
      readmeContent.indexOf('## Solución de Problemas'),
    );
    expect(troubleshootingSection).toContain('TROUBLESHOOTING.md');
  });
});

// ============================================================================
// No obsolete references
// ============================================================================

describe('No obsolete references to old section names or outdated flows', () => {
  it('does not reference "Orchestration" as a navigation section', () => {
    // "Orchestration" was an old nav section name; current AWS console uses "Knowledge bases" directly
    expect(readmeContent.toLowerCase()).not.toContain('"orchestration"');
  });

  it('does not have a separate "Configurar Data Source" step', () => {
    // Data Source configuration is now integrated in the KB creation wizard
    const stepHeadings = readmeContent.match(/### Paso \d+[:\s].*/g) || [];
    const hasConfigureDataSourceStep = stepHeadings.some(
      (h) => h.toLowerCase().includes('configurar data source'),
    );
    expect(hasConfigureDataSourceStep).toBe(false);
  });
});
