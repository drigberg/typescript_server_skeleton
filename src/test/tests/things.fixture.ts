import categories from '../../controllers/categories';
import things from '../../controllers/things';

import type Category from '../../database/entities/Category';
import type Thing from '../../database/entities/Thing';

/**
 * Remove all test data
 */
async function tearDown(): Promise<void> {
  await things.deleteAll();
  await categories.deleteAll();
}

export type Testdata = {
  categories: Array<Category>;
  things: Array<Thing>;
};

/**
 * Create categories and things for tests
 */
async function setup(): Promise<Testdata> {
  const categoriesList = await Promise.all([
    categories.create({
      name: 'Static',
    }),
    categories.create({
      name: 'Dynamic',
    }),
  ]);

  const thingsList = await Promise.all([
    things.create({
      name: 'Teapot',
      category: categoriesList[0],
    }),
    things.create({
      name: 'Skeleton',
      category: categoriesList[0],
    }),
    things.create({
      name: 'Reanimated Skeleton',
      category: categoriesList[1],
    }),
  ]);

  return {
    categories: categoriesList,
    things: thingsList,
  };
}

export default { setup, tearDown };
