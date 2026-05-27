/**
 * SPIN Framework Types
 * Types for SPIN selling methodology tracking
 */

export interface SPINData {
  situation: SPINElement;
  problem: SPINElement;
  implication: SPINElement;
  needPayoff: SPINElement;
}

export interface SPINElement {
  questions: SPINQuestion[];
  insights: SPINInsight[];
  coverage: number; // 0-100
  lastUpdated?: Date;
}

export interface SPINQuestion {
  id: string;
  question: string;
  answer?: string;
  askedAt?: Date;
  askedBy?: string;
  meetingId?: string;
  evidence?: string;
  confidence: number;
}

export interface SPINInsight {
  id: string;
  type: SPINCategory;
  content: string;
  source: string;
  sourceId: string;
  confidence: number;
  createdAt: Date;
}

export interface SPINCoverage {
  overall: number; // 0-100 percentage
  situation: number;
  problem: number;
  implication: number;
  needPayoff: number;
}

export const SPIN_CATEGORIES = ['situation', 'problem', 'implication', 'needPayoff'] as const;

export type SPINCategory = (typeof SPIN_CATEGORIES)[number];

export const SPIN_LABELS: Record<SPINCategory, string> = {
  situation: 'Situation',
  problem: 'Problem',
  implication: 'Implication',
  needPayoff: 'Need-Payoff',
};

export const SPIN_DESCRIPTIONS: Record<SPINCategory, string> = {
  situation:
    'Questions about the customer\'s current situation, background, and context',
  problem:
    'Questions about problems, difficulties, or dissatisfactions the customer is experiencing',
  implication:
    'Questions about the consequences, effects, or implications of the problems',
  needPayoff:
    'Questions about the value, usefulness, or importance of solving the problem',
};

export const SPIN_EXAMPLE_QUESTIONS: Record<SPINCategory, string[]> = {
  situation: [
    'How many employees do you have?',
    'What systems are you currently using?',
    'How long have you been with the company?',
  ],
  problem: [
    'Are you satisfied with your current solution?',
    'What challenges are you facing with X?',
    'Is the current process taking too long?',
  ],
  implication: [
    'What happens when deadlines are missed?',
    'How does that affect your team\'s productivity?',
    'What\'s the cost of not solving this problem?',
  ],
  needPayoff: [
    'How would it help if you could do X?',
    'What benefits would you see from solving this?',
    'Would that make your job easier?',
  ],
};
