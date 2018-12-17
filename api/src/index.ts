import 'reflect-metadata'
import * as express from 'express'
import * as session from 'express-session'
import * as ConnectRedis from 'connect-redis'
import * as Redis from 'ioredis'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import { User } from './entity/User'
import { Post } from './entity/Post'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'

let redis = new Redis();
let RedisStore = ConnectRedis(session)
let redisStore = new RedisStore({ prefix: 'sess:' })

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dev',
  password: 'dev',
  database: 'microblog2',
  entities: [User, Post],
  logging: true,
  synchronize: true,
})
  .then(async () => {
    let app = express()

    app.use(
      session({
        store: redisStore,
        secret: 'CHANGE ME',
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        }
      })
    );

    let server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => ({
        redis,
        url: req ? req.protocol + '://' + req.get('host') : '',
        req,
        res,
      })
    })

    server.applyMiddleware({ app })

    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    )
  })
  .catch(console.error)
