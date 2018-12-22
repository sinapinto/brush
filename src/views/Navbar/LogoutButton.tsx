import React from 'react';
import { Mutation } from 'react-apollo';

import { Button } from '../../components/Button';
import { logoutUserMutation as MUTATION } from '../../graphql/mutations/user';
import { LogoutUser } from '../../graphql/mutations/__generated__/LogoutUser';
import { client } from '../../graphql';

class LogoutUserMutation extends Mutation<LogoutUser> {}

const LogoutButton: React.FunctionComponent = () => {
  return (
    <LogoutUserMutation mutation={MUTATION}>
      {mutate => (
        <Button
          type="button"
          onClick={() => mutate().then(() => client.resetStore())}
        >
          Log Out
        </Button>
      )}
    </LogoutUserMutation>
  );
};

export default LogoutButton;
