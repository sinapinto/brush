/* tslint:disable */
// This file was automatically generated and should not be edited.

import { EditProfileInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: EditProfileMutation
// ====================================================

export interface EditProfileMutation_editProfile {
  __typename: "User";
  id: string;
  bio: string;
  username: string;
}

export interface EditProfileMutation {
  editProfile: EditProfileMutation_editProfile | null;
}

export interface EditProfileMutationVariables {
  input: EditProfileInput;
}
