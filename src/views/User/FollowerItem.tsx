import React from 'react';

type Props = {
  username: string;
  bio: string;
};

const FollowerItem: React.FunctionComponent<Props> = ({ username, bio }) => {
  return (
    <div>
      <p>
        {username} - {bio}
      </p>
    </div>
  );
};

export default FollowerItem;
