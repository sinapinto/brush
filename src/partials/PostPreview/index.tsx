import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H3i, P } from '../../components/globals';

type Props = {
  id: string;
  title: string;
  author: {
    username: string;
  };
};

const PostPreview: React.FunctionComponent<Props> = ({ id, title, author }) => {
  return (
    <Container>
      <H3i>
        <Link to={`/p/${id}`}>{title}</Link>
      </H3i>
      <P>
        <Link to={`/u/${author.username}`}>{author.username}</Link>
      </P>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px 32px;
  :first-child {
    padding-top: 32px;
  }
  :last-child {
    padding-bottom: 32px;
  }
`;

export default PostPreview;
