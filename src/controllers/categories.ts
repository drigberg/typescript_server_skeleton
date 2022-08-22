import { AppDataSource } from '../database/data-source';
import Category from '../database/entities/Category';
import { ApiError } from '../errors';

const repository = AppDataSource.getRepository(Category);

async function create({ name }: { name: string }): Promise<Category> {
  const category = new Category();

  category.name = name;

  await repository.save(category);
  return category;
}

async function getById(id: number): Promise<Category> {
  const user = await repository.findOne({ where: { id } });
  if (user === null) {
    throw new ApiError(404, 'Cannot find category by id');
  }

  return user;
}

async function fetchMany(): Promise<Array<Category>> {
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
  getById,
};
