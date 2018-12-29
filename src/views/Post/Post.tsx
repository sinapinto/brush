import React from 'react';
import { useCurrentUser } from '../../utils/useCurrentUser';
import { Value } from 'slate';
import styled from 'styled-components';

import DeleteButton from './DeleteButton';
import { H1, H4, P, ErrorMessage } from '../../components/globals';
import TextEditor from '../../components/TextEditor';
import { GetPostById_getPost } from '../../graphql/queries/__generated__/GetPostById';

type Props = {
  post: GetPostById_getPost;
};

const Post: React.FunctionComponent<Props> = ({ post }) => {
  const { currentUser } = useCurrentUser();

  const editorValue = Value.fromJSON(JSON.parse(post.body));
  const isAuthor = currentUser && currentUser.id === post.author.id;

  return (
    <>
      <HeaderWrap>
        <H1 i>{post.title}</H1>
        {isAuthor && <DeleteButton postId={post.id} />}
      </HeaderWrap>
      <TextEditor readOnly value={editorValue} />
      <P>By {post.author.username}</P>
    </>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Post;
