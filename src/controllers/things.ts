import { AppDataSource } from '../database/data-source';
import Category from '../database/entities/Category';
import Thing from '../database/entities/Thing';

const repository = AppDataSource.getRepository(Thing);

async function create({
  name,
  category,
}: {
  name: string;
  category: Category;
}): Promise<Thing> {
  const thing = new Thing();

  thing.name = name;
  thing.category = category;

  await repository.save(thing);
  return thing;
}

async function fetchMany(): Promise<Array<Thing>> {
  const things = await repository.find();
  return things;
}

async function deleteAll(): Promise<void> {
  const things = await fetchMany();
  await repository.remove(things);
}

export default {
  create,
  deleteAll,
  fetchMany,
};
