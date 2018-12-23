import React from 'react';
import { Query } from 'react-apollo';

import { BlankSlate, Card } from '../../components/globals';
import { getPostsQuery as QUERY } from '../../graphql/queries/post';
import PostPreview from '../../partial/PostPreview';
import { GetPosts } from '../../graphql/queries/__generated__/GetPosts';

class PostsQuery extends Query<GetPosts> {}

export const Home: React.FunctionComponent = () => {
  return (
    <Card>
      <PostsQuery query={QUERY}>
        {({ data, loading, error }) => {
          if (loading) return 'Loading..';
          if (error) return <p>{JSON.stringify(error, null, 2)}</p>;
          if (!data) return <div>no data</div>;
          let { posts } = data.getPosts;
          if (!posts.length) {
            return <BlankSlate>Nothing here yet..</BlankSlate>;
          }
          return (
            <>
              {posts.map(post => (
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
