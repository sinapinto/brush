import * as bcrypt from 'bcrypt'
import { validate } from 'class-validator'
import { Post } from './entity/Post'
import { User } from './entity/User'
import { IResolver } from './types/graphql'

interface UserInput {
  username: string,
  password: string,
}

export let resolvers: IResolver = {
  Query: {
    me: async (_, __, { req }) => {
      if (!req.session.userId) { return {} }
      return User.findOne({ where: { id: req.session.userId } })
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
        return false
      }
      req.session.userId = user.id;
      await redis.lpush(`userSessions:${user.id}`, req.sessionID);
      return true
    },

    logout: async (_, __, { redis, req }) => {
      let { userId } = req.session
      let sessionIds = await redis.lrange(`userSessions:${userId}`, 0, -1);
      await Promise.all(sessionIds.map((sid: String) => redis.del(`sess:${sid}`)));
      return true
    },

    register: async (_, user: UserInput, { req }) => {
      let errors = await validate(user)
      if (errors.length > 0) {
        return false
      }
      let userAlreadyExists = await User.findOne({ where: { username: user.username }, select: ['id'] });
      if (userAlreadyExists) {
        return false
      }
      let newUser =  User.create(user)
      await User.save(newUser)
      req.session.userId = newUser.id
      return true
    },

    createPost: async () => {
      return true
    },
  },
}
