import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { Length, MaxLength, ValidateIf } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { Post } from './Post';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Length(1, 30)
  username: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  @ValidateIf(o => o.bio !== undefined)
  @MaxLength(100)
  bio: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // TODO: lazy relations
  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  @ManyToMany(() => User, u => u.subscribers)
  @JoinTable()
  subscriptions: User[];

  @ManyToMany(() => User, u => u.subscriptions)
  subscribers: User[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
