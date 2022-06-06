import { Request, Response, NextFunction } from 'express';
import ErrorMapper from 'src/errors/ErrorMapper';
import { decodeToken } from 'src/utils/token';

export default function authToken<T, S>(
  req: Request<T>,
  _res: Response<S>,
  next: NextFunction
) {
  if (req.cookies.AT) {
    try {
      const token = req.cookies.AT;

      const jwtPayload = decodeToken(token);

      req.body.payload = jwtPayload;

      next();
    } catch {
      throw new ErrorMapper('ERR_AUTH', '잘못된 인증 정보입니다.', 401);
    }
  } else {
    throw new ErrorMapper(
      'ERR_AUTH',
      '설정된 cookie 목록에 AT field가 없습니다. ( token 인증 정보가 없습니다. )',
      401
    );
  }
}
