import React from 'react';
import { Link } from 'react-router-dom';

import { P } from '../../components/globals';

type Props = {
  username: string;
};

const UserPreview: React.FunctionComponent<Props> = ({ username }) => {
  return (
    <div>
      <P>
        <Link to={`/u/${username}`}>{username}</Link>
      </P>
    </div>
  );
};

export default UserPreview;
