/**
 * API Types
 * Common API request/response types
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: PaginationMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DateRangeParams {
  startDate?: string;
  endDate?: string;
}

export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, unknown>;
}

// Common API endpoint types
export interface CreateAccountRequest {
  name: string;
  industry?: string;
  website?: string;
  description?: string;
}

export interface UpdateAccountRequest extends Partial<CreateAccountRequest> {
  id: string;
}

export interface CreateMeetingRequest {
  accountId: string;
  opportunityId?: string;
  title: string;
  description?: string;
  scheduledAt?: string;
  attendees?: Array<{
    name: string;
    email?: string;
    role: 'host' | 'presenter' | 'participant';
    isInternal: boolean;
  }>;
}

export interface UploadTranscriptRequest {
  meetingId: string;
  transcript: string;
  format?: 'plain' | 'vtt' | 'srt';
}

export interface AnalyzeMeetingRequest {
  meetingId: string;
  options?: {
    analyzeMeddpicc?: boolean;
    analyzeSpin?: boolean;
    detectGaps?: boolean;
    suggestQuestions?: boolean;
  };
}
