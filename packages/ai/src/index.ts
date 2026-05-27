/**
 * Signal Assistant AI Package
 * AI-powered analysis engine for MEDDPICC and SPIN frameworks
 */

// Analyzers
export {
  MeetingAnalyzer,
  MEDDPICCAnalyzer,
  SPINAnalyzer,
} from './analyzers/index.js';

export type {
  MEDDPICCAnalysisResult,
  SPINAnalysisResult,
  MeetingAnalysisResult,
} from './analyzers/meeting-analyzer.js';

// Prompts
export {
  MEDDPICC_SYSTEM_PROMPT,
  MEDDPICC_ANALYSIS_PROMPT,
  MEDDPICC_CATEGORIES,
} from './prompts/meddpicc.js';

export {
  SPIN_SYSTEM_PROMPT,
  SPIN_ANALYSIS_PROMPT,
  SPIN_CATEGORIES,
} from './prompts/spin.js';
