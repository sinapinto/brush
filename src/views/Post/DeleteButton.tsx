import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';

import { H4, P, ErrorMessage } from '../../components/globals';
import Modal from '../../components/Modal';
import { DangerousButton } from '../../components/Button';
import { deletePostMutation } from '../../graphql/mutations/post';
import {
  DeletePostVariables,
  DeletePost,
} from '../../graphql/mutations/__generated__/DeletePost';

type Props = {
  postId: string;
};

const DeleteButton: React.FunctionComponent<Props> = ({ postId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const deletePost = useMutation<DeletePost, DeletePostVariables>(
    deletePostMutation,
    {
      variables: { id: postId },
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
                .then(() => setModalOpen(false))
                .finally(() => setLoading(false));
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

export default DeleteButton;
