import React from 'react';
import { Query } from 'react-apollo';
import { Value } from 'slate';
import styled from 'styled-components';

import TextEditor from '../../components/TextEditor';
import { H2i, P, Card, BlankSlate } from '../../components/globals';
import { getPostByIdQuery } from '../../graphql/queries/post';
import { currentUserQuery } from '../../graphql/queries/user';
import DeleteButton from './DeleteButton';
import {
  GetPostById,
  GetPostByIdVariables,
} from '../../graphql/queries/__generated__/GetPostById';
import { CurrentUser } from '../../graphql/queries/__generated__/CurrentUser';

type PostProps = {
  id: string;
};

class GetPostByIdQuery extends Query<GetPostById, GetPostByIdVariables> {}
class CurrentUserQuery extends Query<CurrentUser> {}

const Post: React.FunctionComponent<PostProps> = ({ id }) => {
  return (
    <Card>
      <CurrentUserQuery query={currentUserQuery} errorPolicy="ignore">
        {({ data: currentUserData }) => (
          <GetPostByIdQuery query={getPostByIdQuery} variables={{ id }}>
            {({ data, loading, error }) => {
              if (loading) return 'Loading...';
              if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
              if (!data || !data.getPost) {
                return <BlankSlate>That post doesn't exist!</BlankSlate>;
              }
              const post = data.getPost;
              const editorValue = Value.fromJSON(JSON.parse(post.body));
              const isAuthor =
                currentUserData &&
                currentUserData.currentUser &&
                currentUserData.currentUser.id === post.author.id;
              return (
                <>
                  <HeaderWrap>
                    <H2i>{post.title}</H2i>
                    {isAuthor && <DeleteButton postId={post.id} />}
                  </HeaderWrap>
                  <TextEditor readOnly value={editorValue} />
                  <P>By {post.author.username}</P>
                </>
              );
            }}
          </GetPostByIdQuery>
        )}
      </CurrentUserQuery>
    </Card>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Post;
