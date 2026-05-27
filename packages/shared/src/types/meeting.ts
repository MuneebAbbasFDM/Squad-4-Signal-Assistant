/**
 * Meeting Types
 * Types for meeting capture, transcription, and analysis
 */

export interface Meeting {
  id: string;
  accountId: string;
  opportunityId?: string;
  title: string;
  description?: string;
  scheduledAt?: Date;
  startedAt?: Date;
  endedAt?: Date;
  status: MeetingStatus;
  attendees: MeetingAttendee[];
  transcript?: Transcript;
  analysis?: MeetingAnalysis;
  nextSteps: NextStep[];
  createdAt: Date;
  updatedAt: Date;
}

export type MeetingStatus =
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface MeetingAttendee {
  id: string;
  meetingId: string;
  stakeholderId?: string;
  name: string;
  email?: string;
  role: AttendeeRole;
  isInternal: boolean;
}

export type AttendeeRole = 'host' | 'presenter' | 'participant';

export interface Transcript {
  id: string;
  meetingId: string;
  rawText: string;
  normalizedText: string;
  segments: TranscriptSegment[];
  processingStatus: ProcessingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ProcessingStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed';

export interface TranscriptSegment {
  id: string;
  transcriptId: string;
  speakerId?: string;
  speakerName?: string;
  text: string;
  normalizedText: string;
  startTime: number; // milliseconds
  endTime: number; // milliseconds
  confidence: number;
  frameworkTags: FrameworkTag[];
}

export interface FrameworkTag {
  type: 'meddpicc' | 'spin';
  category: string;
  confidence: number;
  isInferred: boolean;
}

export interface MeetingAnalysis {
  id: string;
  meetingId: string;
  meddpiccCoverage: MEDDPICCCoverage;
  spinCoverage: SPINCoverage;
  gaps: DiscoveryGap[];
  risks: RiskIndicator[];
  suggestedQuestions: SuggestedQuestion[];
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NextStep {
  id: string;
  meetingId: string;
  description: string;
  assigneeId?: string;
  assigneeName?: string;
  dueDate?: Date;
  status: NextStepStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type NextStepStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
