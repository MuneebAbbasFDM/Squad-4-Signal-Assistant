/**
 * Account Types
 * Core types for account and stakeholder management
 */

export interface Account {
  id: string;
  name: string;
  industry?: string;
  website?: string;
  description?: string;
  stakeholders: Stakeholder[];
  opportunities: Opportunity[];
  meetings: Meeting[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Stakeholder {
  id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  title?: string;
  department?: string;
  role: StakeholderRole;
  influenceLevel: InfluenceLevel;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type StakeholderRole =
  | 'economic_buyer'
  | 'technical_buyer'
  | 'champion'
  | 'influencer'
  | 'blocker'
  | 'end_user'
  | 'unknown';

export type InfluenceLevel = 'high' | 'medium' | 'low' | 'unknown';

export interface Opportunity {
  id: string;
  accountId: string;
  name: string;
  value?: number;
  currency?: string;
  stage: OpportunityStage;
  closeDate?: Date;
  probability?: number;
  meddpicc: MEDDPICCData;
  riskScore?: number;
  confidenceScore?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OpportunityStage =
  | 'qualification'
  | 'discovery'
  | 'solution'
  | 'proposal'
  | 'negotiation'
  | 'closed_won'
  | 'closed_lost';
