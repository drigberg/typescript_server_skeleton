type Testdata = {
  mock: true;
};

async function bootstrap(): Promise<Testdata> {
  console.log('Deleting existing data...');

  // TOOD: delete existing data

  console.info('Creating testdata...');

  // TODO: create testdata

  await new Promise((resolve) => resolve(true)); // TODO: remove placeholder

  return { mock: true };
}

bootstrap()
  .then((testdata) => {
    console.log('Successfully boostrapped database!', testdata);
    process.exit(0);
  })
  .catch((err) => {
    console.log('Error bootstrapping database', err);
    process.exit(1);
  });
