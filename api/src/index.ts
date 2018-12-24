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
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { createUserLoader } from './loaders/userLoader';

const redis = new Redis();
const RedisStore = ConnectRedis(session);
const redisStore = new RedisStore({ prefix: 'sess:' });

createConnection({
  type: 'postgres',
  host: <string>process.env.PG_HOST,
  port: Number(<string>process.env.PG_PORT),
  username: <string>process.env.PG_USERNAME,
  password: <string>process.env.PG_PASSWORD,
  database: <string>process.env.PG_DATABASE,
  entities: [User, Post],
  logging: true,
  synchronize: true,
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
