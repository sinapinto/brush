/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSubscriptionsByUsername
// ====================================================

export interface GetSubscriptionsByUsername_user_subscriptions {
  __typename: "User";
  id: string;
  username: string;
  bio: string;
  avatar: string;
  subscribed: boolean;
}

export interface GetSubscriptionsByUsername_user {
  __typename: "User";
  id: string;
  subscriptions: GetSubscriptionsByUsername_user_subscriptions[];
}

export interface GetSubscriptionsByUsername {
  user: GetSubscriptionsByUsername_user | null;
}

export interface GetSubscriptionsByUsernameVariables {
  username: string;
}
