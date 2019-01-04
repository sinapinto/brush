import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { userInfoFragment } from '../fragments/user';
import { RegisterUserVariables } from './__generated__/RegisterUser';
import { LoginUserVariables } from './__generated__/LoginUser';

const registerUserMutation = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      ...userInfo
    }
  }
  ${userInfoFragment}
`;

export const registerUser = graphql(registerUserMutation, {
  options: { errorPolicy: 'all' },
  props: ({ mutate }: any) => ({
    registerUser: async ({ username, password }: RegisterUserVariables) => {
      return mutate({
        variables: {
          username: username,
          password: password,
        },
      });
    },
  }),
});

const loginUserMutation = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...userInfo
    }
  }
  ${userInfoFragment}
`;

export const loginUser = graphql(loginUserMutation, {
  options: { errorPolicy: 'all' },
  props: ({ mutate }: any) => ({
    loginUser: ({ username, password }: LoginUserVariables) =>
      mutate({
        variables: {
          username: username,
          password: password,
        },
      }),
  }),
});

export const logoutUserMutation = gql`
  mutation LogoutUser {
    logout
  }
`;

export const subscribeToUserMutation = gql`
  mutation SubscribeToUserMutation($userId: ID!) {
    subscribeToUser(id: $userId) {
      id
      subscribed
    }
  }
`;

export const unsubscribeToUserMutation = gql`
  mutation UnsubscribeToUserMutation($userId: ID!) {
    unsubscribeToUser(id: $userId) {
      id
      subscribed
    }
  }
`;

export const editProfileMutation = gql`
  mutation EditProfileMutation($input: EditProfileInput!) {
    editProfile(input: $input) {
      id
      bio
      username
    }
  }
`;
