/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterUser
// ====================================================

export interface RegisterUser_register {
  __typename: "User";
  id: string;
  username: string;
  bio: string;
  avatar: string;
}

export interface RegisterUser {
  register: RegisterUser_register | null;
}

export interface RegisterUserVariables {
  username: string;
  password: string;
}
