/* tslint:disable */
// This file was automatically generated and should not be edited.

import { CreatePostInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost_categories {
  __typename: "Category";
  name: string;
}

export interface CreatePost_createPost_author {
  __typename: "User";
  id: string;
  username: string;
  bio: string;
  avatar: string;
}

export interface CreatePost_createPost {
  __typename: "Post";
  id: string;
  title: string;
  body: string;
  updatedAt: string;
  categories: CreatePost_createPost_categories[];
  author: CreatePost_createPost_author;
}

export interface CreatePost {
  createPost: CreatePost_createPost | null;
}

export interface CreatePostVariables {
  input: CreatePostInput;
}
