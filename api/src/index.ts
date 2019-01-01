require('dotenv').config();
if (!process.env.SESSION_SECRET) {
  throw 'you need to configure SESSION_SECRET in .env';
}
import 'reflect-metadata';
import * as express from 'express';
import * as session from 'express-session';
import * as ConnectRedis from 'connect-redis';
import * as Redis from 'ioredis';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { User } from './entities/User';
import { Post } from './entities/Post';
import { Category } from './entities/Category';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { createUserLoader } from './loaders/userLoader';
import { TContext } from './utils';

const redis = new Redis(<string>process.env.REDIS_URL);
const RedisStore = ConnectRedis(session);
const redisStore = new RedisStore({ prefix: 'sess:' });

createConnection({
  type: 'postgres',
  url: <string>process.env.DATABASE_URL,
  entities: [User, Post, Category],
  logging: process.env.NODE_ENV === 'development' ? true : ['error'],
  synchronize: process.env.NODE_ENV === 'development',
  // dropSchema: true,
})
  .then(async () => {
    const app = express();

    app.use(
      session({
        store: redisStore,
        secret: <string>process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        },
        name: 'sid',
      })
    );

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }: any): TContext => ({
        redis,
        res,
        session: req.session,
        userLoader: createUserLoader(),
      }),
    });

    server.applyMiddleware({
      app,
      cors: {
        credentials: true,
        origin:
          process.env.NODE_ENV === 'production'
            ? process.env.FRONTEND_HOST
            : '*',
      },
    });

    const port = process.env.PORT || 4000;
    app.listen({ port }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      )
    );
  })
  .catch(console.error);
