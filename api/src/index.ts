import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { User } from './entity/User'

createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dev',
  password: 'dev',
  database: 'microblog2',
  entities: [User],
  logging: true,
  synchronize: true,
})
  .then(async connection => {
    let user = new User()
    user.firstName = 'Timber'
    user.lastName = 'Saw'
    user.age = 25
    await connection.manager.save(user)

    let app = express()

    let server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [],
      }),
      context: ({ req }: any) => ({
        req,
      }),
    })

    server.applyMiddleware({ app, cors: false })

    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    )
  })
  .catch(console.error)
