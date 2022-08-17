/**
 * Module dependencies
 */

import { after, before } from 'mocha';

import { createApp, startServer, stopServer } from '../src/app';
import logger from '../src/logger';

import type { Server } from 'http';

/**
 * Module
 */

logger.setLogLevel(logger.levels.SILENCE);

let server: Server;

before(async () => {
  const app = createApp();
  server = await startServer(app, 9002);
});

after(async () => {
  await stopServer(server);
});
