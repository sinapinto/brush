import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H3, P } from '../../components/globals';

type PostPreviewProps = {
  id: string;
  title: string;
  author: {
    username: string;
  };
};

const PostPreview: React.FunctionComponent<PostPreviewProps> = ({
  id,
  title,
  author,
}) => {
  return (
    <Container>
      <H3>
        <Link to={`/p/${id}`}>{title}</Link>
      </H3>
      <P>
        <Link to={`/u/${author.username}`}>By {author.username}</Link>
      </P>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
`;

export default PostPreview;
