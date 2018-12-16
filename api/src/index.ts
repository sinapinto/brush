import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import { buildSchema } from 'type-graphql'
import { createConnection, getConnectionOptions } from 'typeorm'

;(async () => {
  let config = await getConnectionOptions(process.env.NODE_ENV)
  await createConnection({
    ...config,
    name: 'default',
  })

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
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
})()
