import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..', '..');
const readme = readFileSync(resolve(projectRoot, 'README.md'), 'utf-8');

describe('README Principal — Lab 05', () => {
  it('contiene fila Lab 05 con enlace a "lab-05-cloudwatch-logging/"', () => {
    expect(readme).toContain('lab-05-cloudwatch-logging/');
  });

  it('contiene título "Gobernanza y Auditoría con CloudWatch"', () => {
    expect(readme).toContain('Gobernanza y Auditoría con CloudWatch');
  });

  it('contiene tiempo estimado "20 min" para Lab 05', () => {
    expect(readme).toContain('20 min');
  });

  it('no contiene placeholder "Próximamente" para Lab 05', () => {
    const lab05Row = readme.split('\n').find((line) => line.includes('Lab 05'));
    expect(lab05Row).toBeDefined();
    expect(lab05Row).not.toContain('Próximamente');
  });

  it('contiene enlace a documentación de CloudWatch Logs', () => {
    expect(readme).toContain('CloudWatch Logs');
    expect(readme).toContain('docs.aws.amazon.com/AmazonCloudWatch');
  });

  it('contiene enlace a documentación de Model Invocation Logging', () => {
    expect(readme).toContain('Model Invocation Logging');
    expect(readme).toContain('model-invocation-logging');
  });

  it('contiene objetivo de aprendizaje sobre logging/gobernanza/auditoría', () => {
    const objSection = readme.split(/^## Objetivos de Aprendizaje/m)[1]?.split(/^---/m)[0] ?? '';
    const hasLogging = /logging/i.test(objSection);
    const hasGobernanza = /gobernanza/i.test(objSection);
    const hasAuditoria = /auditoría/i.test(objSection);
    expect(hasLogging || hasGobernanza || hasAuditoria).toBe(true);
  });

  it('Labs 01-04 siguen intactos en la tabla', () => {
    expect(readme).toContain('lab-01-sagemaker-canvas/');
    expect(readme).toContain('lab-02-bedrock-playgrounds/');
    expect(readme).toContain('lab-03-bedrock-rag/');
    expect(readme).toContain('lab-04-bedrock-guardrails/');
  });

  it('sección Contribuciones intacta', () => {
    expect(readme).toContain('Contribuciones');
    expect(readme).toContain('AMBER CLOUD GLOBAL LLC');
  });

  it('sección Licencia con "MIT" y "AMBER CLOUD GLOBAL LLC" intacta', () => {
    expect(readme).toContain('Licencia');
    expect(readme).toContain('MIT');
    expect(readme).toContain('AMBER CLOUD GLOBAL LLC');
  });
});
