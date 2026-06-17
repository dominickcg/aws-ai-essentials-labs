// Unit tests for CONCEPTOS-ML.md content — verifies presence of each of the 12 required sections
// **Validates: Requirements 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.12, 1.13**

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const mdPath = resolve(__dirname, '..', 'CONCEPTOS-ML.md');

let content: string;

beforeAll(() => {
  content = readFileSync(mdPath, 'utf-8');
});

describe('Contenido de CONCEPTOS-ML.md — 12 secciones requeridas', () => {
  // **Validates: Requirement 1.2**
  it('Sección 1: Paradigma ML vs. Programación Tradicional — menciona Reglas + Datos, Datos + Respuestas, Modelo', () => {
    expect(content).toContain('Reglas');
    expect(content).toContain('Datos');
    expect(content).toContain('Respuestas');
    expect(content).toContain('Modelo');
  });

  // **Validates: Requirement 1.3**
  it('Sección 2: Tipos de Aprendizaje — menciona Supervisado, No Supervisado, Por Refuerzo, SageMaker Canvas', () => {
    expect(content).toContain('Supervisado');
    expect(content).toContain('No Supervisado');
    expect(content).toContain('Por Refuerzo');
    expect(content).toContain('SageMaker Canvas');
  });

  // **Validates: Requirement 1.4**
  it('Sección 3: Clasificación Binaria — menciona binaria, Regresión, Multiclase', () => {
    expect(content.toLowerCase()).toContain('binaria');
    expect(content).toContain('Regresión');
    expect(content).toContain('Multiclase');
  });

  // **Validates: Requirement 1.5**
  it('Sección 4: Roles de los Datos — menciona Target, Features, Dataset, Lluvia', () => {
    expect(content).toContain('Target');
    expect(content).toContain('Features');
    expect(content).toContain('Dataset');
    expect(content).toContain('Lluvia');
  });

  // **Validates: Requirement 1.6**
  it('Sección 5: Ciclo de Vida del ML — menciona Preprocesamiento, Feature Engineering, Entrenamiento, Evaluación', () => {
    expect(content).toContain('Preprocesamiento');
    expect(content).toContain('Feature Engineering');
    expect(content).toContain('Entrenamiento');
    expect(content).toContain('Evaluación');
  });

  // **Validates: Requirement 1.7**
  it('Sección 6: Parámetros vs. Hiperparámetros — menciona Parámetros, Hiperparámetros, AutoML', () => {
    expect(content).toContain('Parámetros');
    expect(content).toContain('Hiperparámetros');
    expect(content).toContain('AutoML');
  });

  // **Validates: Requirement 1.8**
  it('Sección 7: Generalización vs. Sobreajuste — menciona Generalización, Sobreajuste, Overfitting', () => {
    expect(content).toContain('Generalización');
    expect(content).toContain('Sobreajuste');
    expect(content).toContain('Overfitting');
  });

  // **Validates: Requirement 1.9**
  it('Sección 8: División de Datos — menciona Training Set o Entrenamiento, Validation o Validación, Test', () => {
    const hasTrainingSet = content.includes('Training Set') || content.includes('Entrenamiento');
    expect(hasTrainingSet).toBe(true);

    const hasValidation = content.includes('Validation') || content.includes('Validación');
    expect(hasValidation).toBe(true);

    expect(content).toContain('Test');
  });

  // **Validates: Requirement 1.10**
  it('Sección 9: Sesgo de Datos — menciona Sesgo, Bias, desbalance', () => {
    expect(content).toContain('Sesgo');
    expect(content).toContain('Bias');
    expect(content.toLowerCase()).toContain('desbalance');
  });

  // **Validates: Requirement 1.11**
  it('Sección 10: Métricas de Evaluación — menciona Matriz de Confusión, Precision, Recall, Accuracy, F1', () => {
    expect(content).toContain('Matriz de Confusión');
    expect(content).toContain('Precision');
    expect(content).toContain('Recall');
    expect(content).toContain('Accuracy');
    expect(content).toContain('F1');
  });

  // **Validates: Requirement 1.12**
  it('Sección 11: Inferencia — menciona Inferencia, predicción, lotes o batch', () => {
    expect(content).toContain('Inferencia');
    expect(content.toLowerCase()).toContain('predicción');

    const hasLotesOrBatch = content.toLowerCase().includes('lotes') || content.toLowerCase().includes('batch');
    expect(hasLotesOrBatch).toBe(true);
  });

  // **Validates: Requirement 1.13**
  it('Sección 12: AutoML e Interpretabilidad — menciona AutoML, Feature Importance', () => {
    expect(content).toContain('AutoML');
    expect(content).toContain('Feature Importance');
  });
});
