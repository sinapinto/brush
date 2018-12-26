import React, { useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import SettingsForm from './SettingsForm';
import { CurrentUserContext } from '../../context';
import { getUserByUsernameQuery } from '../../graphql/queries/user';
import { Spinner, Card } from '../../components/globals';
import {
  GetUserByUsernameVariables,
  GetUserByUsername,
} from '../../graphql/queries/__generated__/GetUserByUsername';

const Settings = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { data } = useQuery<GetUserByUsername, GetUserByUsernameVariables>(
    getUserByUsernameQuery,
    {
      variables: { username: currentUser!.username },
    }
  );
  return (
    <Card>
      {data.user && (
        <SettingsForm username={data.user.username} bio={data.user.bio} />
      )}
    </Card>
  );
};

export default Settings;
