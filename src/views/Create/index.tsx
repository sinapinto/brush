import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

import { Input, H2, Card, ErrorMessage } from '../../components/globals';
import { Button } from '../../components/Button';
import { createPostMutation } from '../../graphql/mutations/post';
import { getPostsQuery } from '../../graphql/queries/post';
import {
  CreatePost,
  CreatePostVariables,
} from '../../graphql/mutations/__generated__/CreatePost';

class CreatePostMutation extends Mutation<CreatePost, CreatePostVariables> {}

const Create: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  let [title, setTitle] = useState('');
  let [body, setBody] = useState('');

  let handleSubmit = (e: React.FormEvent<HTMLFormElement>, createPost: any) => {
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
        update={(proxy, response: any) => {
          let data;
          try {
            data = proxy.readQuery({ query: getPostsQuery });
          } catch (e) {
            // have never run `getPostsQuery` before
            return;
          }
          if (response.data) {
            data.getPosts.posts.unshift(response.data.createPost);
            proxy.writeQuery({ query: getPostsQuery, data });
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
            <Button type="primary" disabled={loading}>
              Create
            </Button>
          </Form>
        )}
      </CreatePostMutation>
    </Card>
  );
};

let Form = styled.form`
  padding: 24px;
  display: flex;
  flex-flow: column nowrap;
  > * {
    margin-bottom: 32px;
  }
`;

export default withRouter(Create);
