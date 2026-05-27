import OpenAI from 'openai';
import { z } from 'zod';
import {
  SPIN_SYSTEM_PROMPT,
  SPIN_ANALYSIS_PROMPT,
  SPIN_CATEGORIES,
} from '../prompts/spin.js';

// Schema for SPIN analysis response
const SPINQuestionSchema = z.object({
  question: z.string(),
  answer: z.string().optional(),
  askedBy: z.string().optional(),
  confidence: z.number().min(0).max(100),
});

const SPINInsightSchema = z.object({
  content: z.string(),
  confidence: z.number().min(0).max(100),
});

const SPINElementSchema = z.object({
  coverage: z.number().min(0).max(100),
  questions: z.array(SPINQuestionSchema).default([]),
  insights: z.array(SPINInsightSchema).default([]),
  gaps: z.array(z.string()).default([]),
});

const SuggestedQuestionSchema = z.object({
  category: z.string(),
  question: z.string(),
  priority: z.number().min(1).max(5),
  context: z.string().optional(),
});

const SPINAnalysisResultSchema = z.object({
  elements: z.object({
    situation: SPINElementSchema,
    problem: SPINElementSchema,
    implication: SPINElementSchema,
    needPayoff: SPINElementSchema,
  }),
  overallCoverage: z.number().min(0).max(100),
  discoveryQuality: z.enum(['weak', 'moderate', 'strong']),
  suggestedQuestions: z.array(SuggestedQuestionSchema),
  summary: z.string(),
});

export type SPINAnalysisResult = z.infer<typeof SPINAnalysisResultSchema>;

export interface SPINAnalyzerConfig {
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
 * SPIN Analyzer
 * Analyzes meeting transcripts to extract SPIN selling elements
 */
export class SPINAnalyzer {
  private openai: OpenAI;
  private model: string;

  constructor(config: SPINAnalyzerConfig) {
    this.openai = new OpenAI({ apiKey: config.apiKey });
    this.model = config.model || 'gpt-4o';
  }

  /**
   * Analyze a meeting transcript for SPIN elements
   */
  async analyze(input: AnalyzeMeetingInput): Promise<SPINAnalysisResult> {
    const prompt = this.buildPrompt(input);

    const completion = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'system', content: SPIN_SYSTEM_PROMPT },
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
    return SPINAnalysisResultSchema.parse(parsed);
  }

  /**
   * Calculate coverage percentage for each SPIN element
   */
  calculateCoverage(result: SPINAnalysisResult): Record<string, number> {
    const coverage: Record<string, number> = {};

    for (const category of SPIN_CATEGORIES) {
      const element = result.elements[category];
      coverage[category] = element.coverage;
    }

    coverage['overall'] = result.overallCoverage;
    return coverage;
  }

  /**
   * Get gaps in SPIN discovery
   */
  getDiscoveryGaps(result: SPINAnalysisResult): string[] {
    const gaps: string[] = [];

    for (const category of SPIN_CATEGORIES) {
      const element = result.elements[category];
      if (element.coverage < 50) {
        gaps.push(
          `${category}: ${element.gaps.join(', ') || 'Insufficient coverage'}`
        );
      }
    }

    return gaps;
  }

  /**
   * Get quality assessment
   */
  assessQuality(result: SPINAnalysisResult): {
    quality: string;
    score: number;
    recommendations: string[];
  } {
    const recommendations: string[] = [];

    // Check for balance across SPIN categories
    const situationCoverage = result.elements.situation.coverage;
    const problemCoverage = result.elements.problem.coverage;
    const implicationCoverage = result.elements.implication.coverage;
    const needPayoffCoverage = result.elements.needPayoff.coverage;

    if (situationCoverage > 60 && problemCoverage < 40) {
      recommendations.push(
        'Too many situation questions. Focus more on problem discovery.'
      );
    }

    if (implicationCoverage < 30) {
      recommendations.push(
        'Explore implications more deeply to build urgency.'
      );
    }

    if (needPayoffCoverage < 30) {
      recommendations.push(
        'Include more need-payoff questions to help customer articulate value.'
      );
    }

    return {
      quality: result.discoveryQuality,
      score: result.overallCoverage,
      recommendations,
    };
  }

  private buildPrompt(input: AnalyzeMeetingInput): string {
    return SPIN_ANALYSIS_PROMPT
      .replace('{{meetingTitle}}', input.meetingTitle)
      .replace('{{accountName}}', input.accountName)
      .replace('{{attendees}}', input.attendees.join(', '))
      .replace('{{transcript}}', input.transcript);
  }
}
