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

const FollowersList: React.FunctionComponent<Props> = ({ username }) => {
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
      {data.user.subscribers.map(sub => (
        <FollowerItem
          key={sub.id}
          id={sub.id}
          username={sub.username}
          bio={sub.bio}
          isFollowing={sub.subscribed}
        />
      ))}
    </>
  );
};

export default FollowersList;
