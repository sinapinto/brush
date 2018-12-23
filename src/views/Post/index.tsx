import React from 'react';
import { Query } from 'react-apollo';
import { Value } from 'slate';
import styled from 'styled-components';

import TextEditor from '../../components/TextEditor';
import { H2i, P, Card, BlankSlate } from '../../components/globals';
import { getPostByIdQuery } from '../../graphql/queries/post';
import DeleteButton from './DeleteButton';

type PostProps = {
  id: string;
};

const Post: React.FunctionComponent<PostProps> = ({ id }) => {
  return (
    <Card>
      <Query query={getPostByIdQuery} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return 'Loading...';
          if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
          const post = data.getPost;
          if (!post) {
            return <BlankSlate>That post doesn't exist!</BlankSlate>;
          }
          const editorValue = Value.fromJSON(JSON.parse(post.body));
          return (
            <>
              <HeaderWrap>
                <H2i>{post.title}</H2i>
                <DeleteButton postId={post.id} />
              </HeaderWrap>
              <TextEditor readOnly value={editorValue} />
              <P>By {post.author.username}</P>
            </>
          );
        }}
      </Query>
    </Card>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Post;
