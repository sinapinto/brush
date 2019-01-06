import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import { MdPersonAdd as FollowIcon } from 'react-icons/md';
import { Button, OutlineButton } from '../../components/Button';
import { subscribeToUserMutation, unsubscribeToUserMutation } from '../../graphql/mutations/user';
import { MdHowToReg as UnfollowIcon } from './MdHowToReg';

type FollowButtonProps = {
  isFollowing: boolean;
  userId: string;
};

export const FollowButton = ({ isFollowing, userId }: FollowButtonProps) => {
  const unsubscribe = useMutation(unsubscribeToUserMutation, {
    variables: { userId },
    optimisticResponse: {
      unsubscribeToUser: {
        id: userId,
        subscribed: false,
        __typename: 'User',
      },
    },
  });
  const subscribe = useMutation(subscribeToUserMutation, {
    variables: { userId },
    optimisticResponse: {
      subscribeToUser: {
        id: userId,
        subscribed: true,
        __typename: 'User',
      },
    },
  });
  const Btn = isFollowing ? Button : OutlineButton;
  return (
    <Btn
      onClick={() => (isFollowing ? unsubscribe() : subscribe())}
      style={{ minWidth: '150px' }}
    >
      {isFollowing ? <UnfollowIcon size={20} /> : <FollowIcon size={20} />}
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Btn>
  );
};
