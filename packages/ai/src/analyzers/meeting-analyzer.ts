import { MEDDPICCAnalyzer, type MEDDPICCAnalysisResult } from './meddpicc-analyzer.js';
import { SPINAnalyzer, type SPINAnalysisResult } from './spin-analyzer.js';

export interface MeetingAnalyzerConfig {
  apiKey: string;
  model?: string;
}

export interface AnalyzeMeetingInput {
  meetingTitle: string;
  accountName: string;
  attendees: string[];
  transcript: string;
}

export interface MeetingAnalysisResult {
  meddpicc: MEDDPICCAnalysisResult;
  spin: SPINAnalysisResult;
  combinedScore: number;
  summary: string;
  criticalGaps: string[];
  topSuggestedQuestions: Array<{
    framework: 'meddpicc' | 'spin';
    category: string;
    question: string;
    priority: number;
  }>;
}

/**
 * Combined Meeting Analyzer
 * Performs comprehensive analysis using both MEDDPICC and SPIN frameworks
 */
export class MeetingAnalyzer {
  private meddpiccAnalyzer: MEDDPICCAnalyzer;
  private spinAnalyzer: SPINAnalyzer;

  constructor(config: MeetingAnalyzerConfig) {
    this.meddpiccAnalyzer = new MEDDPICCAnalyzer(config);
    this.spinAnalyzer = new SPINAnalyzer(config);
  }

  /**
   * Perform comprehensive meeting analysis
   */
  async analyze(input: AnalyzeMeetingInput): Promise<MeetingAnalysisResult> {
    // Run both analyses in parallel
    const [meddpicc, spin] = await Promise.all([
      this.meddpiccAnalyzer.analyze(input),
      this.spinAnalyzer.analyze(input),
    ]);

    // Calculate combined score (weighted average)
    const combinedScore = Math.round(
      meddpicc.overallCoverage * 0.6 + spin.overallCoverage * 0.4
    );

    // Combine critical gaps
    const meddpiccGaps = this.meddpiccAnalyzer.getCriticalGaps(meddpicc);
    const spinGaps = this.spinAnalyzer.getDiscoveryGaps(spin);
    const criticalGaps = [...meddpiccGaps, ...spinGaps];

    // Combine and sort suggested questions by priority
    const allQuestions = [
      ...meddpicc.suggestedQuestions.map((q) => ({
        framework: 'meddpicc' as const,
        ...q,
      })),
      ...spin.suggestedQuestions.map((q) => ({
        framework: 'spin' as const,
        ...q,
      })),
    ].sort((a, b) => b.priority - a.priority);

    const topSuggestedQuestions = allQuestions.slice(0, 5);

    // Generate summary
    const summary = this.generateSummary(meddpicc, spin, combinedScore);

    return {
      meddpicc,
      spin,
      combinedScore,
      summary,
      criticalGaps,
      topSuggestedQuestions,
    };
  }

  private generateSummary(
    meddpicc: MEDDPICCAnalysisResult,
    spin: SPINAnalysisResult,
    combinedScore: number
  ): string {
    let summary = `Meeting Analysis Score: ${combinedScore}%\n\n`;

    summary += `MEDDPICC Coverage: ${meddpicc.overallCoverage}%\n`;
    summary += `SPIN Discovery Quality: ${spin.discoveryQuality}\n\n`;

    if (meddpicc.criticalGaps.length > 0) {
      summary += `Critical MEDDPICC Gaps:\n`;
      for (const gap of meddpicc.criticalGaps.slice(0, 3)) {
        summary += `• ${gap}\n`;
      }
      summary += '\n';
    }

    summary += spin.summary;

    return summary;
  }
}

export { MEDDPICCAnalyzer, SPINAnalyzer };
export type { MEDDPICCAnalysisResult, SPINAnalysisResult };
