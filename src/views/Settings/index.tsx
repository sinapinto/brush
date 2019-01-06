import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Card } from '../../components/globals';
import { getUserByUsernameQuery } from '../../graphql/queries/user';
import {
  GetUserByUsername,
  GetUserByUsernameVariables,
} from '../../graphql/queries/__generated__/GetUserByUsername';
import { useCurrentUser } from '../../utils/useCurrentUser';
import { useTitle } from '../../utils/useTitle';
import { SettingsForm } from './SettingsForm';

export const Settings = () => {
  const { currentUser } = useCurrentUser();
  const { data } = useQuery<GetUserByUsername, GetUserByUsernameVariables>(
    getUserByUsernameQuery,
    {
      variables: { username: currentUser!.username },
    }
  );
  useTitle('Settings');
  return (
    <Card>
      {data.user && (
        <SettingsForm username={data.user.username} bio={data.user.bio} />
      )}
    </Card>
  );
};
