import ErrorMapper from 'src/errors/ErrorMapper';
import { ErrorResponse } from 'src/models/response';
import type { ErrorRequestHandler, Response } from 'express';

const ErrorHandler: ErrorRequestHandler = (
  err: ErrorMapper,
  _req,
  res: Response<ErrorResponse>,
  next
) => {
  if (err.errorMessage) {
    res.status(err.errorCode).send({
      errorType: err.errorType,
      errorMessage: err.errorMessage,
    });
  } else {
    next();
  }
};

export default ErrorHandler;
