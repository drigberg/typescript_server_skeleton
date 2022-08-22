import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import 'reflect-metadata';

import Category from './Category';

@Entity()
export default class Thing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category)
  category: Category;
}
