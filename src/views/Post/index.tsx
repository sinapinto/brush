import React from 'react';
import { Query } from 'react-apollo';

import { H2, P, Card } from '../../components/globals';
import { getPostByIdQuery } from '../../graphql/queries/post';

type PostProps = {
  id: string;
};

const Post: React.FunctionComponent<PostProps> = ({ id }) => {
  return (
    <Card>
      <Query query={getPostByIdQuery} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return 'Loading...';
          if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
          const post = data.getPost;
          return (
            <div>
              <H2>{post.title}</H2>
              <P>{post.body}</P>
              <P>By {post.author.username}</P>
            </div>
          );
        }}
      </Query>
    </Card>
  );
};

export default Post;
