import { gql } from 'apollo-server-express'

export let typeDefs = gql`
  type Query {
    currentUser: User
    user(username: String!): User
    getPost(id: ID!): Post
    getPosts(pageSize: Int, after: String): [Post!]
  }

  type Mutation {
    login(username: String!, password: String!): User
    logout: Boolean
    register(username: String!, password: String!): User
    createPost(input: CreatePostInput!): Post
  }

  input CreatePostInput {
    title: String!
    body: String!
  }

  type User {
    id: ID!
    username: String
    avatar: String
    bio: String
    posts: [Post]
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
