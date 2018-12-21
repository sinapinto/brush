/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostById
// ====================================================

export interface GetPostById_getPost_author {
  __typename: "User";
  id: string;
  username: string | null;
  bio: string | null;
  avatar: string | null;
}

export interface GetPostById_getPost {
  __typename: "Post";
  id: string;
  title: string | null;
  body: string | null;
  updatedAt: string | null;
  author: GetPostById_getPost_author | null;
}

export interface GetPostById {
  getPost: GetPostById_getPost | null;
}

export interface GetPostByIdVariables {
  id: string;
}
