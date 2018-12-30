import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Avatar from '../../components/Avatar';

type Props = {
  user: {
    avatar: string;
    username: string;
  };
};

const Author: React.FunctionComponent<Props> = ({ user }) => {
  return (
    <UserContainer>
      <Avatar size="sm" src={user.avatar} />
      <Link to={`/u/${user.username}`}>{user.username}</Link>
    </UserContainer>
  );
};

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default Author;
