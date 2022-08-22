import bodyParser from 'body-parser';
import express from 'express';

import { AppDataSource } from './database/data-source';
import { errorHandler } from './errors';
import routes from './routes';

import type { Application, Request, Response } from 'express';
import type { Server } from 'http';

/**
 * Creates application
 */
function createApp(): Application {
  const app = express();

  // Middleware
  app.use(bodyParser.json());

  // API routes
  app.use('/api/things', routes.things);

  app.get('/api/ping', (_req: Request, res: Response) => {
    res.json({ ping: 'pong' });
  });

  // Error handler
  app.use(errorHandler);

  return app;
}

/**
 * Starts server
 */
async function startServer(app: Application, port: number): Promise<Server> {
  await AppDataSource.initialize();

  const s: Server = await new Promise((resolve) => {
    const server = app.listen(port, () => {
      resolve(server);
    });
  });

  return s;
}

/**
 * Stops server (especially useful for end-to-end tests)
 */
function stopServer(server: Server): Promise<Error | void> {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export { createApp, startServer, stopServer };
