import { Request, Response } from 'express';
import ErrorMapper from 'src/errors/ErrorMapper';
import { BaseResponse } from 'src/models/response';
import { LogInRequest, PingRequest, SignInRequest } from 'src/models/user';
import { checkUserAuthorized, signIn } from 'src/services/auth';
import generateToken from 'src/services/token';

export async function logInController(
  req: Request<LogInRequest>,
  res: Response<BaseResponse<undefined>>
) {
  const user = req.body;

  const isAuthorized = await checkUserAuthorized(user);

  if (isAuthorized) {
    const tokens = await generateToken(user.id);

    res.cookie('AT', tokens.accessToken);
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

export async function pingController(
  req: Request<PingRequest>,
  res: Response<BaseResponse<undefined>>
) {
  res.send({ message: `${req.body.payload.id} user ok` });
}
