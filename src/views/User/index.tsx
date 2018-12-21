import React from 'react';
import { compose } from 'react-apollo';

import { Card } from '../../components/globals';
import { userByUsername } from '../../graphql/queries/user';
import UserBio from './UserBio';

interface Props {
  username: string;
  data?: any;
}

function User({ username, data }: Props) {
  return (
    <Card>
      <h1>{username}</h1>
      {data.user && <UserBio user={data.user} />}
    </Card>
  );
}

export default compose(userByUsername)(User);
