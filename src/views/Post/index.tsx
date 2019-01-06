import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { BlankSlate, Card } from '../../components/globals';
import { getPostByIdQuery } from '../../graphql/queries/post';
import { GetPostById, GetPostByIdVariables } from '../../graphql/queries/__generated__/GetPostById';
import { useTitle } from '../../utils/useTitle';
import Post from './Post';

type PostContainerProps = {
  id: string;
};

const PostContainer = ({ id }: PostContainerProps) => {
  const { data } = useQuery<GetPostById, GetPostByIdVariables>(
    getPostByIdQuery,
    { variables: { id } }
  );
  useTitle(data.getPost ? data.getPost.title : '');
  return (
    <Card>
      {data.getPost ? (
        <Post post={data.getPost} />
      ) : (
        <BlankSlate>This post no longer exists</BlankSlate>
      )}
    </Card>
  );
};

export default PostContainer;
