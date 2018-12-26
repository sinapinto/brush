/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_currentUser {
  __typename: "User";
  id: string;
  username: string;
  bio: string;
  avatar: string;
}

export interface CurrentUser {
  currentUser: CurrentUser_currentUser | null;
}
