import * as bcrypt from 'bcrypt'
import { validate } from 'class-validator'
import { Post } from './entity/Post'
import { User } from './entity/User'
import { IResolver } from './types/graphql'

type UserType = {
  username: string,
  password: string,
}

export let resolvers: IResolver = {
  Query: {
    me: async (_, __, { session }) => {
      if (!session.userId) { return {} }
      return User.findOne({ where: { id: session.userId } })
    },
    user: async (_, { username }) => {
      return User.findOne({ where: { username } })
    },
    post: async (_, { id }) => {
      return Post.findOne(id)
    },
  },
  Mutation: {
    login: async (_, { username, password }, { session, redis, req }) => {
      const user = await User.findOne({ where: { username } });
      if (!user || !(await bcrypt.compare(user.password, password))) {
        return false
      }

      session.userId = user.id;
      if (req.sessionID) {
        await redis.lpush(`userSid:${user.id}`, req.sessionID);
      }

      return true
    },
    logout: async (_, __, { session, redis }) => {
      let { userId } = session
      let sessionIds = await redis.lrange(`userSid:${userId}`, 0, -1);
      await Promise.all(sessionIds.map((sid: String) => redis.del(`sess:${sid}`)));
      return true
    },
    register: async (_, { username, password }, { session }) => {
      let user: UserType = { username, password }

      let errors = await validate(user)
      if (errors.length > 0) {
        return false
      }

      let userAlreadyExists = await User.findOne({ where: { username }, select: ['id'] });
      if (userAlreadyExists) {
        return false
      }

      let newUser =  User.create(user)
      await User.save(newUser)
      if (session) {
        session.userId = newUser.id
      }
      return true
    },
    createPost: async () => {
      return true
    },
  },
}
