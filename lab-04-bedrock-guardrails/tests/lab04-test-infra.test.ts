import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');

describe('Lab 04 Test Infrastructure', () => {
  describe('package.json', () => {
    const pkg = JSON.parse(readFileSync(resolve(labRoot, 'package.json'), 'utf-8'));

    it('has name "lab-04-bedrock-guardrails-tests"', () => {
      expect(pkg.name).toBe('lab-04-bedrock-guardrails-tests');
    });

    it('has type "module"', () => {
      expect(pkg.type).toBe('module');
    });

    it('has test script "vitest --run"', () => {
      expect(pkg.scripts?.test).toBe('vitest --run');
    });

    it('has vitest as devDependency', () => {
      expect(pkg.devDependencies?.vitest).toBeDefined();
    });

    it('has fast-check as devDependency', () => {
      expect(pkg.devDependencies?.['fast-check']).toBeDefined();
    });
  });

  describe('tsconfig.json', () => {
    const tsconfig = JSON.parse(readFileSync(resolve(labRoot, 'tsconfig.json'), 'utf-8'));

    it('has target ES2022', () => {
      expect(tsconfig.compilerOptions?.target).toBe('ES2022');
    });

    it('has module ESNext', () => {
      expect(tsconfig.compilerOptions?.module).toBe('ESNext');
    });

    it('has moduleResolution bundler', () => {
      expect(tsconfig.compilerOptions?.moduleResolution).toBe('bundler');
    });

    it('has strict true', () => {
      expect(tsconfig.compilerOptions?.strict).toBe(true);
    });
  });

  describe('vitest.config.ts', () => {
    it('exists', () => {
      expect(existsSync(resolve(labRoot, 'vitest.config.ts'))).toBe(true);
    });
  });

  describe('tests/ directory', () => {
    it('exists with placeholder.ts', () => {
      expect(existsSync(resolve(labRoot, 'tests', 'placeholder.ts'))).toBe(true);
    });
  });
});
