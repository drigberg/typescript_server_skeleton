import { createApp, startServer } from './app';
import logger from './logger';

// Create app
const app = createApp();

const DEFAULT_PORT = 9001;

const PORT =
  (typeof process.env.PORT === 'string'
    ? parseInt(process.env.PORT, 10)
    : null) || DEFAULT_PORT;

// Start server
startServer(app, PORT)
  .then(() => {
    logger.info(`App is running on port ${PORT}`);
  })
  .catch((err) => {
    logger.info(`Error on server start: ${err}`);
    process.exit(1);
  });
