/**
 * Risk and Gap Detection Types
 * Types for opportunity health assessment and gap detection
 */

export interface DiscoveryGap {
  id: string;
  opportunityId: string;
  category: GapCategory;
  framework: 'meddpicc' | 'spin' | 'general';
  element: string;
  severity: GapSeverity;
  description: string;
  suggestedAction: string;
  detectedAt: Date;
  resolvedAt?: Date;
}

export type GapCategory =
  | 'missing'
  | 'weak'
  | 'contradictory'
  | 'outdated'
  | 'unconfirmed';

export type GapSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface RiskIndicator {
  id: string;
  opportunityId: string;
  type: RiskType;
  severity: GapSeverity;
  description: string;
  evidence?: string;
  recommendation: string;
  detectedAt: Date;
  acknowledgedAt?: Date;
  resolvedAt?: Date;
}

export type RiskType =
  | 'no_economic_buyer'
  | 'unclear_decision_criteria'
  | 'no_quantified_metrics'
  | 'champion_not_confirmed'
  | 'stalled_progress'
  | 'competitor_threat'
  | 'budget_uncertainty'
  | 'timeline_unclear'
  | 'stakeholder_blocker'
  | 'missing_next_steps';

export interface SuggestedQuestion {
  id: string;
  framework: 'meddpicc' | 'spin';
  category: string;
  question: string;
  priority: number;
  context?: string;
  gapId?: string;
}

export interface OpportunityHealth {
  opportunityId: string;
  overallScore: number; // 0-100
  meddpiccScore: number;
  spinScore: number;
  riskLevel: GapSeverity;
  gapCount: number;
  criticalGaps: number;
  lastAssessedAt: Date;
  trend: 'improving' | 'stable' | 'declining';
}

export interface PipelineInsights {
  totalOpportunities: number;
  averageHealthScore: number;
  atRiskOpportunities: number;
  healthyOpportunities: number;
  averageMeddpiccCoverage: number;
  averageSpinCoverage: number;
  topRisks: RiskIndicator[];
  stageDistribution: Record<string, number>;
  healthDistribution: Record<GapSeverity, number>;
}
