/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserByUsername
// ====================================================

export interface UserByUsername_user_posts {
  __typename: "Post";
  id: string;
  title: string;
  createdAt: string;
}

export interface UserByUsername_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string;
  bio: string;
  subscribed: boolean;
  isSubscriber: boolean;
  updatedAt: string;
  createdAt: string;
  posts: UserByUsername_user_posts[];
}

export interface UserByUsername {
  user: UserByUsername_user | null;
}

export interface UserByUsernameVariables {
  username: string;
}
