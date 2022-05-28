import { Request, Response } from 'express';
import ErrorMapper from 'src/errors/ErrorMapper';
import { BaseResponse } from 'src/models/response';
import { LogInRequest, SignInRequest } from 'src/models/user';
import { logIn, signIn } from 'src/services/auth';

export async function logInController(
  req: Request<LogInRequest>,
  res: Response<BaseResponse<undefined>>
) {
  const user = req.body;

  const isAuthorized = await logIn(user);

  if (isAuthorized) {
    res.send({ message: 'ok' });
  } else {
    throw new ErrorMapper('ERR_AUTH', '인증되지 않은 사용자입니다.', 401);
  }
}

export async function signInController(
  req: Request<SignInRequest>,
  res: Response<BaseResponse<undefined>>
) {
  const user = req.body;

  await signIn(user);

  res.send({ message: 'ok' });
}
