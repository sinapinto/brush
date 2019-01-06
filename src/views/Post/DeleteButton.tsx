import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { MdDelete } from 'react-icons/md';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { DangerousButton } from '../../components/Button';
import { H4 } from '../../components/globals';
import { Modal } from '../../components/Modal';
import { deletePostMutation } from '../../graphql/mutations/post';
import { DeletePost, DeletePostVariables } from '../../graphql/mutations/__generated__/DeletePost';
import { getPostsQuery } from '../../graphql/queries/post';
import { GetPosts } from '../../graphql/queries/__generated__/GetPosts';

interface DeleteButtonProps extends RouteComponentProps {
  postId: string;
}

const DeleteButtonComponent = ({ postId, history }: DeleteButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const deletePost = useMutation<DeletePost, DeletePostVariables>(
    deletePostMutation,
    {
      variables: { id: postId },
      update: (proxy) => {
        try {
          const data = proxy.readQuery<GetPosts>({
            query: getPostsQuery,
          });
          if (data && data.getPosts) {
            data.getPosts.posts = data.getPosts.posts.filter(
              p => p.id !== postId
            );
            proxy.writeQuery({ query: getPostsQuery, data });
          }
        } catch (e) {
          // have never run `getPostsQuery` before
        }
      },
    }
  );

  return (
    <>
      <DeleteIcon onClick={() => setModalOpen(true)} />
      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <ModalBody>
          <H4>Are you sure you want to delete this post?</H4>
          <DangerousButton
            disabled={loading}
            onClick={() => {
              setLoading(true);
              deletePost()
                .then(() => {
                  setModalOpen(false);
                  setLoading(false);
                  history.push('/');
                })
                .catch(() => setLoading(false));
            }}
          >
            Yes, Delete
          </DangerousButton>
        </ModalBody>
      </Modal>
    </>
  );
};

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

export const DeleteButton = withRouter(DeleteButtonComponent);
