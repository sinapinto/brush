import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { BlankSlate, Card, H3, SpacedContent } from '../../components/globals';
import { getPostsByCategory } from '../../graphql/queries/post';
import {
  GetPostsByCategory,
  GetPostsByCategoryVariables,
} from '../../graphql/queries/__generated__/GetPostsByCategory';
import { PostPreview } from '../../partials/PostPreview';
import { useTitle } from '../../utils/useTitle';

type TagSearchProps = {
  tag: string;
};

const TagSearch = ({ tag }: TagSearchProps) => {
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
