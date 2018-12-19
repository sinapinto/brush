import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Length } from 'class-validator'
import * as bcrypt from 'bcrypt'
import { Post } from './Post'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  @Length(1, 30)
  username: string

  @Column()
  @Length(4, 100)
  password: string

  @Column({ default: '' })
  avatar: string

  @Column({ default: '' })
  bio: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Post, post => post.author)
  posts: Post[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
