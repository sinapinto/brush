import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import { Card, BlankSlate } from '../../components/globals';
import UserProfile from './UserProfile';
import { getUserByUsernameQuery } from '../../graphql/queries/user';
import {
  GetUserByUsername,
  GetUserByUsernameVariables,
} from '../../graphql/queries/__generated__/GetUserByUsername';

interface Props {
  username: string;
}

export const User: React.FunctionComponent<Props> = ({ username }) => {
  const { data } = useQuery<GetUserByUsername, GetUserByUsernameVariables>(
    getUserByUsernameQuery,
    {
      variables: { username },
    }
  );
  return data.user ? (
    <UserProfile key={data.user.id} user={data.user} />
  ) : (
    <Card>
      <BlankSlate>This user doesn't exist</BlankSlate>
    </Card>
  );
};

export default User;
