/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterUser
// ====================================================

export interface RegisterUser_register {
  __typename: "User";
  id: string;
  username: string | null;
  bio: string | null;
  avatar: string | null;
}

export interface RegisterUser {
  register: RegisterUser_register | null;
}

export interface RegisterUserVariables {
  username: string;
  password: string;
}
