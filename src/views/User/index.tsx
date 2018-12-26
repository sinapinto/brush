import React from 'react';
import { Query } from 'react-apollo';

import { Card } from '../../components/globals';
import UserProfile from './UserProfile';
import { getUserByUsernameQuery as QUERY } from '../../graphql/queries/user';
import {
  GetUserByUsername,
  GetUserByUsernameVariables,
} from '../../graphql/queries/__generated__/GetUserByUsername';

class UserQuery extends Query<GetUserByUsername, GetUserByUsernameVariables> {}

interface UserProps {
  username: string;
}

export const User: React.FunctionComponent<UserProps> = ({ username }) => {
  return (
    <Card>
      <UserQuery query={QUERY} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return 'loading';
          if (error) return 'error';
          if (!data || !data.user) return 'no data';
          return <UserProfile user={data.user} />;
        }}
      </UserQuery>
    </Card>
  );
};

export default User;
