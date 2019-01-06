import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { BlankSlate } from '../../components/globals';
import { getSubscriptionsByUsername } from '../../graphql/queries/user';
import {
  GetSubscriptionsByUsername,
  GetSubscriptionsByUsernameVariables,
} from '../../graphql/queries/__generated__/GetSubscriptionsByUsername';
import { UserPreview } from '../../partials/UserPreview';

type FollowingListProps = {
  username: string;
};

export const FollowingList = ({ username }: FollowingListProps) => {
  const { data } = useQuery<
    GetSubscriptionsByUsername,
    GetSubscriptionsByUsernameVariables
  >(getSubscriptionsByUsername, {
    variables: {
      username,
    },
  });
  if (!data.user || !data.user.subscriptions.length)
    return <BlankSlate>This user isn't following anyone</BlankSlate>;
  return (
    <>
      {data.user.subscriptions.map(user => (
        <UserPreview key={user.id} user={user} />
      ))}
    </>
  );
};
