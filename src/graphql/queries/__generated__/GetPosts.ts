/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPosts
// ====================================================

export interface GetPosts_getPosts_posts_author {
  __typename: "User";
  id: string;
  username: string;
  bio: string;
  avatar: string;
}

export interface GetPosts_getPosts_posts {
  __typename: "Post";
  id: string;
  title: string;
  body: string;
  updatedAt: string;
  author: GetPosts_getPosts_posts_author;
}

export interface GetPosts_getPosts {
  __typename: "PaginatedPosts";
  cursor: string | null;
  hasMore: boolean;
  posts: (GetPosts_getPosts_posts | null)[];
}

export interface GetPosts {
  getPosts: GetPosts_getPosts;
}

export interface GetPostsVariables {
  pageSize?: number | null;
  after?: string | null;
}
