import OpenAI from 'openai';
import { z } from 'zod';
import {
  MEDDPICC_SYSTEM_PROMPT,
  MEDDPICC_ANALYSIS_PROMPT,
  MEDDPICC_CATEGORIES,
} from '../prompts/meddpicc.js';

// Schema for MEDDPICC analysis response
const MEDDPICCEvidenceSchema = z.object({
  text: z.string(),
  speakerName: z.string().optional(),
  isInferred: z.boolean().default(false),
});

const MEDDPICCElementSchema = z.object({
  status: z.enum([
    'NOT_STARTED',
    'IN_PROGRESS',
    'WEAK',
    'INFERRED',
    'CONFIRMED',
    'AT_RISK',
  ]),
  confidence: z.number().min(0).max(100),
  value: z.string().optional(),
  evidence: z.array(MEDDPICCEvidenceSchema).default([]),
  gaps: z.array(z.string()).default([]),
});

const SuggestedQuestionSchema = z.object({
  category: z.string(),
  question: z.string(),
  priority: z.number().min(1).max(5),
  context: z.string().optional(),
});

const MEDDPICCAnalysisResultSchema = z.object({
  elements: z.object({
    metrics: MEDDPICCElementSchema,
    economicBuyer: MEDDPICCElementSchema,
    decisionCriteria: MEDDPICCElementSchema,
    decisionProcess: MEDDPICCElementSchema,
    paperProcess: MEDDPICCElementSchema,
    identifiedPain: MEDDPICCElementSchema,
    champion: MEDDPICCElementSchema,
    competition: MEDDPICCElementSchema,
  }),
  overallCoverage: z.number().min(0).max(100),
  criticalGaps: z.array(z.string()),
  suggestedQuestions: z.array(SuggestedQuestionSchema),
});

export type MEDDPICCAnalysisResult = z.infer<typeof MEDDPICCAnalysisResultSchema>;

export interface MEDDPICCAnalyzerConfig {
  apiKey: string;
  model?: string;
}

export interface AnalyzeMeetingInput {
  meetingTitle: string;
  accountName: string;
  attendees: string[];
  transcript: string;
}

/**
 * MEDDPICC Analyzer
 * Analyzes meeting transcripts to extract MEDDPICC framework elements
 */
export class MEDDPICCAnalyzer {
  private openai: OpenAI;
  private model: string;

  constructor(config: MEDDPICCAnalyzerConfig) {
    this.openai = new OpenAI({ apiKey: config.apiKey });
    this.model = config.model || 'gpt-4-turbo-preview';
  }

  /**
   * Analyze a meeting transcript for MEDDPICC elements
   */
  async analyze(input: AnalyzeMeetingInput): Promise<MEDDPICCAnalysisResult> {
    const prompt = this.buildPrompt(input);

    const completion = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: MEDDPICC_SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const parsed = JSON.parse(content);
    return MEDDPICCAnalysisResultSchema.parse(parsed);
  }

  /**
   * Calculate coverage percentage for each MEDDPICC element
   */
  calculateCoverage(result: MEDDPICCAnalysisResult): Record<string, number> {
    const coverage: Record<string, number> = {};

    for (const category of MEDDPICC_CATEGORIES) {
      const element = result.elements[category];
      coverage[category] = element.confidence;
    }

    coverage['overall'] = result.overallCoverage;
    return coverage;
  }

  /**
   * Get critical gaps that need immediate attention
   */
  getCriticalGaps(result: MEDDPICCAnalysisResult): string[] {
    const gaps: string[] = [];

    for (const category of MEDDPICC_CATEGORIES) {
      const element = result.elements[category];
      if (element.status === 'NOT_STARTED' || element.status === 'WEAK') {
        gaps.push(`${category}: ${element.gaps.join(', ') || 'Not addressed'}`);
      }
    }

    return gaps;
  }

  private buildPrompt(input: AnalyzeMeetingInput): string {
    return MEDDPICC_ANALYSIS_PROMPT
      .replace('{{meetingTitle}}', input.meetingTitle)
      .replace('{{accountName}}', input.accountName)
      .replace('{{attendees}}', input.attendees.join(', '))
      .replace('{{transcript}}', input.transcript);
  }
}
