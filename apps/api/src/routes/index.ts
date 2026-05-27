import { Router } from 'express';
import healthRoutes from './health.js';
import accountRoutes from './accounts.js';
import meetingRoutes from './meetings.js';
import opportunityRoutes from './opportunities.js';
import chatRoutes from './chat.js';

const router = Router();

// Health check routes (no version prefix)
router.use('/health', healthRoutes);

// API v1 routes
router.use('/api/v1/accounts', accountRoutes);
router.use('/api/v1/meetings', meetingRoutes);
router.use('/api/v1/opportunities', opportunityRoutes);
router.use('/api/v1/chat', chatRoutes);

export default router;
