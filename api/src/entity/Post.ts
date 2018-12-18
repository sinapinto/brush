import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm'
import { IsDefined } from 'class-validator'
import { User } from './User'

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  title: string

  @Column('text')
  body: string

  @ManyToOne(() => User, user => user.posts)
  @IsDefined()
  author: string
}
