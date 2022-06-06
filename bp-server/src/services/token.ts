import { createAccessToken, createRefreshToken } from 'src/utils/token';

export default async function generateToken(id: string) {
  return {
    accessToken: createAccessToken(id),
    refreshToken: createRefreshToken(),
  };
}
