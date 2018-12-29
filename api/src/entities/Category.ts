import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { Post } from './Post';

@Entity()
export class Category extends BaseEntity {
  @PrimaryColumn()
  @Length(1, 20)
  name: string;

  @ManyToMany(() => Post, post => post.categories)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
