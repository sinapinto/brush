import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { BlankSlate } from '../../components/globals';
import { getSubscribersByUsername } from '../../graphql/queries/user';
import {
  GetSubscribersByUsername,
  GetSubscribersByUsernameVariables,
} from '../../graphql/queries/__generated__/GetSubscribersByUsername';
import { UserPreview } from '../../partials/UserPreview';

type FollowersListProps = {
  username: string;
};

export const FollowersList = ({ username }: FollowersListProps) => {
  const { data } = useQuery<
    GetSubscribersByUsername,
    GetSubscribersByUsernameVariables
  >(getSubscribersByUsername, {
    variables: {
      username,
    },
  });
  if (!data.user || !data.user.subscribers.length)
    return <BlankSlate>This user has no followers</BlankSlate>;
  return (
    <>
      {data.user.subscribers.map(user => (
        <UserPreview key={user.id} user={user} />
      ))}
    </>
  );
};
