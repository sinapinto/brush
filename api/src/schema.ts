import { gql } from 'apollo-server-express'

export let typeDefs = gql`
  type Query {
    me: User
    user(username: String!): User
    post(id: ID): Post
  }

  type Mutation {
    login(username: String!, password: String!): Boolean!
    logout: Boolean!
    register(username: String!, password: String!): Boolean!
    createPost(title: String!, body: String!): Boolean!
  }

  type Error {
    path: String!
    message: String!
  }

  type User {
    id: ID!
    username: String
    password: String
    avatar: String
    bio: String
    createdAt: String
    updatedAt: String
  }

  type Post {
    id: ID!
    title: String
    body: String
    author: User
    createdAt: String
    updatedAt: String
  }
`
