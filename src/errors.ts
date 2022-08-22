import logger from './logger';

import type { NextFunction, Request, Response } from 'express';

/**
 * Custom error class for passing context to the error handler from requests
 */
export class ApiError {
  statusCode!: number;
  message!: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 * Error handler for requests
 *
 * Sets error code and message if provided, and otherwise falls back
 * to a generic 500 server error
 */
export function errorHandler(
  err: Error | ApiError,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || 'Internal server error';

  logger.error('Error in logger', { err });

  res.status(statusCode);
  res.json({ error: message });
}
