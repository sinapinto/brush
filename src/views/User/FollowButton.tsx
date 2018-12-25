import React from 'react';
import { useMutation } from 'react-apollo-hooks';

import { OutlineButton, Button } from '../../components/Button';
import {
  subscribeToUserMutation,
  unsubscribeToUserMutation,
} from '../../graphql/mutations/user';

type Props = {
  isFollowing: boolean;
  userId: string;
};

const FollowButton: React.FunctionComponent<Props> = ({
  isFollowing,
  userId,
}) => {
  const unsubscribe = useMutation(unsubscribeToUserMutation, {
    variables: { userId },
  });
  const subscribe = useMutation(subscribeToUserMutation, {
    variables: { userId },
  });
  const Btn = isFollowing ? Button : OutlineButton;
  return (
    <Btn onClick={() => (isFollowing ? unsubscribe() : subscribe())}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Btn>
  );
};

export default FollowButton;
