/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostById
// ====================================================

export interface GetPostById_getPost_categories {
  __typename: "Category";
  name: string;
}

export interface GetPostById_getPost_author {
  __typename: "User";
  id: string;
  username: string;
  bio: string;
  avatar: string;
}

export interface GetPostById_getPost {
  __typename: "Post";
  id: string;
  title: string;
  body: string;
  rawBody: string;
  updatedAt: string;
  categories: GetPostById_getPost_categories[];
  author: GetPostById_getPost_author;
}

export interface GetPostById {
  getPost: GetPostById_getPost | null;
}

export interface GetPostByIdVariables {
  id: string;
}
