import { AuthRequest } from 'src/models/request';
import { User } from 'src/types/user';

export type LogInRequest = User;

export type SignInRequest = User;

export type PingRequest = AuthRequest;
