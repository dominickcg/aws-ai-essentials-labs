// Feature: lab03-readme-aws-validation, Property 2: Preservation
// **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8**
//
// These tests verify that content NOT related to AWS console navigation is
// preserved intact. They capture the baseline behavior of the unfixed README
// and MUST PASS on the unfixed code. After the fix, they confirm no regressions.

import { describe, it, expect, beforeAll } from 'vitest';
import fc from 'fast-check';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const labRoot = resolve(__dirname, '..');

let readmeContent: string;
let promptsRagContent: string;

beforeAll(() => {
  readmeContent = readFileSync(resolve(labRoot, 'README.md'), 'utf-8');
  promptsRagContent = readFileSync(resolve(labRoot, 'prompts-rag.md'), 'utf-8');
});

// ============================================================================
// Helper functions
// ============================================================================

/** Extract support file references from the README (local files only, no parent-dir refs) */
function extractFileReferences(content: string): string[] {
  const refs: string[] = [];
  // Match markdown links like [text](path) — only relative paths within the lab
  const linkPattern = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = linkPattern.exec(content)) !== null) {
    const href = match[2];
    // Skip anchor-only links, external URLs, and parent directory references
    if (!href.startsWith('#') && !href.startsWith('http') && !href.startsWith('..')) {
      // Strip anchor fragments from file paths
      const filePath = href.split('#')[0];
      if (filePath.length > 0) {
        refs.push(filePath);
      }
    }
  }
  // Also match backtick references to known support files/folders
  const backtickPattern = /`(documentos-geofisicos\/)`/g;
  while ((match = backtickPattern.exec(content)) !== null) {
    refs.push(match[1]);
  }
  return [...new Set(refs)];
}

/** Extract all AWS resource names from the README (names in backticks that look like resource identifiers) */
function extractAWSResourceNames(content: string): string[] {
  const names: string[] = [];
  // Match patterns like `s3-lab03-knowledge-source-{nombre-participante}`
  // and `s3://s3-lab03-knowledge-source-{nombre-participante}/`
  // and `kb-geofisica-{nombre-participante}`
  const backtickPattern = /`([^`]*\{nombre-participante\}[^`]*)`/g;
  let match: RegExpExecArray | null;
  while ((match = backtickPattern.exec(content)) !== null) {
    names.push(match[1]);
  }
  return names;
}

/** Extract all "Paso N" step headings from the README */
function extractMainSteps(content: string): { stepNum: number; heading: string }[] {
  const steps: { stepNum: number; heading: string }[] = [];
  const stepPattern = /^#{2,3}\s+Paso\s+(\d+)[:.]?\s*(.*)/gm;
  let match: RegExpExecArray | null;
  while ((match = stepPattern.exec(content)) !== null) {
    steps.push({ stepNum: parseInt(match[1], 10), heading: match[0] });
  }
  return steps;
}


/** Extract the verification checkpoint text following a step */
function getVerificationAfterStep(content: string, stepNum: number): string | null {
  // Find the step heading, then look for the next ✓ Verificación before the next same-level step
  // Use \n### Paso to only match level-3 headings (not #### sub-headings)
  const stepPattern = new RegExp(
    `### Paso ${stepNum}[:\\s][\\s\\S]*?(?=\\n### Paso \\d|\\n## [A-Z]|$)`,
  );
  const stepMatch = content.match(stepPattern);
  if (!stepMatch) return null;
  const stepContent = stepMatch[0];
  const verificationMatch = stepContent.match(/\*\*✓ Verificación\*\*/);
  return verificationMatch ? verificationMatch[0] : null;
}

/** Extract anchor links from the table of contents */
function extractTocAnchors(content: string): { text: string; anchor: string }[] {
  const anchors: { text: string; anchor: string }[] = [];
  // The TOC is between "## Indice" and the next "---"
  const tocMatch = content.match(/## Indice\s*\n([\s\S]*?)(?=\n---)/);
  if (!tocMatch) return anchors;
  const tocContent = tocMatch[1];
  const linkPattern = /\[([^\]]+)\]\(#([^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = linkPattern.exec(tocContent)) !== null) {
    anchors.push({ text: match[1], anchor: match[2] });
  }
  return anchors;
}

/** Generate the expected anchor from a heading text (GitHub-style) */
function headingToAnchor(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\w\s\u00C0-\u024F-]/g, '') // keep letters, numbers, spaces, hyphens, accented chars
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Extract all headings from the README */
function extractHeadings(content: string): string[] {
  const headings: string[] = [];
  const headingPattern = /^#{1,6}\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = headingPattern.exec(content)) !== null) {
    headings.push(match[1].trim());
  }
  return headings;
}

/** Extract code block contents from the README (handles indented code blocks) */
function extractCodeBlocks(content: string): string[] {
  const blocks: string[] = [];
  // Match code blocks that may be indented (e.g., 3 spaces in the README)
  const codeBlockPattern = /^[ \t]*```\s*\n([\s\S]*?)^[ \t]*```/gm;
  let match: RegExpExecArray | null;
  while ((match = codeBlockPattern.exec(content)) !== null) {
    // Trim each line's leading indentation and the overall block
    const lines = match[1].split('\n');
    // Find minimum indentation (ignoring empty lines)
    const nonEmptyLines = lines.filter((l) => l.trim().length > 0);
    if (nonEmptyLines.length === 0) continue;
    const minIndent = Math.min(
      ...nonEmptyLines.map((l) => l.match(/^(\s*)/)?.[1].length ?? 0),
    );
    const dedented = lines.map((l) => l.substring(minIndent)).join('\n').trim();
    if (dedented.length > 0) {
      blocks.push(dedented);
    }
  }
  return blocks;
}

