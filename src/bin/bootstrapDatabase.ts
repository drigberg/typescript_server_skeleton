import { AppDataSource } from '../database/data-source';
import logger from '../logger';
import fixture from '../test/tests/things.fixture';

import type { Testdata } from '../test/tests/things.fixture';

/**
 * Re-use our test fixture to create a standard set of test data
 */
async function bootstrap(): Promise<Testdata> {
  await AppDataSource.initialize();
  await fixture.tearDown();
  const testdata = await fixture.setup();
  return testdata;
}

logger.info('Resetting database...');
bootstrap()
  .then((testdata) => {
    logger.info('Successfully boostrapped database!', testdata);
    process.exit(0);
  })
  .catch((err) => {
    logger.info('Error bootstrapping database', err);
    process.exit(1);
  });
