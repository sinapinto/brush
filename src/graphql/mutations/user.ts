import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { userInfoFragment } from '../fragments/user';
import { RegisterUserVariables } from './__generated__/RegisterUser';
import { LoginUserVariables } from './__generated__/LoginUser';

let registerUserMutation = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      ...userInfo
    }
  }
  ${userInfoFragment}
`;

export let registerUser = graphql(registerUserMutation, {
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

let loginUserMutation = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...userInfo
    }
  }
  ${userInfoFragment}
`;

export let loginUser = graphql(loginUserMutation, {
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

export let logoutUserMutation = gql`
  mutation LogoutUser {
    logout
  }
`;
