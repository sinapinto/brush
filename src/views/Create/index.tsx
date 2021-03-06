import React, { useState } from 'react';
import { FetchResult, Mutation, MutationFn } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import styled from 'styled-components';
import { CTAButton } from '../../components/Button';
import { Card, ErrorMessage, Input } from '../../components/globals';
import { TextEditor } from '../../components/TextEditor';
import { createPostMutation } from '../../graphql/mutations/post';
import {
  CreatePost,
  CreatePostVariables,
} from '../../graphql/mutations/__generated__/CreatePost';
import { getPostsQuery } from '../../graphql/queries/post';
import { GetPosts } from '../../graphql/queries/__generated__/GetPosts';
import { useTitle } from '../../utils/useTitle';
import { TagSelect } from './TagSelect';

class CreatePostMutation extends Mutation<CreatePost, CreatePostVariables> {}

const Create: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState(() => getInitialTitle());
  const [editorValue, setEditorValue] = useState(() => getInitialEditorValue());
  useTitle('Create');

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    createPost: MutationFn<CreatePost, CreatePostVariables>
  ) => {
    e.preventDefault();
    createPost({
      variables: {
        input: {
          title,
          body: JSON.stringify(editorValue.toJSON()),
          rawBody: Plain.serialize(editorValue),
          categories: tags,
        },
      },
    }).then(result => {
      if (result && result.data && result.data.createPost) {
        history.push(`/p/${result.data.createPost.id}`);
      } else {
        console.warn('response missing post id', result);
        history.push('/');
      }
    });
  };

  return (
    <Card>
      <CreatePostMutation
        mutation={createPostMutation}
        update={(proxy, response: FetchResult) => {
          localStorage.removeItem('draft');
          localStorage.removeItem('title');
          try {
            const data = proxy.readQuery<GetPosts>({
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
              onChange={e => {
                setTitle(e.target.value);
                localStorage.setItem('title', e.target.value);
              }}
            />
            <TextEditor
              placeholder="Start writing..."
              value={editorValue}
              onChange={({ value }: any) => {
                // Check to see if the document has changed before saving.
                if (value.document !== editorValue.document) {
                  const content = JSON.stringify(value.toJSON());
                  localStorage.setItem('draft', content);
                }
                setEditorValue(value);
              }}
            />
            <TagSelect onChange={tags => setTags(tags)} />
            <ErrorMessage>{error && JSON.stringify(error)}</ErrorMessage>
            <CTAButton type="submit" disabled={loading || !title}>
              Create
            </CTAButton>
          </Form>
        )}
      </CreatePostMutation>
    </Card>
  );
};

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  font-size: 20px;
  line-height: 28px;
  > *:not(:last-child) {
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

const getInitialTitle = () => {
  return localStorage.getItem('title') || '';
};

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
