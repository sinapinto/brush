import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import useTitle from '../../utils/useTitle';
import { BlankSlate, Card, SpacedContent } from '../../components/globals';
import PostPreview from '../../partials/PostPreview';
import { getPostsQuery } from '../../graphql/queries/post';
import { GetPosts } from '../../graphql/queries/__generated__/GetPosts';

export const Home: React.FunctionComponent = () => {
  const {
    data: { getPosts },
  } = useQuery<GetPosts>(getPostsQuery);
  useTitle('Brush');
  return (
    <Card>
      {getPosts && getPosts.posts.length ? (
        <SpacedContent m={4}>
          {getPosts.posts.map(post => (
            <PostPreview key={post.id} post={post} />
          ))}
        </SpacedContent>
      ) : (
        <BlankSlate>No posts yet. Be the first!</BlankSlate>
      )}
    </Card>
  );
};

export default Home;
