/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserByUsername
// ====================================================

export interface GetUserByUsername_user_posts_categories {
  __typename: "Category";
  name: string;
}

export interface GetUserByUsername_user_posts {
  __typename: "Post";
  id: string;
  title: string;
  createdAt: string;
  categories: GetUserByUsername_user_posts_categories[];
}

export interface GetUserByUsername_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string;
  bio: string;
  subscribed: boolean;
  isSubscriber: boolean;
  createdAt: string;
  posts: GetUserByUsername_user_posts[];
}

export interface GetUserByUsername {
  user: GetUserByUsername_user | null;
}

export interface GetUserByUsernameVariables {
  username: string;
}
