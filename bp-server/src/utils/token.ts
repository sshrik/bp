import dotenv from 'dotenv';
import { sign, verify } from 'jsonwebtoken';

dotenv.config();

function resolveSecretKey() {
  const { SECRET } = process.env;

  return SECRET || '';
}

export function createAccessToken(id: string) {
  const { ACCESS_EXPIRE } = process.env;

  return sign({ id }, resolveSecretKey(), {
    algorithm: 'HS256',
    expiresIn: ACCESS_EXPIRE,
  });
}

export function decodeToken(token: string) {
  return verify(token, resolveSecretKey());
}

export function createRefreshToken() {
  const { REFRESH_EXPIRE } = process.env;

  return sign({}, resolveSecretKey(), {
    algorithm: 'HS256',
    expiresIn: REFRESH_EXPIRE,
  });
}
