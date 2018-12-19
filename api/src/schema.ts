import { gql } from 'apollo-server-express'

export let typeDefs = gql`
  type Query {
    currentUser: User
    user(username: String!): User
    getPost(id: ID!): Post
    getPosts(pageSize: Int, after: String): PaginatedPosts!
  }

  type Mutation {
    login(username: String!, password: String!): User
    register(username: String!, password: String!): User
    logout: Boolean
    createPost(input: CreatePostInput!): Post
  }

  type PaginatedPosts {
    cursor: String!
    hasMore: Boolean!
    posts: [Post]!
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
