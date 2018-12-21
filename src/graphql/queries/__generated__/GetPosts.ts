/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPosts
// ====================================================

export interface GetPosts_getPosts_posts_author {
  __typename: "User";
  id: string;
  username: string | null;
  bio: string | null;
  avatar: string | null;
}

export interface GetPosts_getPosts_posts {
  __typename: "Post";
  id: string;
  title: string | null;
  body: string | null;
  updatedAt: string | null;
  author: GetPosts_getPosts_posts_author | null;
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
