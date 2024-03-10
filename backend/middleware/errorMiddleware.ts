import { Response, Request, NextFunction } from 'express';
import { Error, CastError } from 'mongoose';

type ErrorFunction = (req: Request, res: Response, next: NextFunction) => void;
type ErrorHandlerType = (
  err: CastError,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const notFound: ErrorFunction = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler: ErrorHandlerType = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource Not Found';
    statusCode = 404;
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  });
};

export { notFound, errorHandler };
