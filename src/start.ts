import { createApp, startServer } from './app';

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
    console.info(`App is running on port ${PORT}`);
  })
  .catch((err) => {
    console.info(`Error on server start: ${err}`);
    process.exit(1);
  });
