import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { client } from '../index';
import { userInfoFragment } from '../fragments/user';

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
  props: ({ mutate }) => ({
    registerUser: async ({ username, password }) => {
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
  props: ({ mutate }) => ({
    loginUser: ({ username, password }) =>
      mutate({
        variables: {
          username: username,
          password: password,
        },
      }),
  }),
});

let logoutUserMutation = gql`
  mutation LogoutUser {
    logout
  }
`;

export let logoutUser = graphql(logoutUserMutation, {
  props: ({ mutate }) => ({
    logoutUser: async () => {
      await mutate();
      return client.resetStore(); // purge apollo cache
    },
  }),
});
