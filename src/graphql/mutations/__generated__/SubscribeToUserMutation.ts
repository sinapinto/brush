/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubscribeToUserMutation
// ====================================================

export interface SubscribeToUserMutation_subscribeToUser {
  __typename: 'User';
  id: string;
  subscribed: boolean;
}

export interface SubscribeToUserMutation {
  subscribeToUser: SubscribeToUserMutation_subscribeToUser | null;
}

export interface SubscribeToUserMutationVariables {
  userId: string;
}
