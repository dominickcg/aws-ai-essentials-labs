import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const projectRoot = resolve(labRoot, '..');
const readme = readFileSync(resolve(labRoot, 'README.md'), 'utf-8');

describe('Lab 05 — Referencias cruzadas', () => {
  it('README.md referencia CONCEPTOS-LOGGING.md y el archivo existe', () => {
    expect(readme).toContain('CONCEPTOS-LOGGING.md');
    expect(existsSync(resolve(labRoot, 'CONCEPTOS-LOGGING.md'))).toBe(true);
  });

  it('README Principal referencia lab-05-cloudwatch-logging/ y el directorio existe', () => {
    const mainReadme = readFileSync(resolve(projectRoot, 'README.md'), 'utf-8');
    expect(mainReadme).toContain('lab-05-cloudwatch-logging/');
    expect(existsSync(resolve(projectRoot, 'lab-05-cloudwatch-logging'))).toBe(true);
  });

  it('README.md referencia ../TROUBLESHOOTING.md', () => {
    expect(readme).toContain('TROUBLESHOOTING.md');
  });

  it('README.md referencia bedrock-logging-policy.json y el archivo existe', () => {
    expect(readme).toContain('bedrock-logging-policy.json');
    expect(existsSync(resolve(labRoot, 'bedrock-logging-policy.json'))).toBe(true);
  });
});
