require('dotenv').config();
if (!process.env.SESSION_SECRET) {
  throw 'you need to configure SESSION_SECRET in .env';
}
import { ApolloServer } from 'apollo-server-express';
import * as ConnectRedis from 'connect-redis';
import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as Redis from 'ioredis';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Category } from './entities/Category';
import { Post } from './entities/Post';
import { User } from './entities/User';
import { createUserLoader } from './loaders/userLoader';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { TContext } from './utils';

const redis = new Redis(<string>process.env.REDIS_URL);
const RedisStore = ConnectRedis(session);
const redisStore = new RedisStore({ prefix: 'sess:', client: redis as any });

createConnection({
  type: 'postgres',
  url: <string>process.env.DATABASE_URL,
  entities: [User, Post, Category],
  logging: process.env.NODE_ENV === 'development' ? true : ['error'],
  synchronize: true,
})
  .then(async () => {
    const app = express();

    app.use(helmet());

    app.use(
      session({
        store: redisStore,
        secret: <string>process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        proxy: true,
        cookie: {
          sameSite: 'lax',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
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
