import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { H2, P, Card } from '../../components/globals';
import { getPostByIdQuery } from '../../graphql/queries/post';

export default function Post({ id }) {
  return (
    <Card>
      <Query query={getPostByIdQuery} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return 'Loading...';
          if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
          let post = data.getPost;
          return (
            <div>
              <H2>{post.title}</H2>
              <P>{post.body}</P>
              <P>{post.author}</P>
            </div>
          );
        }}
      </Query>
    </Card>
  );
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
};
