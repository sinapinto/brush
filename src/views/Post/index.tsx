import React, { useState, useContext } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Value } from 'slate';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';

import Modal from '../../components/Modal';
import TextEditor from '../../components/TextEditor';
import { DangerousButton } from '../../components/Button';
import {
  H2i,
  H4,
  P,
  Card,
  BlankSlate,
  ErrorMessage,
} from '../../components/globals';
import { CurrentUserContext } from '../../context';
import { getPostByIdQuery } from '../../graphql/queries/post';
import {
  GetPostById,
  GetPostByIdVariables,
} from '../../graphql/queries/__generated__/GetPostById';
import { deletePostMutation } from '../../graphql/mutations/post';
import {
  DeletePostVariables,
  DeletePost,
} from '../../graphql/mutations/__generated__/DeletePost';

type Props = {
  id: string;
};

class GetPostByIdQuery extends Query<GetPostById, GetPostByIdVariables> {}
class DeletePostMutation extends Mutation<DeletePost, DeletePostVariables> {}

const Post: React.FunctionComponent<Props> = ({ id }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <Card>
      <DeletePostMutation
        mutation={deletePostMutation}
        variables={{ id }}
        onCompleted={() => setDeleteModalOpen(false)}
      >
        {(deletePost, { loading: deleteLoading, error: deleteError }) => (
          <GetPostByIdQuery query={getPostByIdQuery} variables={{ id }}>
            {({ data, loading, error }) => {
              if (loading) return 'Loading...';
              if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
              if (!data || !data.getPost) {
                return <BlankSlate>That post doesn't exist!</BlankSlate>;
              }
              const post = data.getPost;
              const editorValue = Value.fromJSON(JSON.parse(post.body));
              const isAuthor = currentUser && currentUser.id === post.author.id;
              return (
                <>
                  <HeaderWrap>
                    <H2i>{post.title}</H2i>
                    {isAuthor && (
                      <DeleteIcon onClick={() => setDeleteModalOpen(true)} />
                    )}
                  </HeaderWrap>
                  <TextEditor readOnly value={editorValue} />
                  <P>By {post.author.username}</P>
                  <Modal
                    isOpen={deleteModalOpen}
                    onRequestClose={() => setDeleteModalOpen(false)}
                  >
                    <ModalBody>
                      <H4>Are you sure you want to delete this post?</H4>
                      {deleteError && (
                        <ErrorMessage>something went wrong.</ErrorMessage>
                      )}
                      <DangerousButton
                        disabled={deleteLoading}
                        onClick={() => deletePost()}
                      >
                        Yes, Delete
                      </DangerousButton>
                    </ModalBody>
                  </Modal>
                </>
              );
            }}
          </GetPostByIdQuery>
        )}
      </DeletePostMutation>
    </Card>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteIcon = styled(MdDelete)`
  color: #ccc;
  font-size: 24px;
  :hover {
    color: black;
    cursor: pointer;
  }
`;

const ModalBody = styled.div`
  ${H4} {
    margin-bottom: 24px;
  }
`;

export default Post;
