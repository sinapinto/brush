import React from 'react';
import { useQuery } from 'react-apollo-hooks';

import useTitle from '../../utils/useTitle';
import { Card, H3, BlankSlate, SpacedContent } from '../../components/globals';
import PostPreview from '../../partials/PostPreview';
import { getPostsByCategory } from '../../graphql/queries/post';
import {
  GetPostsByCategory,
  GetPostsByCategoryVariables,
} from '../../graphql/queries/__generated__/GetPostsByCategory';

type Props = {
  tag: string;
};

const TagSearch: React.FunctionComponent<Props> = ({ tag }) => {
  const { data } = useQuery<GetPostsByCategory, GetPostsByCategoryVariables>(
    getPostsByCategory,
    {
      variables: {
        category: tag,
      },
    }
  );
  const { posts } = data.getPostsByCategory;
  useTitle(`Tagged with "${tag}"`);
  return (
    <Card>
      <SpacedContent m={4}>
        <H3>{`Tagged with “${tag}”`}</H3>
        {posts.length ? (
          posts.map(post => <PostPreview key={post.id} post={post} />)
        ) : (
          <BlankSlate>No posts found</BlankSlate>
        )}
      </SpacedContent>
    </Card>
  );
};

export default TagSearch;
