import React from 'react';
import { Mutation } from 'react-apollo';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';

import { deletePostMutation as MUTATION } from '../../graphql/mutations/post';
import {
  DeletePostVariables,
  DeletePost,
} from '../../graphql/mutations/__generated__/DeletePost';

class DeletePostMutation extends Mutation<DeletePost, DeletePostVariables> {}

type DeleteButtonProps = {
  postId: string;
};

const DeleteButton: React.FunctionComponent<DeleteButtonProps> = ({
  postId,
}) => {
  return (
    <DeletePostMutation mutation={MUTATION} variables={{ id: postId }}>
      {mutate => {
        return (
          <DeleteIcon
            onClick={e => {
              mutate().then(() => alert('deleted post!'));
            }}
          />
        );
      }}
    </DeletePostMutation>
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

export default DeleteButton;
