import { gql } from 'apollo-server-express'

export let typeDefs = gql`
  type Query {
    me: User
    user(username: String!): User
    post(id: ID): Post
  }

  type Mutation {
    login(username: String!, password: String!): MutationResponse!
    logout: MutationResponse!
    register(username: String!, password: String!): RegisterMutationResponse!
    createPost(title: String!, body: String!): CreatePostMutationResponse!
  }

  interface MutationResponse {
    success: Boolean!
    message: String!
  }

  type RegisterMutationResponse implements MutationResponse {
    success: Boolean!
    message: String!
    user: User
  }

  type CreatePostMutationResponse implements MutationResponse {
    success: Boolean!
    message: String!
    post: Post
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
