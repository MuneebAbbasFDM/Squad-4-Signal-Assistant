/**
 * MEDDPICC Framework Types
 * Types for MEDDPICC sales methodology tracking
 */

export interface MEDDPICCData {
  metrics: MEDDPICCElement;
  economicBuyer: MEDDPICCElement;
  decisionCriteria: MEDDPICCElement;
  decisionProcess: MEDDPICCElement;
  paperProcess: MEDDPICCElement;
  identifiedPain: MEDDPICCElement;
  champion: MEDDPICCElement;
  competition: MEDDPICCElement;
}

export interface MEDDPICCElement {
  status: ElementStatus;
  confidence: number; // 0-100
  value?: string;
  evidence: Evidence[];
  lastUpdated?: Date;
  notes?: string;
}

export type ElementStatus =
  | 'not_started'
  | 'in_progress'
  | 'weak'
  | 'inferred'
  | 'confirmed'
  | 'at_risk';

export interface Evidence {
  id: string;
  source: EvidenceSource;
  sourceId: string;
  text: string;
  timestamp?: Date;
  speakerName?: string;
  confidence: number;
}

export type EvidenceSource = 'meeting' | 'crm' | 'email' | 'manual';

export interface MEDDPICCCoverage {
  overall: number; // 0-100 percentage
  metrics: number;
  economicBuyer: number;
  decisionCriteria: number;
  decisionProcess: number;
  paperProcess: number;
  identifiedPain: number;
  champion: number;
  competition: number;
}

export const MEDDPICC_CATEGORIES = [
  'metrics',
  'economicBuyer',
  'decisionCriteria',
  'decisionProcess',
  'paperProcess',
  'identifiedPain',
  'champion',
  'competition',
] as const;

export type MEDDPICCCategory = (typeof MEDDPICC_CATEGORIES)[number];

export const MEDDPICC_LABELS: Record<MEDDPICCCategory, string> = {
  metrics: 'Metrics',
  economicBuyer: 'Economic Buyer',
  decisionCriteria: 'Decision Criteria',
  decisionProcess: 'Decision Process',
  paperProcess: 'Paper Process',
  identifiedPain: 'Identified Pain',
  champion: 'Champion',
  competition: 'Competition',
};

export const MEDDPICC_DESCRIPTIONS: Record<MEDDPICCCategory, string> = {
  metrics: 'Quantifiable measures of success the customer is trying to achieve',
  economicBuyer: 'The person with the authority to spend money and make the final decision',
  decisionCriteria: 'The formal criteria by which the customer will evaluate solutions',
  decisionProcess: 'The steps and stakeholders involved in making a decision',
  paperProcess: 'The legal and procurement process to get a contract signed',
  identifiedPain: 'The business problems and challenges the customer is facing',
  champion: 'An internal advocate who has power and influence within the organization',
  competition: 'Other vendors or alternatives the customer is considering',
};
