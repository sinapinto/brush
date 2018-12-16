import 'reflect-metadata'
import { ApolloServer, gql } from 'apollo-server-express'
import * as express from 'express'
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
    let app = express()

    let typeDefs = gql`
      type User {
        id: ID
        firstName: String
        lastName: String
        age: Float
      }

      type Query {
        users: [User!]
      }
    `

    let resolvers = {
      Query: {
        users: async () => {
          return connection.manager.find(User)
        },
      },
    }

    let server = new ApolloServer({ typeDefs, resolvers })

    server.applyMiddleware({ app, cors: false })

    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    )
  })
  .catch(console.error)
