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
      id: 1,
      name: 'Static',
    }),
    categories.create({
      id: 2,
      name: 'Dynamic',
    }),
  ]);

  const thingsList = await Promise.all([
    things.create({
      id: 1,
      name: 'Teapot',
      category: categoriesList[0],
    }),
    things.create({
      id: 2,
      name: 'Skeleton',
      category: categoriesList[0],
    }),
    things.create({
      id: 3,
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
