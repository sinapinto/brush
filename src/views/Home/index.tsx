import React from 'react';
import { Query } from 'react-apollo';

import { BlankSlate, Card } from '../../components/globals';
import { getPostsQuery as QUERY } from '../../graphql/queries/post';
import PostPreview from '../../partials/PostPreview';
import { GetPosts } from '../../graphql/queries/__generated__/GetPosts';

class PostsQuery extends Query<GetPosts> {}

export const Home: React.FunctionComponent = () => {
  return (
    <Card>
      <PostsQuery query={QUERY}>
        {({ data, loading, error }) => {
          if (loading) return 'Loading..';
          if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
          if (!data || !data.getPosts || !data.getPosts.posts.length) {
            return <BlankSlate>Nothing here yet..</BlankSlate>;
          }
          return (
            <>
              {data.getPosts.posts.map(post => (
                <PostPreview
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  author={post.author}
                />
              ))}
            </>
          );
        }}
      </PostsQuery>
    </Card>
  );
};

export default Home;
