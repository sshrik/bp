import { join } from 'path';
import { JSONFile, Low } from 'lowdb';
import ErrorMapper from 'src/errors/ErrorMapper';
import { UserDatabase } from 'src/models/database/user';
import { User } from 'src/types/user';
import { createHashedPassword, verifyPassword } from 'src/utils/crypto';

const __dirname = process.cwd();

const USER_LIST_FILE = join(__dirname, 'DB/users.json');

const adapter = new JSONFile<UserDatabase>(USER_LIST_FILE);
const db = new Low<UserDatabase>(adapter);

export async function checkIdExist(id: string) {
  await db.read();
  if (db.data) {
    const { user: userDB } = db.data;

    const userRow = userDB.filter(({ id: rowId }) => rowId === id);

    return userRow.length > 0;
  }
  throw new ErrorMapper('ERR_DB', 'Database에 연결하지 못했습니다.', 500);
}

export async function writeUser({ id, pw }: User) {
  await db.read();
  if (db.data) {
    try {
      const { user } = db.data;

      const { hashedPassword, salt } = await createHashedPassword(pw);

      user.push({ id, pw: hashedPassword, salt });

      await db.write();
    } catch (err) {
      throw new ErrorMapper('ERR_DB', 'Database에 연결하지 못했습니다.', 500);
    }
  } else {
    throw new ErrorMapper('ERR_DB', 'Database에 연결하지 못했습니다.', 500);
  }
}

export async function checkUser({ id, pw }: User) {
  await db.read();
  if (db.data) {
    const { user: userDB } = db.data;

    try {
      const userRow = userDB.filter(({ id: rowId }) => rowId === id)[0];
      return verifyPassword(pw, userRow.salt, userRow.pw);
    } catch (err) {
      throw new ErrorMapper('ERR_AUTH', 'User ID가 없습니다.', 401);
    }
  }
  throw new ErrorMapper('ERR_DB', 'Database에 연결하지 못했습니다.', 500);
}
