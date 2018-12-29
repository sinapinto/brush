import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H3, P } from '../../components/globals';

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
      <H3 i>
        <Link to={`/p/${id}`}>{title}</Link>
      </H3>
      <P>
        <Link to={`/u/${author.username}`}>{author.username}</Link>
      </P>
    </Container>
  );
};

const Container = styled.div``;

export default PostPreview;
