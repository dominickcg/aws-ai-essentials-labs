import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const projectRoot = resolve(labRoot, '..');
const readme = readFileSync(resolve(projectRoot, 'README.md'), 'utf-8');

describe('Main Project README', () => {
  it('table has 5 labs (Lab 01 through Lab 05)', () => {
    expect(readme).toContain('Lab 01');
    expect(readme).toContain('Lab 02');
    expect(readme).toContain('Lab 03');
    expect(readme).toContain('Lab 04');
    expect(readme).toContain('Lab 05');
  });

  it('Lab 03 links to "lab-03-bedrock-rag/"', () => {
    expect(readme).toContain('lab-03-bedrock-rag/');
  });

  it('Lab 04 links to "lab-04-bedrock-guardrails/"', () => {
    expect(readme).toContain('lab-04-bedrock-guardrails/');
  });

  it('does NOT contain reference to "lab-03-bedrock-rag-guardrails/"', () => {
    expect(readme).not.toContain('lab-03-bedrock-rag-guardrails/');
  });

  it('contains section "Contenido Adicional"', () => {
    expect(readme).toContain('Contenido Adicional');
  });

  it('contains section "Contribuciones"', () => {
    expect(readme).toContain('Contribuciones');
  });

  it('contains section "Licencia"', () => {
    expect(readme).toContain('Licencia');
  });

  it('learning objectives mention RAG and Guardrails as separate items', () => {
    expect(readme).toMatch(/RAG/);
    expect(readme).toMatch(/Guardrails/);
  });
});
