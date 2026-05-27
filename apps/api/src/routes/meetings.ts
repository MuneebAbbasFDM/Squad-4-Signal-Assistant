import { Router, Request, Response } from 'express';
import type { ApiResponse, Meeting } from '@signal-assistant/shared';

const router = Router();

// Mock data for initial development
const mockMeetings: Meeting[] = [];

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

  const { transcript } = req.body;

  // TODO: Process and store transcript
  // TODO: Trigger AI analysis

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
 * @description Get analysis for a meeting
 */
router.get('/:id/analysis', (req: Request, res: Response) => {
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

  if (!meeting.analysis) {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Analysis not yet available for this meeting',
      },
    });
    return;
  }

  const response: ApiResponse<typeof meeting.analysis> = {
    success: true,
    data: meeting.analysis,
  };
  res.json(response);
});

export default router;
