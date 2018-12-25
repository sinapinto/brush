import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import { BlankSlate } from '../../components/globals';
import FollowerItem from './FollowerItem';
import { getSubscribersByUsername } from '../../graphql/queries/user';
import {
  GetSubscribersByUsername,
  GetSubscribersByUsernameVariables,
} from '../../graphql/queries/__generated__/GetSubscribersByUsername';

type Props = {
  username: string;
};

const FollowersPane: React.FunctionComponent<Props> = ({ username }) => {
  const { data } = useQuery<
    GetSubscribersByUsername,
    GetSubscribersByUsernameVariables
  >(getSubscribersByUsername, {
    variables: {
      username,
    },
  });
  if (!data || !data.user || !data.user.subscribers.length)
    return <BlankSlate>Nobody.</BlankSlate>;
  return (
    <div>
      {data.user.subscribers.map(sub => (
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

export default FollowersPane;
