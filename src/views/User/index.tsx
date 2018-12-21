import React from 'react';
import { Query } from 'react-apollo';

import { Card } from '../../components/globals';
import UserBio from './UserBio';
import { userByUsernameQuery as QUERY } from '../../graphql/queries/user';
import {
  UserByUsername,
  UserByUsernameVariables,
} from '../../graphql/queries/__generated__/UserByUsername';

class UserQuery extends Query<UserByUsername, UserByUsernameVariables> {}

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
          if (!data) return 'no data';
          return data.user && <UserBio user={data.user} />;
        }}
      </UserQuery>
    </Card>
  );
};

export default User;
