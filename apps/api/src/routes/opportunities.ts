import { Router, Request, Response } from 'express';
import type { ApiResponse, Opportunity, OpportunityHealth, PipelineInsights } from '@signal-assistant/shared';

const router = Router();

// Mock data for initial development
const mockOpportunities: Opportunity[] = [];

/**
 * @route GET /api/v1/opportunities
 * @description Get all opportunities
 */
router.get('/', (_req: Request, res: Response) => {
  const response: ApiResponse<Opportunity[]> = {
    success: true,
    data: mockOpportunities,
    meta: {
      page: 1,
      limit: 10,
      total: mockOpportunities.length,
      totalPages: Math.ceil(mockOpportunities.length / 10) || 1,
      hasMore: false,
    },
  };
  res.json(response);
});

/**
 * @route GET /api/v1/opportunities/:id
 * @description Get opportunity by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const opportunity = mockOpportunities.find((o) => o.id === req.params['id']);

  if (!opportunity) {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Opportunity not found',
      },
    });
    return;
  }

  const response: ApiResponse<Opportunity> = {
    success: true,
    data: opportunity,
  };
  res.json(response);
});

/**
 * @route GET /api/v1/opportunities/:id/health
 * @description Get health assessment for an opportunity
 */
router.get('/:id/health', (req: Request, res: Response) => {
  const opportunity = mockOpportunities.find((o) => o.id === req.params['id']);

  if (!opportunity) {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Opportunity not found',
      },
    });
    return;
  }

  // TODO: Calculate actual health score from MEDDPICC data
  const health: OpportunityHealth = {
    opportunityId: opportunity.id,
    overallScore: 65,
    meddpiccScore: 60,
    spinScore: 70,
    riskLevel: 'medium',
    gapCount: 3,
    criticalGaps: 1,
    lastAssessedAt: new Date(),
    trend: 'stable',
  };

  const response: ApiResponse<OpportunityHealth> = {
    success: true,
    data: health,
  };
  res.json(response);
});

/**
 * @route GET /api/v1/opportunities/insights/pipeline
 * @description Get pipeline-level insights
 */
router.get('/insights/pipeline', (_req: Request, res: Response) => {
  // TODO: Calculate actual pipeline insights
  const insights: PipelineInsights = {
    totalOpportunities: mockOpportunities.length,
    averageHealthScore: 65,
    atRiskOpportunities: 0,
    healthyOpportunities: 0,
    averageMeddpiccCoverage: 55,
    averageSpinCoverage: 60,
    topRisks: [],
    stageDistribution: {},
    healthDistribution: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    },
  };

  const response: ApiResponse<PipelineInsights> = {
    success: true,
    data: insights,
  };
  res.json(response);
});

export default router;
