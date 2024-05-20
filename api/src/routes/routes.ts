import { Router } from 'express';

import authRoutes from './authRoutes';
import userRoutes from './userRoutes';

const router: Router = Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

export default router;
