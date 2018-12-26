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
  const { currentUser, loading: loadingCurrentUser } = useContext(
    CurrentUserContext
  );
  const { data, loading } = useQuery<
    GetUserByUsername,
    GetUserByUsernameVariables
  >(getUserByUsernameQuery, {
    suspend: false,
    variables: { username: currentUser!.username },
  });
  if (loadingCurrentUser || loading) return <Spinner />;
  return (
    <Card>
      {data.user && (
        <SettingsForm username={data.user.username} bio={data.user.bio} />
      )}
    </Card>
  );
};

export default Settings;
