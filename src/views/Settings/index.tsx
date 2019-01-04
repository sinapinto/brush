import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import useTitle from '../../utils/useTitle';
import SettingsForm from './SettingsForm';
import { useCurrentUser } from '../../utils/useCurrentUser';
import { getUserByUsernameQuery } from '../../graphql/queries/user';
import { Card } from '../../components/globals';
import {
  GetUserByUsernameVariables,
  GetUserByUsername,
} from '../../graphql/queries/__generated__/GetUserByUsername';

type Props = {};

const Settings: React.FunctionComponent<Props> = () => {
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

export default Settings;
