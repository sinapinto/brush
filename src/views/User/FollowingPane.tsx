import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import { BlankSlate } from '../../components/globals';
import FollowerItem from './FollowerItem';
import { getSubscriptionsByUsername } from '../../graphql/queries/user';
import {
  GetSubscriptionsByUsername,
  GetSubscriptionsByUsernameVariables,
} from '../../graphql/queries/__generated__/GetSubscriptionsByUsername';

type Props = {
  username: string;
};

const FollowingPane: React.FunctionComponent<Props> = ({ username }) => {
  const { data } = useQuery<
    GetSubscriptionsByUsername,
    GetSubscriptionsByUsernameVariables
  >(getSubscriptionsByUsername, {
    variables: {
      username,
    },
  });
  if (!data || !data.user || !data.user.subscriptions.length)
    return <BlankSlate>This user isn't following anyone</BlankSlate>;
  return (
    <div>
      {data.user.subscriptions.map(sub => (
        <FollowerItem
          key={sub.id}
          id={sub.id}
          username={sub.username}
          bio={sub.bio}
          isFollowing={sub.subscribed}
        />
      ))}
    </div>
  );
};

export default FollowingPane;
