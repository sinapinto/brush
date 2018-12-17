import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  BeforeInsert,
} from 'typeorm'
import { Min, Max } from 'class-validator'
import * as bcrypt from 'bcrypt'
import { Post } from './Post'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  @Min(1)
  @Max(30)
  username: string

  @Column()
  @Min(4)
  @Max(100)
  password: string

  @Column({ default: '' })
  avatar: string

  @Column({ default: '' })
  bio: string

  @OneToMany(() => Post, post => post.author)
  posts: Post[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
