/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostById
// ====================================================

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
  updatedAt: string;
  author: GetPostById_getPost_author;
}

export interface GetPostById {
  getPost: GetPostById_getPost | null;
}

export interface GetPostByIdVariables {
  id: string;
}
