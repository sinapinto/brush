/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserByUsername
// ====================================================

export interface UserByUsername_user_posts {
  __typename: "Post";
  id: string;
  title: string | null;
  createdAt: string | null;
}

export interface UserByUsername_user {
  __typename: "User";
  id: string;
  username: string | null;
  avatar: string | null;
  bio: string | null;
  updatedAt: string | null;
  createdAt: string | null;
  posts: (UserByUsername_user_posts | null)[] | null;
}

export interface UserByUsername {
  user: UserByUsername_user | null;
}

export interface UserByUsernameVariables {
  username: string;
}
