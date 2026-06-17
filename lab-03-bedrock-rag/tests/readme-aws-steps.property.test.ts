// Feature: lab03-readme-aws-validation, Property 1: Bug Condition
// **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8**
//
// This test verifies that the README instructions match the CURRENT AWS console
// interface as documented in official AWS documentation. The test encodes the
// EXPECTED behavior — what the README SHOULD say. When run against the unfixed
// README, the test is expected to FAIL, confirming the bug exists.

import { describe, it, expect, beforeAll } from 'vitest';
import fc from 'fast-check';
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
// AWS Documentation Reference Data
// Source: Official AWS Documentation (docs.aws.amazon.com) as of 2025
// ============================================================================

/**
 * Step 2: IAM Console — Verify roles
 * Source: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_update-role-trust-policy.html
 *
 * According to AWS docs:
 * - Left navigation pane has "Roles"
 * - Role details have a "Trust relationships" tab
 * - The README correctly describes navigation to IAM > Roles
 */
const iamExpected = {
  navSection: 'Roles',
  trustTab: 'Trust relationships',
};

/**
 * Step 3: S3 Console — Create bucket
 * Source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html
 *
 * According to AWS docs:
 * - Left navigation pane: "General purpose buckets"
 * - Button: "Create bucket"
 * - Encryption section: "Default encryption" with field "Encryption type"
 * - SSE-S3 option: "Server-side encryption with Amazon S3 managed keys (SSE-S3)"
 */
const s3Expected = {
  navSection: 'General purpose buckets',
  createButton: 'Create bucket',
  encryptionSectionName: 'Default encryption',
  encryptionFieldName: 'Encryption type',
  sseS3Option: 'Server-side encryption with Amazon S3 managed keys (SSE-S3)',
};

/**
 * Step 5: Amazon Bedrock Console — Create Knowledge Base
 * Source: https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-create.html
 *
 * According to AWS docs:
 * - Left navigation pane: "Knowledge bases" (directly, NOT under "Orchestration")
 * - The wizard includes data source selection, embeddings model, and vector database
 *   all in ONE unified flow
 * - Data source (e.g., Amazon S3) is configured WITHIN the creation wizard
 * - Embeddings model section: "Embeddings model"
 * - Vector store section: "Vector database" (not "Vector store")
 * - Quick create option: "Quick create a new vector store"
 */
const kbCreationExpected = {
  navSection: 'Knowledge bases',
  incorrectNavSection: 'Orchestration',
  dataSourceIntegratedInWizard: true,
  embeddingsSection: 'Embeddings model',
  vectorStoreSection: 'Vector database',
  quickCreateOption: 'Quick create a new vector store',
};

/**
 * Step 6: Data Source — configured WITHIN the KB wizard
 * Source: https://docs.aws.amazon.com/bedrock/latest/userguide/s3-data-source-connector.html
 *
 * According to AWS docs:
 * - S3 data source is configured as part of the KB creation wizard
 * - The chunking section is called "Content parsing and chunking"
 * - There is NO separate "Configurar Data Source" step after KB creation
 */
const dataSourceExpected = {
  configuredWithinWizard: true,
  chunkingSection: 'Content parsing and chunking',
};

/**
 * Steps 6-9: Testing Knowledge Base (renumbered from old Steps 7-10)
 * Source: https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve-generate.html
 *
 * According to AWS docs:
 * - Sync: select data source and click "Sync" in the data source overview section
 * - Test window: expands from the right when selecting KB or clicking "Test knowledge base"
 * - Toggle: "Generate responses for your query" to enable RAG generation
 * - Model selection: "Select model" button, then "Apply"
 * - Send query: "Run" button
 * - Citations: shown as "footnotes" that can be clicked to see excerpts
 * - Source details: "Show source details" button to expand chunks
 */
const testingExpected = {
  syncButton: 'Sync',
  testWindowButton: 'Test knowledge base',
  generateToggle: 'Generate responses',
  selectModelButton: 'Select model',
  runButton: 'Run',
  citationsFormat: 'footnote',
  sourceDetailsButton: 'Show source details',
};

// ============================================================================
// Helper functions
// ============================================================================

/** Extract the content of a specific step section from the README */
function extractStepContent(stepNumber: number): string {
  const stepPattern = new RegExp(
    `### Paso ${stepNumber}:.*?(?=### Paso \\d+:|## [^#]|---\\s*$)`,
    's',
  );
  const match = readmeContent.match(stepPattern);
  return match ? match[0] : '';
}

/** Check if a text contains a specific term (case-insensitive) */
function containsTerm(text: string, term: string): boolean {
  return text.toLowerCase().includes(term.toLowerCase());
}

// ============================================================================
// Property-Based Tests
// ============================================================================

