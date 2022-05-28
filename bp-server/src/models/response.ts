import { ErrorType } from 'src/types/error';

export interface BaseResponse<T> {
  message: string;
  data?: T;
}

export interface ErrorResponse {
  errorMessage: string;
  errorType: ErrorType;
}
