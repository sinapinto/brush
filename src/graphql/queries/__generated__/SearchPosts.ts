/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchPosts
// ====================================================

export interface SearchPosts_search_results_User {
  __typename: "User";
  id: string;
  username: string;
  bio: string;
  avatar: string;
}

export interface SearchPosts_search_results_Post_author {
  __typename: "User";
  id: string;
  username: string;
  bio: string;
  avatar: string;
}

export interface SearchPosts_search_results_Post {
  __typename: "Post";
  id: string;
  title: string;
  body: string;
  updatedAt: string;
  author: SearchPosts_search_results_Post_author;
}

export type SearchPosts_search_results = SearchPosts_search_results_User | SearchPosts_search_results_Post;

export interface SearchPosts_search {
  __typename: "PaginatedSearchResults";
  results: SearchPosts_search_results[];
}

export interface SearchPosts {
  search: SearchPosts_search;
}

export interface SearchPostsVariables {
  query: string;
}
