import React from 'react';
import { Mutation } from 'react-apollo';
import { RouterProps, withRouter } from 'react-router';
import { Button } from '../../components/Button';
import { logoutUserMutation as MUTATION } from '../../graphql/mutations/user';
import { LogoutUser } from '../../graphql/mutations/__generated__/LogoutUser';

class LogoutUserMutation extends Mutation<LogoutUser> {}

export const LogoutButton = withRouter(({ history }: RouterProps) => {
  return (
    <LogoutUserMutation mutation={MUTATION}>
      {(mutate, { client }) => (
        <Button
          type="button"
          onClick={() =>
            mutate().then(() => {
              client.resetStore();
              history.push('/');
            })
          }
        >
          Log Out
        </Button>
      )}
    </LogoutUserMutation>
  );
});
