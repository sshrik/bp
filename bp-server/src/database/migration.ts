import { JSONFile, Low } from 'lowdb';
import ErrorMapper from 'src/errors/ErrorMapper';
import { UserDatabase } from 'src/models/database/user';
import { join } from 'path';
import { User } from 'src/types/user';

const __dirname = process.cwd();

const USER_LIST_FILE = join(__dirname, 'DB/users.json');

const adapter = new JSONFile<UserDatabase>(USER_LIST_FILE);
const db = new Low<UserDatabase>(adapter);

export async function writeUser({ id, pw }: User) {
  await db.read();
  if (db.data) {
    try {
      const { user } = db.data;

      user.push({ id, pw });

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
    const { user } = db.data;

    return user.filter((user) => user.id === id && user.pw === pw).length === 1;
  } else {
    throw new ErrorMapper('ERR_DB', 'Database에 연결하지 못했습니다.', 500);
  }
}
