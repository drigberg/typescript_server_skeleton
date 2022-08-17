import things from '../controllers/things';
import { AppDataSource } from '../database/data-source';

import type Thing from '../database/entities/Thing';

type Testdata = {
  things: Array<Thing>;
};

async function bootstrap(): Promise<Testdata> {
  await AppDataSource.initialize();

  await console.log('Deleting existing data...');

  await things.deleteAll();

  console.info('Creating testdata...');

  console.info('Inserting a new thing into the database...');

  const thing = await things.create({
    firstName: 'Wendy',
    lastName: 'Corduroy',
    age: 17,
  });
  console.info('Saved a new thing!', { id: thing.id });

  console.info('Loading things from the database...');

  const thingsList = await things.fetchMany();

  console.info('Loaded things!', things);

  return { things: thingsList };
}

bootstrap()
  .then((testdata) => {
    console.info('Successfully boostrapped database!', testdata);
    process.exit(0);
  })
  .catch((err) => {
    console.info('Error bootstrapping database', err);
    process.exit(1);
  });
