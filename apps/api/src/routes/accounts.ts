import { Router, Request, Response } from 'express';
import type { ApiResponse, Account } from '@signal-assistant/shared';
import { CRM_CLIENTS } from '../data/crm-meetings.js';

const router = Router();

// Legal & General account derived from the CRM Excel data
const mockAccounts: Account[] = [
  {
    id: 'lg-1',
    name: 'Legal & General',
    industry: 'Financial Services',
    website: 'https://www.legalandgeneral.com',
    description:
      'Major UK financial services group. Active recruitment engagement across Java, Business Analysis, and DevOps disciplines.',
    stakeholders: CRM_CLIENTS.map((name, i) => ({
      id: `lg-stakeholder-${i + 1}`,
      accountId: 'lg-1',
      firstName: name.split(' ')[0] ?? name,
      lastName: name.split(' ').slice(1).join(' ') ?? '',
      email: `${name.toLowerCase().replace(' ', '.')}@legalandgeneral.com`,
      title: 'Hiring Manager',
      department: 'Technology',
      role: 'champion' as const,
      influenceLevel: 'medium' as const,
      createdAt: new Date('2025-06-01'),
      updatedAt: new Date(),
    })),
    opportunities: [],
    meetings: [],
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date(),
  },
];

/**
 * @route GET /api/v1/accounts
 * @description Get all accounts
 */
router.get('/', (_req: Request, res: Response) => {
  const response: ApiResponse<Account[]> = {
    success: true,
    data: mockAccounts,
    meta: {
      page: 1,
      limit: 10,
      total: mockAccounts.length,
      totalPages: 1,
      hasMore: false,
    },
  };
  res.json(response);
});

/**
 * @route GET /api/v1/accounts/:id
 * @description Get account by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  const account = mockAccounts.find((a) => a.id === req.params['id']);

  if (!account) {
    res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Account not found',
      },
    });
    return;
  }

  const response: ApiResponse<Account> = {
    success: true,
    data: account,
  };
  res.json(response);
});

/**
 * @route POST /api/v1/accounts
 * @description Create a new account
 */
router.post('/', (req: Request, res: Response) => {
  const { name, industry, website, description } = req.body;

  const newAccount: Account = {
    id: String(mockAccounts.length + 1),
    name,
    industry,
    website,
    description,
    stakeholders: [],
    opportunities: [],
    meetings: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  mockAccounts.push(newAccount);

  const response: ApiResponse<Account> = {
    success: true,
    data: newAccount,
  };
  res.status(201).json(response);
});

export default router;
