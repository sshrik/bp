import { randomBytes, pbkdf2 } from 'crypto';

const ITER_COUNT = 10946;
const KEY_LEN = 64;

export function createSalt() {
  const buf = randomBytes(64);

  return buf.toString('base64');
}

export function createHashedPassword(
  pw: string
): Promise<{ hashedPassword: string; salt: string }> {
  return new Promise((res, rej) => {
    try {
      const salt = createSalt();
      pbkdf2(pw, salt, ITER_COUNT, KEY_LEN, 'sha512', (_err, key) => {
        res({
          hashedPassword: key.toString('base64'),
          salt,
        });
      });
    } catch (e) {
      rej(e);
    }
  });
}

export function verifyPassword(input: string, salt: string, pw: string) {
  return new Promise((res, rej) => {
    pbkdf2(input, salt, ITER_COUNT, KEY_LEN, 'sha512', (err, key) => {
      if (err) {
        rej();
      } else {
        const hashedPassword = key.toString('base64');
        res(pw === hashedPassword);
      }
    });
  });
}
