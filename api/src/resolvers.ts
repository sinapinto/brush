import * as bcrypt from 'bcrypt'
import { validate } from 'class-validator'
import { Post } from './entity/Post'
import { User } from './entity/User'
import { IResolver } from './types/graphql'

interface UserInput {
  username: string
  password: string
}

type CreatePostInput = {
  input: {
    title: string
    body: string
  }
}

export let resolvers: IResolver = {
  Query: {
    me: async (_, __, { req }) => {
      let { userId } = req.session
      if (!userId) {
        return { success: false, message: 'not logged in' }
      }
      let user = await User.findOne({ where: { id: userId } })
      if (!user) {
        return { success: false, message: 'no user found' }
      }
      return { success: true, message: '', user }
    },

    user: async (_, { username }) => {
      return User.findOne({ where: { username } })
    },

    post: async (_, { id }) => {
      return Post.findOne(id)
    },
  },

  Mutation: {
    login: async (_, { username, password }, { redis, req }) => {
      const user = await User.findOne({ where: { username } })
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return { success: false, message: 'wrong username or password' }
      }
      req.session.userId = user.id
      console.log('[redis] pushing user', user.id, 'sesion', req.sessionId)
      await redis.lpush(`userSessions:${user.id}`, req.sessionID)
      return { success: true, message: '' }
    },

    logout: async (_, __, { redis, req }) => {
      let { userId } = req.session
      let sessionIds = await redis.lrange(`userSessions:${userId}`, 0, -1)
      console.log('[redis] deleting user', userId, 'sessions', sessionIds)
      await Promise.all(
        sessionIds.map((sid: String) => redis.del(`sess:${sid}`))
      )
      let destroySession = new Promise(resolve => req.session.destroy(resolve))
      await destroySession
      return { success: true, message: '' }
    },

    register: async (_, args: UserInput, { req }) => {
      let user = User.create(args)
      let errors = await validate(user)
      if (errors.length > 0) {
        console.log('errors: ', errors)
        return { success: false, message: 'invalid username or password' }
      }
      let userAlreadyExists = await User.findOne({
        where: { username: user.username },
        select: ['id'],
      })
      if (userAlreadyExists) {
        return { success: false, message: 'username already taken' }
      }
      await User.save(user)
      req.session.userId = user.id
      return { success: true, message: '', user }
    },

    createPost: async (_, args: CreatePostInput, { req }) => {
      let post = Post.create(args.input)
      post.author = (req.session && req.session.userId) || null
      let errors = await validate(post)
      if (errors.length > 0) {
        console.log('errors: ', errors)
        return { success: false, message: 'invalid post' }
      }
      await Post.save(post)
      return { success: true, message: 'post created', post }
    },
  },

  Response: {
    __resolveType: obj => {
      if (obj.user) return 'User'
      if (obj.post) return 'Post'
      return null
    },
  },
}
