/**
 * Module dependencies
 */

import { after, before } from 'mocha';

import { createApp, startServer, stopServer } from '../app';
import logger from '../logger';

import type { Server } from 'http';

/**
 * Module
 */

let server: Server;

before(async () => {
  logger.setLogLevel(logger.levels.SILENCE);

  const app = createApp();
  server = await startServer(app, 9002);
});

after(async () => {
  await stopServer(server);
});
