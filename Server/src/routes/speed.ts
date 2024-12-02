import { Router } from 'express';
import { testSpeed } from '../controllers/speedController';

const router = Router();

router.get('/', testSpeed);

export default router;
