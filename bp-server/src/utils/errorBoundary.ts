import { NextFunction, Request, Response } from 'express';

type ExpressRequestHandler<T> = (
  req: Request<T>,
  res: Response,
  next: NextFunction
) => Promise<void>;

export default function errorBoundary<T>(fn: ExpressRequestHandler<T>) {
  return (...[req, res, next]: Parameters<ExpressRequestHandler<T>>) => {
    fn(req, res, next).catch(next);
  };
}
