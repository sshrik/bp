import { checkUser, writeUser } from 'src/database/migration';
import ErrorMapper from 'src/errors/ErrorMapper';
import { User } from 'src/types/user';

export async function logIn(user: User) {
  return await checkUser(user);
}

export async function signIn(user: User) {
  const isAuthorized = await checkUser(user);
  if (isAuthorized) {
    throw new ErrorMapper('ERR_AUTH', '이미 존재하는 ID입니다.', 400);
  }
  await writeUser(user);
}
