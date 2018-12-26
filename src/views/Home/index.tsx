import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import { BlankSlate, Card } from '../../components/globals';
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
        <BlankSlate>Nothing here yet..</BlankSlate>
      ) : (
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
      )}
    </Card>
  );
};

export default Home;
