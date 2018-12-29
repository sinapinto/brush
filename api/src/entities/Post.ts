import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
} from 'typeorm';
import { IsDefined } from 'class-validator';
import { User } from './User';
import { Category } from './Category';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsDefined()
  title: string;

  @Column('text')
  @IsDefined()
  body: string;

  @Column('text')
  @IsDefined()
  rawBody: string;

  @Column('uuid')
  authorId: string;

  @ManyToOne(() => User, user => user.posts)
  @IsDefined()
  author: User;

  @ManyToMany(() => Category, category => category.posts)
  @JoinTable()
  categories: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  cursor: string;

  @AfterLoad()
  addCursor() {
    this.cursor = String(this.id);
  }
}
