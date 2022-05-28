import { ErrorType } from 'src/types/error';

class ErrorMapper {
  errorType: ErrorType;

  errorMessage: string;

  errorCode: number;

  constructor(errorType: ErrorType, errorMessage: string, errorCode: number) {
    this.errorType = errorType;
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }
}

export default ErrorMapper;
