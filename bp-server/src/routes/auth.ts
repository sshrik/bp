import { Router } from 'express';
import {
  logInController,
  signInController,
  pingController,
} from 'src/controllers/auth';
import authToken from 'src/middlewares/authToken';
import errorBoundary from 'src/utils/errorBoundary';

const authRouter = Router();

authRouter.post('/logIn', errorBoundary(logInController));
authRouter.post('/signIn', authToken, errorBoundary(signInController));
authRouter.get('/ping', authToken, errorBoundary(pingController));

export default authRouter;
