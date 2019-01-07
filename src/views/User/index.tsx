import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { BlankSlate, Card } from '../../components/globals';
import { getUserByUsernameQuery } from '../../graphql/queries/user';
import {
  GetUserByUsername,
  GetUserByUsernameVariables,
} from '../../graphql/queries/__generated__/GetUserByUsername';
import { useTitle } from '../../utils/useTitle';
import { UserProfile } from './UserProfile';

interface UserProps {
  username: string;
}

export const User = ({ username }: UserProps) => {
  const { data } = useQuery<GetUserByUsername, GetUserByUsernameVariables>(
    getUserByUsernameQuery,
    {
      variables: { username },
    }
  );
  useTitle(`Brushes by ${data.user ? data.user.username : ''}`);
  return data.user ? (
    <UserProfile key={data.user.id} user={data.user} />
  ) : (
    <Card>
      <BlankSlate>This user doesn't exist</BlankSlate>
    </Card>
  );
};
