import { Router, Request, Response } from 'express';
import type { ApiResponse } from '@signal-assistant/shared';

const router = Router();

/**
 * @route GET /health
 * @description Health check endpoint
 */
router.get('/', (_req: Request, res: Response) => {
  const response: ApiResponse<{ status: string; timestamp: string }> = {
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    },
  };
  res.json(response);
});

/**
 * @route GET /health/ready
 * @description Readiness check endpoint
 */
router.get('/ready', (_req: Request, res: Response) => {
  // TODO: Add database connectivity check
  const response: ApiResponse<{ ready: boolean; services: Record<string, boolean> }> = {
    success: true,
    data: {
      ready: true,
      services: {
        api: true,
        database: true, // TODO: Implement actual check
      },
    },
  };
  res.json(response);
});

export default router;
