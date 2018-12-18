import { gql } from 'apollo-server-express'

export let typeDefs = gql`
  type Query {
    me: UserResponse!
    user(username: String!): UserResponse!
    post(id: ID): PostResponse!
  }

  type Mutation {
    login(username: String!, password: String!): EmptyResponse!
    logout: EmptyResponse!
    register(username: String!, password: String!): UserResponse!
    createPost(title: String!, body: String!): PostResponse!
  }

  interface Response {
    success: Boolean!
    message: String!
  }

  type EmptyResponse implements Response {
    success: Boolean!
    message: String!
  }

  type UserResponse implements Response {
    success: Boolean!
    message: String!
    user: User
  }

  type PostResponse implements Response {
    success: Boolean!
    message: String!
    post: Post
  }

  type User {
    id: ID!
    username: String
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
