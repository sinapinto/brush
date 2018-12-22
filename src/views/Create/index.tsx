import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Mutation, FetchResult } from 'react-apollo';
import styled from 'styled-components';

import { Input, H2, Card, ErrorMessage } from '../../components/globals';
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
  const [body, setBody] = useState('');

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
        variables={{ input: { title, body } }}
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
            <H2>Create</H2>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Body"
              value={body}
              onChange={e => setBody(e.target.value)}
            />
            <ErrorMessage>{error && JSON.stringify(error)}</ErrorMessage>
            <CTAButton type="button" disabled={loading}>
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
  > * {
    margin-bottom: 32px;
  }
`;

export default withRouter(Create);
