/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Search
// ====================================================

export interface Search_search_results_User {
  __typename: "User";
  id: string;
  username: string;
  bio: string;
  avatar: string;
}

export interface Search_search_results_Post_categories {
  __typename: "Category";
  name: string;
}

export interface Search_search_results_Post_author {
  __typename: "User";
  id: string;
  username: string;
  bio: string;
  avatar: string;
}

export interface Search_search_results_Post {
  __typename: "Post";
  id: string;
  title: string;
  body: string;
  updatedAt: string;
  categories: Search_search_results_Post_categories[];
  author: Search_search_results_Post_author;
}

export type Search_search_results = Search_search_results_User | Search_search_results_Post;

export interface Search_search {
  __typename: "PaginatedSearchResults";
  results: Search_search_results[];
}

export interface Search {
  search: Search_search;
}

export interface SearchVariables {
  query: string;
}
