import { AuthenticationError } from 'apollo-server-express'
import * as bcrypt from 'bcrypt'
import { validate } from 'class-validator'
import { Post } from './entity/Post'
import { User } from './entity/User'
import { IResolver } from './types/graphql'
import { omit } from './util'

interface UserInput {
  username: string,
  password: string,
}

export let resolvers: IResolver = {
  Query: {
    me: async (_, __, { req }) => {
      let { userId } = req.session
      if (!userId) throw new AuthenticationError('not logged in')
      return User.findOne({ where: { id: userId } })
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
      const user = await User.findOne({ where: { username } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return { success: false, message: 'wrong username or password' }
      }
      req.session.userId = user.id;
      await redis.lpush(`userSessions:${user.id}`, req.sessionID);
      return { success: true, message: '' }
    },

    logout: async (_, __, { redis, req }) => {
      let { userId } = req.session
      let sessionIds = await redis.lrange(`userSessions:${userId}`, 0, -1);
      await Promise.all(sessionIds.map((sid: String) => redis.del(`sess:${sid}`)));
      return { success: true, message: '' }
    },

    register: async (_, user: UserInput, { req }) => {
      let errors = await validate(user)
      if (errors.length > 0) {
        return { success: false, message: 'invalid username or password' }
      }
      let userAlreadyExists = await User.findOne({ where: { username: user.username }, select: ['id'] });
      if (userAlreadyExists) {
        return { success: false, message: 'username already taken' }
      }
      let newUser =  User.create(user)
      await User.save(newUser)
      req.session.userId = newUser.id
      return { success: true, message: '', user: omit(newUser, ['password']) }
    },

    createPost: async () => {
      return { success: true, message: '', post: {} }
    },
  },
  MutationResponse: {
    __resolveType: (obj) => {
      if (obj.user) return 'User'
      if (obj.post) return 'Post'
      return null
    }
  }
}
