/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSubscribersByUsername
// ====================================================

export interface GetSubscribersByUsername_user_subscribers {
  __typename: "User";
  id: string;
  username: string;
  bio: string;
  avatar: string;
  subscribed: boolean;
}

export interface GetSubscribersByUsername_user {
  __typename: "User";
  id: string;
  subscribers: GetSubscribersByUsername_user_subscribers[];
}

export interface GetSubscribersByUsername {
  user: GetSubscribersByUsername_user | null;
}

export interface GetSubscribersByUsernameVariables {
  username: string;
}
