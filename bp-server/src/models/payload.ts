import { JwtPayload } from 'jsonwebtoken';

export type Payload = JwtPayload & { id: string };
