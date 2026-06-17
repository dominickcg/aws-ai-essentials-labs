import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const readme = readFileSync(resolve(labRoot, 'README.md'), 'utf-8');

describe('Lab 05 README — Estructura', () => {
  it('título comienza con "# 📋 Laboratorio 5"', () => {
    expect(readme).toMatch(/^# 📋 Laboratorio 5/m);
  });

  it('contiene sección de Indice', () => {
    expect(readme).toMatch(/^## Indice/m);
  });

  it('contiene tiempo estimado "~20 minutos"', () => {
    expect(readme).toContain('~20 minutos');
  });

  it('contiene sección "Objetivos de Aprendizaje" con al menos 3 bullet points', () => {
    expect(readme).toMatch(/^## Objetivos de Aprendizaje/m);
    const objSection = readme.split(/^## Objetivos de Aprendizaje/m)[1].split(/^---/m)[0];
    const bullets = objSection.match(/^- /gm);
    expect(bullets).not.toBeNull();
    expect(bullets!.length).toBeGreaterThanOrEqual(3);
  });

  it('contiene sección "Prerrequisitos" que NO referencia labs anteriores como dependencias', () => {
    expect(readme).toMatch(/^## Prerrequisitos/m);
    const prereqSection = readme.split(/^## Prerrequisitos/m)[1].split(/^---/m)[0];
    expect(prereqSection).not.toContain('Lab 01');
    expect(prereqSection).not.toContain('Lab 02');
    expect(prereqSection).not.toContain('Lab 03');
    expect(prereqSection).not.toContain('Lab 04');
    expect(prereqSection).toMatch(/NO requiere/i);
  });

  it('Paso 1 es "Verificación de Región AWS"', () => {
    expect(readme).toMatch(/###\s+Paso 1[:\s—]*Verificación de Región AWS/i);
  });

  it('contiene múltiples checkpoints "✓ Verificación"', () => {
    const checkpoints = readme.match(/✓ Verificación/g);
    expect(checkpoints).not.toBeNull();
    expect(checkpoints!.length).toBeGreaterThanOrEqual(3);
  });

  it('contiene sección "Ciclo de Vida de Recursos"', () => {
    expect(readme).toMatch(/^## Ciclo de Vida de Recursos/m);
  });

  it('contiene sección "Solución de Problemas"', () => {
    expect(readme).toMatch(/^## Solución de Problemas/m);
  });

  it('está escrito en español (contiene palabras comunes en español)', () => {
    expect(readme.toLowerCase()).toContain('laboratorio');
    expect(readme.toLowerCase()).toContain('configurar');
    expect(readme.toLowerCase()).toContain('verificación');
    expect(readme.toLowerCase()).toContain('aprendizaje');
    expect(readme.toLowerCase()).toContain('prerrequisitos');
  });
});
