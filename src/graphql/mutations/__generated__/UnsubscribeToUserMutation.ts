/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnsubscribeToUserMutation
// ====================================================

export interface UnsubscribeToUserMutation_unsubscribeToUser {
  __typename: "User";
  id: string;
}

export interface UnsubscribeToUserMutation {
  unsubscribeToUser: UnsubscribeToUserMutation_unsubscribeToUser | null;
}

export interface UnsubscribeToUserMutationVariables {
  userId: string;
}
