import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Mutation, FetchResult } from 'react-apollo';
import styled from 'styled-components';
import { Value } from 'slate';

import TextEditor from './TextEditor';
import { Input, Card, ErrorMessage } from '../../components/globals';
import { CTAButton } from '../../components/Button';
import { createPostMutation } from '../../graphql/mutations/post';
import { getPostsQuery } from '../../graphql/queries/post';
import {
  CreatePost,
  CreatePostVariables,
} from '../../graphql/mutations/__generated__/CreatePost';
import { GetPosts } from '../../graphql/queries/__generated__/GetPosts';

class CreatePostMutation extends Mutation<CreatePost, CreatePostVariables> {}

const Create: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [title, setTitle] = useState('');
  const [editorValue, setEditorValue] = useState(() => getInitialEditorValue());

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    createPost: any
  ) => {
    e.preventDefault();
    createPost().then(({ data }: any) => {
      history.push(`/p/${data.createPost.id}`);
    });
  };

  return (
    <Card>
      <CreatePostMutation
        mutation={createPostMutation}
        variables={{
          input: { title, body: JSON.stringify(editorValue.toJSON()) },
        }}
        update={(proxy, response: FetchResult) => {
          try {
            const data: GetPosts | null = proxy.readQuery({
              query: getPostsQuery,
            });
            if (data && data.getPosts && response.data) {
              data.getPosts.posts.unshift(response.data.createPost);
              proxy.writeQuery({ query: getPostsQuery, data });
            }
          } catch (e) {
            // have never run `getPostsQuery` before
          }
        }}
      >
        {(createPost, { loading, error }) => (
          <Form onSubmit={e => handleSubmit(e, createPost)}>
            <TitleInput
              autoFocus
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <TextEditor
              placeholder="Start writing..."
              value={editorValue}
              onChange={({ value }: any) => {
                // Check to see if the document has changed before saving.
                if (value.document != editorValue.document) {
                  const content = JSON.stringify(value.toJSON());
                  localStorage.setItem('draft', content);
                }
                setEditorValue(value);
              }}
            />
            <ErrorMessage>{error && JSON.stringify(error)}</ErrorMessage>
            <CTAButton type="submit" disabled={loading}>
              Create
            </CTAButton>
          </Form>
        )}
      </CreatePostMutation>
    </Card>
  );
};

const Form = styled.form`
  padding: 24px;
  display: flex;
  flex-flow: column nowrap;
  font-size: 20px;
  line-height: 28px;
  > * {
    margin-bottom: 32px;
  }
`;

const TitleInput = styled(Input)`
  font-size: 38px;
  line-height: 46px;
  font-weight: 700;
  font-style: italic;
  border: none;
`;

const getInitialEditorValue = () => {
  const existingValue = JSON.parse(localStorage.getItem('draft') || 'null');
  const initialValue = Value.fromJSON(
    existingValue || {
      document: {
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: '',
                  },
                ],
              },
            ],
          },
        ],
      },
    }
  );
  return initialValue;
};

export default withRouter(Create);
