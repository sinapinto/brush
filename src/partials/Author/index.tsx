import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar } from '../../components/Avatar';

type AuthorProps = {
  user: {
    avatar: string;
    username: string;
  };
};

export const Author = ({ user }: AuthorProps) => {
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
