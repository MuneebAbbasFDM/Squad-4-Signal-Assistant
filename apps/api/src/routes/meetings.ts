import { Router, Request, Response } from 'express';
import type { ApiResponse, Meeting } from '@signal-assistant/shared';
import { CRM_RECORDS } from '../data/crm-meetings.js';
import { generateMeetingPlan } from '../utils/analysis-generator.js';

const router = Router();

// Build mock meetings from CRM Excel data
const mockMeetings: Meeting[] = CRM_RECORDS.map((record, index) => ({
  id: String(index + 1),
  accountId: 'lg-1',
  title: `${record.meetingType} – ${record.clientName}`,
  description: record.keyDiscussionPoints,
  scheduledAt: new Date(record.meetingDate),
  startedAt: new Date(record.meetingDate),
  status: 'completed' as const,
  attendees: [
    {
      id: `att-${index + 1}-1`,
      meetingId: String(index + 1),
      name: record.clientName,
      role: 'participant' as const,
      isInternal: false,
    },
    {
      id: `att-${index + 1}-2`,
      meetingId: String(index + 1),
      name: 'FDM Account Manager',
      role: 'host' as const,
      isInternal: true,
    },
  ],
  nextSteps: [
    {
      id: `ns-${index + 1}`,
      meetingId: String(index + 1),
      description: record.nextSteps,
      status: 'pending' as const,
      createdAt: new Date(record.meetingDate),
      updatedAt: new Date(record.meetingDate),
    },
  ],
  createdAt: new Date(record.meetingDate),
  updatedAt: new Date(record.meetingDate),
}));

/**
 * @route GET /api/v1/meetings
 * @description Get all meetings
 */
router.get('/', (_req: Request, res: Response) => {
  const response: ApiResponse<Meeting[]> = {
    success: true,
    data: mockMeetings,
    meta: {
      page: 1,
      limit: 10,
      total: mockMeetings.length,
      totalPages: Math.ceil(mockMeetings.length / 10) || 1,
      hasMore: false,
    },
  };
  res.json(response);
});

/**
 * @route GET /api/v1/meetings/:id
 * @description Get meeting by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const meeting = mockMeetings.find((m) => m.id === req.params['id']);

  if (!meeting) {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Meeting not found',
      },
    });
    return;
  }

  const response: ApiResponse<Meeting> = {
    success: true,
    data: meeting,
  };
  res.json(response);
});

/**
 * @route POST /api/v1/meetings
 * @description Create a new meeting
 */
router.post('/', (req: Request, res: Response) => {
  const { accountId, opportunityId, title, description, scheduledAt } = req.body;

  const newMeeting: Meeting = {
    id: String(mockMeetings.length + 1),
    accountId,
    opportunityId,
    title,
    description,
    scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
    status: 'scheduled',
    attendees: [],
    nextSteps: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  mockMeetings.push(newMeeting);

  const response: ApiResponse<Meeting> = {
    success: true,
    data: newMeeting,
  };
  res.status(201).json(response);
});

/**
 * @route POST /api/v1/meetings/:id/transcript
 * @description Upload transcript for a meeting
 */
router.post('/:id/transcript', (req: Request, res: Response) => {
  const meeting = mockMeetings.find((m) => m.id === req.params['id']);

  if (!meeting) {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Meeting not found',
      },
    });
    return;
  }

  // transcript is received; AI processing deferred (TODO)
  void req.body.transcript;

  const response: ApiResponse<{ message: string; meetingId: string }> = {
    success: true,
    data: {
      message: 'Transcript uploaded successfully. Analysis in progress.',
      meetingId: meeting.id,
    },
  };
  res.status(202).json(response);
});

/**
 * @route GET /api/v1/meetings/:id/analysis
 * @description Get MEDDPICC and SPIN analysis for a meeting
 */
router.get('/:id/analysis', (req: Request, res: Response) => {
  const meetingIndex = mockMeetings.findIndex((m) => m.id === req.params['id']);

  if (meetingIndex === -1) {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Meeting not found',
      },
    });
    return;
  }

  const record = CRM_RECORDS[meetingIndex];
  if (!record) {
    res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'CRM record not found' },
    });
    return;
  }

  // Build a plan using only this meeting's records aggregated with same client
  const clientRecords = CRM_RECORDS.filter(
    (r) => r.clientName === record.clientName,
  );
  const plan = generateMeetingPlan(record.clientName, clientRecords);

  const response: ApiResponse<typeof plan> = {
    success: true,
    data: plan,
  };
  res.json(response);
});

export default router;
