import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { H3, P } from '../../components/globals';

let Container = styled.div`
  padding: 16px;
`;

export default function PostPreview({ id, title, author }) {
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

PostPreview.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  author: PropTypes.shape({
    username: PropTypes.string,
  }),
};
