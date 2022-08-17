import bodyParser from 'body-parser';
import express from 'express';

import { errorHandler } from './errors';
import routes from './routes';

import type { Application } from 'express';
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

  // Error handler
  app.use(errorHandler);

  return app;
}

/**
 * Starts server
 */
function startServer(app: Application, port: number): Promise<Server> {
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      resolve(server);
    });
  });
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
