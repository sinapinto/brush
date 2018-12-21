import React, { useState } from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Input, H2, Card, ErrorMessage } from '../../components/globals';
import { Button } from '../../components/Button';
import { createPost } from '../../graphql/mutations/post';

interface Props {
  history: any;
  createPost: any;
}

function Create({ history, createPost }: Props) {
  let [title, setTitle] = useState('');
  let [body, setBody] = useState('');
  let [isLoading, setIsLoading] = useState(false);

  let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    createPost({ title, body }).then(({ data }: any) => {
      setIsLoading(false);
      history.push(`/p/${data.createPost.id}`);
    });
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
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

export default compose(
  withRouter,
  createPost
)(Create);
