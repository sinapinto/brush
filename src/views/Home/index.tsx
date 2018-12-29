import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import { BlankSlate, Card, SpacedContent } from '../../components/globals';
import { getPostsQuery } from '../../graphql/queries/post';
import PostPreview from '../../partials/PostPreview';
import { GetPosts } from '../../graphql/queries/__generated__/GetPosts';

export const Home: React.FunctionComponent = () => {
  const { data } = useQuery<GetPosts>(getPostsQuery, {
    variables: { pageSize: 25 },
  });
  return (
    <Card>
      {!data.getPosts || !data.getPosts.posts.length ? (
        <BlankSlate>No posts yet. Be the first!</BlankSlate>
      ) : (
        <SpacedContent f={4}>
          {data.getPosts.posts.map(post => (
            <PostPreview
              key={post.id}
              post={post}
            />
          ))}
        </SpacedContent>
      )}
    </Card>
  );
};

export default Home;