describe('Property 1: Bug Condition — README instructions match AWS console (Steps 2-8)', () => {
  // --------------------------------------------------------------------------
  // Step 2: S3 Console — Create Bucket
  // Validates: Requirement 1.2
  // --------------------------------------------------------------------------
  describe('Step 2: S3 Console — Create Bucket', () => {
    it('should use correct S3 encryption terminology from AWS docs', () => {
      const step2 = extractStepContent(2);
      expect(step2.length).toBeGreaterThan(0);

      fc.assert(
        fc.property(
          fc.constantFrom(
            s3Expected.encryptionSectionName,
            s3Expected.encryptionFieldName,
          ),
          (expectedTerm) => {
            const hasCorrectTerm = containsTerm(step2, expectedTerm);
            expect(
              hasCorrectTerm,
              `Step 2 should reference "${expectedTerm}" as used in AWS S3 console docs`,
            ).toBe(true);
          },
        ),
        { numRuns: 10 },
      );
    });
  });

  // --------------------------------------------------------------------------
  // Step 4: Amazon Bedrock — Create Knowledge Base
  // Validates: Requirements 1.4, 1.5
  // --------------------------------------------------------------------------
  describe('Step 4: Amazon Bedrock — Create Knowledge Base', () => {
    it('should NOT reference "Orchestration" as the nav section — AWS docs say "Knowledge bases" directly', () => {
      const step4 = extractStepContent(4);
      expect(step4.length).toBeGreaterThan(0);

      const mentionsOrchestration = containsTerm(
        step4,
        kbCreationExpected.incorrectNavSection,
      );
      expect(
        mentionsOrchestration,
        `Step 4 should NOT mention "${kbCreationExpected.incorrectNavSection}" — AWS docs show "Knowledge bases" directly in the nav pane`,
      ).toBe(false);
    });

    it('should reference "Vector database" section (not just "Vector store")', () => {
      const step4 = extractStepContent(4);

      expect(
        containsTerm(step4, kbCreationExpected.vectorStoreSection),
        `Step 4 should reference "${kbCreationExpected.vectorStoreSection}" as the section name in the KB wizard`,
      ).toBe(true);
    });

    it('should include data source configuration within the KB creation wizard', () => {
      const step4 = extractStepContent(4);

      if (kbCreationExpected.dataSourceIntegratedInWizard) {
        const mentionsS3URI = containsTerm(step4, 'S3 URI') || containsTerm(step4, 's3://');
        const mentionsDataSourceInWizard = containsTerm(step4, 'data source') || containsTerm(step4, 'fuente de datos');
        const mentionsChunking = containsTerm(step4, 'chunking') || containsTerm(step4, 'Content parsing');

        expect(
          mentionsS3URI || mentionsDataSourceInWizard || mentionsChunking,
          'Step 4 should include data source configuration (S3 URI, chunking) within the KB creation wizard, as per AWS docs',
        ).toBe(true);
      }
    });
  });

  // --------------------------------------------------------------------------
  // Step 5: Data Source — Should be integrated or correctly described
  // Validates: Requirement 1.5
  // --------------------------------------------------------------------------
  describe('Step 5: Data Source configuration', () => {
    it('should NOT describe Data Source as a completely separate post-creation step', () => {
      const step5 = extractStepContent(5);

      if (dataSourceExpected.configuredWithinWizard) {
        const describesPostCreation =
          containsTerm(step5, 'recién creada') ||
          containsTerm(step5, 'Knowledge Base recién') ||
          containsTerm(step5, 'Add data source');

        expect(
          describesPostCreation,
          'Step 5 should NOT describe Data Source configuration as a separate post-creation step — AWS docs show it is part of the KB creation wizard',
        ).toBe(false);
      }
    });
  });

  // --------------------------------------------------------------------------
  // Steps 8-10: Testing Knowledge Base
  // Validates: Requirements 1.7, 1.8
  // --------------------------------------------------------------------------
  describe('Step 6: Select Generation Model', () => {
    it('should describe the "Generate responses" toggle for enabling RAG generation', () => {
      const step6 = extractStepContent(6);
      expect(step6.length).toBeGreaterThan(0);

      expect(
        containsTerm(step6, testingExpected.generateToggle) ||
          containsTerm(step6, 'Generate responses'),
        `Step 6 should mention the "${testingExpected.generateToggle}" toggle as described in AWS docs`,
      ).toBe(true);
    });

    it('should reference "Select model" button for choosing the generation model', () => {
      const step6 = extractStepContent(6);

      expect(
        containsTerm(step6, testingExpected.selectModelButton),
        `Step 6 should reference "${testingExpected.selectModelButton}" button as per AWS docs`,
      ).toBe(true);
    });
  });

  describe('Step 8: Verify Citations', () => {
    it('should describe citations as footnotes (AWS docs terminology)', () => {
      const step8 = extractStepContent(8);
      expect(step8.length).toBeGreaterThan(0);

      const mentionsFootnotes = containsTerm(step8, 'footnote') || containsTerm(step8, 'nota al pie');
      const mentionsSourceDetails = containsTerm(step8, testingExpected.sourceDetailsButton);

      expect(
        mentionsFootnotes || mentionsSourceDetails,
        `Step 8 should describe citations as "footnotes" or mention "${testingExpected.sourceDetailsButton}" as per AWS docs`,
      ).toBe(true);
    });
  });

  // --------------------------------------------------------------------------
  // Cross-step property: All AWS console navigation terms should be accurate
  // Validates: Requirements 1.1-1.8
  // --------------------------------------------------------------------------
  describe('Cross-step: AWS console terminology consistency', () => {
    it('for any step describing Bedrock KB navigation, should use "Knowledge bases" not "Orchestration"', () => {
      // Collect all steps that mention Bedrock KB navigation
      const stepsWithBedrockNav = [4, 5, 6, 7, 8]
        .map((n) => ({ stepNum: n, content: extractStepContent(n) }))
        .filter((s) => s.content.length > 0);

      fc.assert(
        fc.property(fc.constantFrom(...stepsWithBedrockNav), (step) => {
          // No step should reference "Orchestration" as a navigation section
          // AWS docs clearly show "Knowledge bases" is directly in the left nav
          const mentionsOrchestration = containsTerm(
            step.content,
            'Orchestration',
          );
          expect(
            mentionsOrchestration,
            `Step ${step.stepNum} should not reference "Orchestration" — AWS docs show "Knowledge bases" directly in nav pane`,
          ).toBe(false);
        }),
        { numRuns: 50 },
      );
    });
  });
});
