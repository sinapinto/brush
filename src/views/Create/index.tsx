import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Input, H2, Card, ErrorMessage } from '../../components/globals';
import { getPostsQuery } from '../../graphql/queries/post';
import { Button } from '../../components/Button';
import {
  CreatePostMutation,
  createPostMutation,
} from '../../graphql/mutations/post';

interface Props {
  history: any;
}

function Create({ history }: Props) {
  let [title, setTitle] = useState('');
  let [body, setBody] = useState('');
  let [isLoading, setIsLoading] = useState(false);

  let handleSubmit = (e: React.FormEvent<HTMLFormElement>, mutate: any) => {
    setIsLoading(true);
    e.preventDefault();
    mutate({
      variables: {
        title,
        body,
      },
      // update: (proxy, response: { data: Response }) => {
      //   let data;
      //   try {
      //     data = proxy.readQuery({ query: getPostsQuery });
      //   } catch (e) {
      //     // have never run `getPostsQuery` before
      //     return;
      //   }
      //   data.getPosts.posts.unshift(response.data.createPost);
      //   proxy.writeQuery({ query: getPostsQuery, data });
      // },
    }).then(({ data }: any) => {
      setIsLoading(false);
      history.push(`/p/${data.createPost.id}`);
    });
  };

  return (
    <Card>
      <CreatePostMutation mutation={createPostMutation}>
        {mutate => (
          <Form onSubmit={e => handleSubmit(e, mutate)}>
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
            <ErrorMessage>{''}</ErrorMessage>
            <Button type="primary" disabled={isLoading}>
              Create
            </Button>
          </Form>
        )}
      </CreatePostMutation>
    </Card>
  );
}

let Form = styled.form`
  padding: 24px;
  display: flex;
  flex-flow: column nowrap;
  > * {
    margin-bottom: 32px;
  }
`;

export default withRouter(Create);
