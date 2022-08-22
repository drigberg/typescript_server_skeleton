import 'reflect-metadata';
import { DataSource } from 'typeorm';

import Category from './entities/Category';
import Thing from './entities/Thing';

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Category, Thing],
  migrations: [],
  subscribers: [],
});
