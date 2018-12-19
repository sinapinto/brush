import * as bcrypt from 'bcrypt'
import { validate } from 'class-validator'
import { Post } from './entity/Post'
import { User } from './entity/User'
import { UserError } from './util'
import { IResolver } from './types/graphql'

type CreatePostInput = {
  input: {
    title: string
    body: string
  }
}

export let resolvers: IResolver = {
  Query: {
    currentUser: async (_, __, { session }) => {
      let { userId } = session
      if (!userId) {
        return new UserError('not logged in')
      }
      let user = await User.findOne({ where: { id: userId } })
      if (!user) {
        return new UserError('no user found')
      }
      return user
    },

    user: async (_, { username }) => {
      return User.findOne({ where: { username } })
    },

    getPost: async (_, { id }) => {
      return Post.findOne(id)
    },

    getPosts: async () => {
      return Post.find()
    },
  },

  Mutation: {
    login: async (_, { username, password }, { redis, session }) => {
      const user = await User.findOne({ where: { username } })
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return new UserError('wrong username or password')
      }
      session.userId = user.id
      console.log('[redis] pushing user', user.id, 'sesion', session.id)
      await redis.lpush(`userSessions:${user.id}`, session.id)
      return user
    },

    logout: async (_, __, { redis, session }) => {
      let { userId } = session
      let sessionIds = await redis.lrange(`userSessions:${userId}`, 0, -1)
      console.log('[redis] deleting user', userId, 'sessions', sessionIds)
      await Promise.all(
        sessionIds.map((sid: String) => redis.del(`sess:${sid}`))
      )
      let destroySession = new Promise(resolve => session.destroy(resolve))
      await destroySession
      return true
    },

    register: async (_, args, { session }) => {
      let user = User.create(args)
      let errors = await validate(user)
      if (errors.length > 0) {
        console.log('errors: ', errors)
        return new UserError('invalid username or password')
      }
      let userAlreadyExists = await User.findOne({
        where: { username: user.username },
        select: ['id'],
      })
      if (userAlreadyExists) {
        return new UserError('username already taken')
      }
      await User.save(user)
      session.userId = user.id
      return user
    },

    createPost: async (_, args: CreatePostInput, { session }) => {
      if (!session || !session.userId) {
        return new UserError('unauthorized')
      }
      let post = Post.create(args.input)
      post.author = session.userId
      let errors = await validate(post)
      if (errors.length > 0) {
        console.log('errors: ', errors)
        return new UserError('invalid post')
      }
      await Post.save(post)
      return post
    },
  },
}
