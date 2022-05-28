import { Router } from 'express';
import { logInController, signInController } from 'src/controllers/auth';
import errorBoundary from 'src/utils/errorBoundary';

const router = Router();

router.post('/logIn', errorBoundary(logInController));
router.post('/signIn', errorBoundary(signInController));

export default router;
