/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostsByCategory
// ====================================================

export interface GetPostsByCategory_getPostsByCategory_posts_categories {
  __typename: "Category";
  name: string;
}

export interface GetPostsByCategory_getPostsByCategory_posts_author {
  __typename: "User";
  id: string;
  username: string;
  bio: string;
  avatar: string;
}

export interface GetPostsByCategory_getPostsByCategory_posts {
  __typename: "Post";
  id: string;
  title: string;
  body: string;
  rawBody: string;
  updatedAt: string;
  categories: GetPostsByCategory_getPostsByCategory_posts_categories[];
  author: GetPostsByCategory_getPostsByCategory_posts_author;
}

export interface GetPostsByCategory_getPostsByCategory {
  __typename: "PaginatedPosts";
  posts: GetPostsByCategory_getPostsByCategory_posts[];
}

export interface GetPostsByCategory {
  getPostsByCategory: GetPostsByCategory_getPostsByCategory;
}

export interface GetPostsByCategoryVariables {
  category: string;
}
