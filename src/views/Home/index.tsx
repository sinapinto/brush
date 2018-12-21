import React from 'react';
import { Query } from 'react-apollo';

import { Card } from '../../components/globals';
import { getPostsQuery } from '../../graphql/queries/post';
import PostPreview from './PostPreview';

function Home() {
  return (
    <Card>
      <Query query={getPostsQuery}>
        {({ data, loading, error }) => {
          if (loading) return 'Loading..';
          if (error) return <p>{JSON.stringify(data.error, null, 2)}</p>;
          return (
            <pre>
              {data.getPosts.posts.map((post: any) => (
                <PostPreview
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  author={post.author}
                />
              ))}
            </pre>
          );
        }}
      </Query>
    </Card>
  );
}

export default Home;
