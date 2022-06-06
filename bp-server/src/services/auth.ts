import { checkIdExist, checkUser, writeUser } from 'src/database/migration';
import ErrorMapper from 'src/errors/ErrorMapper';
import { User } from 'src/types/user';

export async function checkUserAuthorized(user: User) {
  const logInResult = await checkUser(user);

  return logInResult;
}

export async function signIn(user: User) {
  const isIdExist = await checkIdExist(user.id);

  if (isIdExist) {
    throw new ErrorMapper('ERR_AUTH', '이미 존재하는 ID입니다.', 401);
  }

  await writeUser(user);
}
