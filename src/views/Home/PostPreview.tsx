import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H3, P } from '../../components/globals';

const Container = styled.div`
  padding: 16px;
`;

type Props = {
  id: string;
  title?: string;
  author?: {
    username: string;
  };
};

export default function PostPreview({ id, title, author }: Props) {
  return (
    <Container>
      <H3>
        <Link to={`/p/${id}`}>{title}</Link>
      </H3>
      <P>
        {author && (
          <Link to={`/u/${author.username}`}>By {author.username}</Link>
        )}
      </P>
    </Container>
  );
}
