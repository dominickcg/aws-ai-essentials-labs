import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const readme = readFileSync(resolve(labRoot, 'README.md'), 'utf-8');

describe('Lab 05 README — Contenido', () => {
  it('contiene nombre del Log Group "/aws/bedrock/model-invocations"', () => {
    expect(readme).toContain('/aws/bedrock/model-invocations');
  });

  it('contiene referencia a retención de "1 day"', () => {
    expect(readme).toMatch(/1 day/i);
  });

  it('contiene instrucciones de Model Invocation Logging', () => {
    expect(readme).toMatch(/Model [Ii]nvocation [Ll]ogging/);
  });

  it('contiene instrucciones de Playground', () => {
    expect(readme).toMatch(/Playground/i);
  });

  it('contiene campo de auditoría "accountId"', () => {
    expect(readme).toContain('accountId');
  });

  it('contiene campo de auditoría "modelArn"', () => {
    expect(readme).toContain('modelArn');
  });

  it('contiene campo de auditoría "input.inputText"', () => {
    expect(readme).toContain('input.inputText');
  });

  it('contiene campo de auditoría "output.outputText"', () => {
    expect(readme).toContain('output.outputText');
  });

  it('contiene referencia a CONCEPTOS-LOGGING.md', () => {
    expect(readme).toContain('CONCEPTOS-LOGGING.md');
  });
});
