/**
 * Module dependencies
 */

import uuid from 'uuid';

import logger from './logger';

import type { Request } from 'express';

/**
 * Module
 */

/**
 * Logs request and creates request id
 */
function logRequest(req: Request): string {
  const requestId = uuid.v4();
  logger.info(
    `Request received [requestId=${requestId}  path=${req.path} method=${req.method}]`
  );
  return requestId;
}

/**
 * Logs response
 */
function logResponse(
  requestId: string,
  statusCode: number,
  req: Request
): void {
  logger.info(
    `Sending response [requestId=${requestId}  path=${req.path} method=${req.method} status=${statusCode}]`
  );
}

/**
 * Module exports
 */

export default {
  logRequest,
  logResponse,
};
