import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { MdEdit as EditIcon } from 'react-icons/md';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import styled from 'styled-components';
import { CTAButton, TextButton } from '../../components/Button';
import { H1, SpacedContent } from '../../components/globals';
import { TextEditor } from '../../components/TextEditor';
import { editPostMutation } from '../../graphql/mutations/post';
import { GetPostById_getPost } from '../../graphql/queries/__generated__/GetPostById';
import { Author } from '../../partials/Author';
import { TagList } from '../../partials/TagList';
import { useCurrentUser } from '../../utils/useCurrentUser';
import { DeleteButton } from './DeleteButton';
import { iconStyles } from './styles';

type PostProps = {
  post: GetPostById_getPost;
};

const Post = ({ post }: PostProps) => {
  const { currentUser } = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editorValue, setEditorValue] = useState(() =>
    Value.fromJSON(JSON.parse(post.body))
  );
  const editPost = useMutation(editPostMutation);

  const isAuthor = currentUser && currentUser.id === post.author.id;

  const handleSave = () => {
    editPost({
      variables: {
        input: {
          id: post.id,
          body: JSON.stringify(editorValue.toJSON()),
          rawBody: Plain.serialize(editorValue),
        },
      },
    }).then(() => setIsEditing(false));
  };

  return (
    <SpacedContent m={3}>
      <HeaderWrap>
        <H1 i>{post.title}</H1>
        {isAuthor && (
          <ButtonWrap>
            {isEditing ? (
              <>
                <CancelButton onClick={() => setIsEditing(false)}>
                  Cancel
                </CancelButton>
                <SaveButton onClick={() => handleSave()}>Save</SaveButton>
              </>
            ) : (
              <>
                <DeleteButton postId={post.id} />
                <EditButton onClick={() => setIsEditing(true)} />
              </>
            )}
          </ButtonWrap>
        )}
      </HeaderWrap>
      <TextEditor
        readOnly={!isEditing}
        value={editorValue}
        onChange={({ value }: any) => {
          setEditorValue(value);
        }}
      />
      <TagList categories={post.categories} />
      <Author user={post.author} />
    </SpacedContent>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > svg:not(:last-child) {
    margin-right: 8px;
  }
`;

const EditButton = styled(EditIcon)`
  ${iconStyles}
`;

const CancelButton = styled(TextButton)`
  padding: 4px 24px;
`;

const SaveButton = styled(CTAButton)`
  padding: 4px 24px;
`;

export default Post;
