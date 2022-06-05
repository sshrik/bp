import { Router } from 'express';
import { logInController, signInController } from 'src/controllers/auth';
import errorBoundary from 'src/utils/errorBoundary';

const authRouter = Router();

authRouter.get('/', errorBoundary(logInController));
authRouter.post('/signIn', errorBoundary(signInController));

export default authRouter;
