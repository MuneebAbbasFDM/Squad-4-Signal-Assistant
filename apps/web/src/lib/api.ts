import type { ApiResponse } from '@signal-assistant/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = (await response.json()) as ApiResponse<T>;

    if (!response.ok) {
      throw new Error(data.error?.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error');
  }
}

/**
 * API client with typed methods
 */
export const api = {
  // Health
  health: {
    check: () => fetchApi<{ status: string; timestamp: string }>('/health'),
    ready: () =>
      fetchApi<{ ready: boolean; services: Record<string, boolean> }>(
        '/health/ready'
      ),
  },

  // Accounts
  accounts: {
    list: () =>
      fetchApi<import('@signal-assistant/shared').Account[]>(
        '/api/v1/accounts'
      ),
    get: (id: string) =>
      fetchApi<import('@signal-assistant/shared').Account>(
        `/api/v1/accounts/${id}`
      ),
    create: (data: import('@signal-assistant/shared').CreateAccountRequest) =>
      fetchApi<import('@signal-assistant/shared').Account>(
        '/api/v1/accounts',
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      ),
  },

  // Meetings
  meetings: {
    list: () =>
      fetchApi<import('@signal-assistant/shared').Meeting[]>(
        '/api/v1/meetings'
      ),
    get: (id: string) =>
      fetchApi<import('@signal-assistant/shared').Meeting>(
        `/api/v1/meetings/${id}`
      ),
    create: (data: import('@signal-assistant/shared').CreateMeetingRequest) =>
      fetchApi<import('@signal-assistant/shared').Meeting>(
        '/api/v1/meetings',
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      ),
    uploadTranscript: (
      id: string,
      data: import('@signal-assistant/shared').UploadTranscriptRequest
    ) =>
      fetchApi<{ message: string; meetingId: string }>(
        `/api/v1/meetings/${id}/transcript`,
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      ),
    getAnalysis: (id: string) =>
      fetchApi<import('@signal-assistant/shared').MeetingAnalysis>(
        `/api/v1/meetings/${id}/analysis`
      ),
  },

  // Opportunities
  opportunities: {
    list: () =>
      fetchApi<import('@signal-assistant/shared').Opportunity[]>(
        '/api/v1/opportunities'
      ),
    get: (id: string) =>
      fetchApi<import('@signal-assistant/shared').Opportunity>(
        `/api/v1/opportunities/${id}`
      ),
    getHealth: (id: string) =>
      fetchApi<import('@signal-assistant/shared').OpportunityHealth>(
        `/api/v1/opportunities/${id}/health`
      ),
    getPipelineInsights: () =>
      fetchApi<import('@signal-assistant/shared').PipelineInsights>(
        '/api/v1/opportunities/insights/pipeline'
      ),
  },
  // Chat / Meeting Plan
  chat: {
    clients: () =>
      fetchApi<{ clients: string[]; account: string }>('/api/v1/chat/clients'),
    plan: (clientName: string) =>
      fetchApi<import('@signal-assistant/shared').Meeting>(
        `/api/v1/chat/plan/${encodeURIComponent(clientName)}`
      ),
    send: (message: string, clientName?: string) =>
      fetchApi<{
        reply: string;
        availableClients?: string[];
      }>('/api/v1/chat', {
        method: 'POST',
        body: JSON.stringify({ message, clientName }),
      }),
  },
};
