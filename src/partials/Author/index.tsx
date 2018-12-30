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
    <Container>
      <Avatar size="sm" src={user.avatar} />
      <UsernameLink to={`/u/${user.username}`}>{user.username}</UsernameLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const UsernameLink = styled(Link)`
  font-size: 14px;
`;

export default Author;
