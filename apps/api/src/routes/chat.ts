/**
 * Chat Route
 * Chatbot endpoint that returns meeting prep plans in MEDDPICC and SPIN format.
 * Uses Legal & General CRM data from legal_general_crm_notes_12m.xlsx.
 */

import { Router, Request, Response } from 'express';
import type { ApiResponse } from '@signal-assistant/shared';
import { CRM_RECORDS, CRM_CLIENTS } from '../data/crm-meetings.js';
import {
  generateMeetingPlan,
  type MeetingPlan,
} from '../utils/analysis-generator.js';

const router = Router();

interface ChatRequest {
  message: string;
  clientName?: string;
}

interface ChatResponse {
  reply: string;
  plan?: MeetingPlan;
  availableClients?: string[];
}

/** Find the best-matching client name from the user's message */
function resolveClientName(message: string, preferred?: string): string | null {
  const haystack = (preferred ?? message).toLowerCase();
  return (
    CRM_CLIENTS.find((name) =>
      haystack.includes(name.toLowerCase()),
    ) ?? null
  );
}

/**
 * @route POST /api/v1/chat
 * @description Chatbot endpoint – returns a MEDDPICC and SPIN meeting plan
 *              for the requested Legal & General contact.
 *
 * Body: { message: string, clientName?: string }
 */
router.post('/', (req: Request, res: Response) => {
  const { message, clientName } = req.body as ChatRequest;

  if (!message && !clientName) {
    res.status(400).json({
      success: false,
      error: { code: 'BAD_REQUEST', message: 'message or clientName is required' },
    });
    return;
  }

  // If user asks for the list of clients / has no specific name
  const lowerMsg = (message ?? '').toLowerCase();
  if (
    lowerMsg.includes('list') ||
    lowerMsg.includes('who') ||
    lowerMsg.includes('clients') ||
    lowerMsg.includes('contacts') ||
    (!clientName && !CRM_CLIENTS.some((c) => lowerMsg.includes(c.toLowerCase())))
  ) {
    const response: ApiResponse<ChatResponse> = {
      success: true,
      data: {
        reply:
          `I have CRM data for ${CRM_CLIENTS.length} Legal & General contacts: ` +
          CRM_CLIENTS.join(', ') +
          '. Ask me for a meeting plan for any of them.',
        availableClients: CRM_CLIENTS,
      },
    };
    res.json(response);
    return;
  }

  const resolved = resolveClientName(message, clientName);

  if (!resolved) {
    const response: ApiResponse<ChatResponse> = {
      success: true,
      data: {
        reply:
          `I couldn't find a matching contact. Available contacts are: ${CRM_CLIENTS.join(', ')}.`,
        availableClients: CRM_CLIENTS,
      },
    };
    res.json(response);
    return;
  }

  const clientRecords = CRM_RECORDS.filter((r) => r.clientName === resolved);
  const plan = generateMeetingPlan(resolved, clientRecords);

  const meddpiccScore = plan.meddpicc.overallCoverage;
  const spinScore = plan.spin.overallCoverage;

  const reply =
    `Here is your meeting prep plan for ${resolved} at ${plan.account}. ` +
    `Based on ${plan.meetingCount} meetings from ${plan.dateRange.earliest} to ${plan.dateRange.latest}. ` +
    `MEDDPICC coverage: ${meddpiccScore}%. ` +
    `SPIN discovery quality: ${plan.spin.discoveryQuality} (${spinScore}%). ` +
    `Top priority: ${plan.meddpicc.criticalGaps[0] ?? 'Deepen implication and need-payoff discovery.'} ` +
    `Suggested first question: "${plan.meddpicc.suggestedQuestions[0]?.question ?? ''}"`;

  const response: ApiResponse<ChatResponse> = {
    success: true,
    data: { reply, plan },
  };
  res.json(response);
});

/**
 * @route GET /api/v1/chat/clients
 * @description Returns the list of clients available in the CRM data
 */
router.get('/clients', (_req: Request, res: Response) => {
  const response: ApiResponse<{ clients: string[]; account: string }> = {
    success: true,
    data: { clients: CRM_CLIENTS, account: 'Legal & General' },
  };
  res.json(response);
});

/**
 * @route GET /api/v1/chat/plan/:clientName
 * @description Returns a full MEDDPICC + SPIN meeting plan for a given client
 */
router.get('/plan/:clientName', (req: Request, res: Response) => {
  const name = decodeURIComponent(req.params['clientName'] ?? '');
  const match = CRM_CLIENTS.find(
    (c) => c.toLowerCase() === name.toLowerCase(),
  );

  if (!match) {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: `No CRM data found for "${name}". Available: ${CRM_CLIENTS.join(', ')}`,
      },
    });
    return;
  }

  const records = CRM_RECORDS.filter((r) => r.clientName === match);
  const plan = generateMeetingPlan(match, records);

  const response: ApiResponse<MeetingPlan> = {
    success: true,
    data: plan,
  };
  res.json(response);
});

export default router;
