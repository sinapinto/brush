import 'reflect-metadata';
import * as express from 'express';
import * as session from 'express-session';
import * as ConnectRedis from 'connect-redis';
import * as Redis from 'ioredis';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { createUserLoader } from './loaders/userLoader';

const redis = new Redis();
const RedisStore = ConnectRedis(session);
const redisStore = new RedisStore({ prefix: 'sess:' });

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dev',
  password: 'dev',
  database: 'microblog2',
  entities: [User, Post],
  logging: true,
  // dropSchema: true,
  synchronize: true,
})
  .then(async () => {
    const app = express();

    app.use(
      session({
        store: redisStore,
        secret: 'CHANGE ME',
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        },
      })
    );

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }: any) => ({
        redis,
        session: req.session,
        userLoader: createUserLoader(),
      }),
    });

    server.applyMiddleware({
      app,
      cors: {
        credentials: true,
        origin: '*',
      },
    });

    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    );
  })
  .catch(console.error);