/** Extract prompts from prompts-rag.md code blocks */
function extractPromptsFromFile(content: string): string[] {
  const prompts: string[] = [];
  const codeBlockPattern = /^[ \t]*```\s*\n([\s\S]*?)^[ \t]*```/gm;
  let match: RegExpExecArray | null;
  while ((match = codeBlockPattern.exec(content)) !== null) {
    const trimmed = match[1].trim();
    if (trimmed.length > 0) {
      prompts.push(trimmed);
    }
  }
  return prompts;
}

// ============================================================================
// Property-Based Tests — Preservation
// ============================================================================

describe('Property 2: Preservation — Content not dependent on AWS console remains intact', () => {
  // --------------------------------------------------------------------------
  // Property: For every support file reference in the README, the file exists
  // Validates: Requirement 3.2
  // --------------------------------------------------------------------------
  describe('Support file references exist in filesystem', () => {
    it('for every support file reference in the README, the referenced file/directory exists', () => {
      const fileRefs = extractFileReferences(readmeContent);
      expect(fileRefs.length).toBeGreaterThan(0);

      fc.assert(
        fc.property(fc.constantFrom(...fileRefs), (ref) => {
          // Resolve relative to lab root
          const fullPath = resolve(labRoot, ref);
          expect(
            existsSync(fullPath),
            `Referenced file/directory "${ref}" should exist at ${fullPath}`,
          ).toBe(true);
        }),
        { numRuns: fileRefs.length * 2 },
      );
    });
  });

  // --------------------------------------------------------------------------
  // Property: For every AWS resource name, it contains {nombre-participante}
  // Validates: Requirement 3.3
  // --------------------------------------------------------------------------
  describe('AWS resource names use {nombre-participante} placeholder', () => {
    it('for every AWS resource name in the README, it contains the placeholder {nombre-participante}', () => {
      const resourceNames = extractAWSResourceNames(readmeContent);
      expect(resourceNames.length).toBeGreaterThan(0);

      fc.assert(
        fc.property(fc.constantFrom(...resourceNames), (name) => {
          expect(
            name.includes('{nombre-participante}'),
            `AWS resource name "${name}" should contain {nombre-participante} placeholder`,
          ).toBe(true);
        }),
        { numRuns: resourceNames.length * 2 },
      );
    });
  });

  // --------------------------------------------------------------------------
  // Property: For every main step (Paso N), there is a ✓ Verificación checkpoint
  // Validates: Requirement 3.6
  // --------------------------------------------------------------------------
  describe('Each main step has a verification checkpoint', () => {
    it('for every main step (Paso N), there exists an associated ✓ Verificación checkpoint', () => {
      const steps = extractMainSteps(readmeContent);
      expect(steps.length).toBeGreaterThan(0);

      fc.assert(
        fc.property(fc.constantFrom(...steps), (step) => {
          const verification = getVerificationAfterStep(readmeContent, step.stepNum);
          expect(
            verification,
            `Paso ${step.stepNum} should have a "✓ Verificación" checkpoint`,
          ).not.toBeNull();
        }),
        { numRuns: steps.length * 2 },
      );
    });
  });

  // --------------------------------------------------------------------------
  // Property: For every anchor link in the TOC, there is a corresponding heading
  // Validates: Requirement 3.8 (format/structure)
  // --------------------------------------------------------------------------
  describe('Table of contents anchor links match existing headings', () => {
    it('for every anchor link in the table of contents, there exists a corresponding heading', () => {
      const tocAnchors = extractTocAnchors(readmeContent);
      expect(tocAnchors.length).toBeGreaterThan(0);

      const headings = extractHeadings(readmeContent);
      const headingAnchors = headings.map(headingToAnchor);

      fc.assert(
        fc.property(fc.constantFrom(...tocAnchors), (tocEntry) => {
          const anchorExists = headingAnchors.includes(tocEntry.anchor);
          expect(
            anchorExists,
            `TOC anchor "#${tocEntry.anchor}" (for "${tocEntry.text}") should correspond to an existing heading. Available anchors: ${headingAnchors.join(', ')}`,
          ).toBe(true);
        }),
        { numRuns: tocAnchors.length * 2 },
      );
    });
  });

  // --------------------------------------------------------------------------
  // Property: For every RAG prompt in a code block, it matches prompts-rag.md
  // Validates: Requirement 3.4
  // --------------------------------------------------------------------------
  describe('RAG prompts in code blocks match prompts-rag.md exactly', () => {
    it('for every RAG prompt in a code block in the README, the text matches exactly with the corresponding prompt in prompts-rag.md', () => {
      const readmeCodeBlocks = extractCodeBlocks(readmeContent);
      const promptsFromFile = extractPromptsFromFile(promptsRagContent);

      // Filter README code blocks to only those that are RAG prompts
      // (they contain question marks and are in Spanish — match against known prompts)
      const ragPromptsInReadme = readmeCodeBlocks.filter((block) =>
        promptsFromFile.some((prompt) => prompt === block),
      );

      expect(
        ragPromptsInReadme.length,
        'README should contain at least one RAG prompt from prompts-rag.md in code blocks',
      ).toBeGreaterThan(0);

      fc.assert(
        fc.property(fc.constantFrom(...ragPromptsInReadme), (readmePrompt) => {
          const matchesPromptFile = promptsFromFile.includes(readmePrompt);
          expect(
            matchesPromptFile,
            `RAG prompt in README code block should match exactly with a prompt in prompts-rag.md:\n"${readmePrompt}"`,
          ).toBe(true);
        }),
        { numRuns: ragPromptsInReadme.length * 2 },
      );
    });
  });
});
