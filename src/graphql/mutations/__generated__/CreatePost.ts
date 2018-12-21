/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CreatePostInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost_author {
  __typename: "User";
  id: string;
  username: string | null;
  bio: string | null;
  avatar: string | null;
}

export interface CreatePost_createPost {
  __typename: "Post";
  id: string;
  title: string | null;
  body: string | null;
  updatedAt: string | null;
  author: CreatePost_createPost_author | null;
}

export interface CreatePost {
  createPost: CreatePost_createPost | null;
}

export interface CreatePostVariables {
  input: CreatePostInput;
}
