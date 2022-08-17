import { AppDataSource } from '../database/data-source';
import Thing from '../database/entities/Thing';

const repository = AppDataSource.getRepository(Thing);

async function create({
  firstName,
  lastName,
  age,
}: {
  firstName: string;
  lastName: string;
  age: number;
}): Promise<Thing> {
  const thing = new Thing();

  thing.firstName = firstName;
  thing.lastName = lastName;
  thing.age = age;

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
