import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');
const lab03Root = resolve(labRoot, '..', 'lab-03-bedrock-rag');
const content = readFileSync(resolve(lab03Root, 'CONCEPTOS-RAG.md'), 'utf-8');

describe('CONCEPTOS-RAG.md Content', () => {
  it('title contains "RAG con Amazon Bedrock Knowledge Bases"', () => {
    expect(content).toMatch(/^#\s.*RAG con Amazon Bedrock Knowledge Bases/m);
  });

  it('contains section about "El Problema que RAG Resuelve"', () => {
    expect(content).toContain('El Problema que RAG Resuelve');
  });

  it('contains section about "Arquitectura de RAG"', () => {
    expect(content).toContain('Arquitectura de RAG');
  });

  it('contains section about "Embeddings"', () => {
    expect(content).toContain('Embeddings');
  });

  it('contains section about "Knowledge Bases en Amazon Bedrock"', () => {
    expect(content).toContain('Knowledge Bases en Amazon Bedrock');
  });

  it('contains section about "Preparación del Entorno"', () => {
    expect(content).toContain('Preparación del Entorno');
  });

  it('contains section about "Terminología AWS"', () => {
    expect(content).toContain('Terminología AWS');
  });

  it('contains RAG terminology: Knowledge Base, Data Source, Sync, Chunking Strategy, Vector Store', () => {
    expect(content).toContain('Knowledge Base');
    expect(content).toContain('Data Source');
    expect(content).toContain('Sync');
    expect(content).toContain('Chunking Strategy');
    expect(content).toContain('Vector Store');
  });

  it('contains preserved theoretical content (key analogies like "sismólogo")', () => {
    expect(content).toContain('sismólogo');
  });

  it('contains preserved theoretical content (references to "OpenSearch Serverless")', () => {
    expect(content).toContain('OpenSearch Serverless');
  });
});
