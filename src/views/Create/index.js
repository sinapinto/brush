import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Input, H2, Card, ErrorMessage } from '../../components/globals';
import { Button } from '../../components/Button';
import { createPost } from '../../graphql/mutations/post';

let Form = styled.form`
  padding: 24px;
  display: flex;
  flex-flow: column nowrap;

  > * {
    margin-bottom: 32px;
  }
`;

function Create({ history, createPost }) {
  let [title, setTitle] = useState('');
  let [body, setBody] = useState('');
  let [isLoading, setIsLoading] = useState(false);

  let handleSubmit = (e, createPost) => {
    setIsLoading(true);
    e.preventDefault();
    createPost({ title, body }).then(({ data }) => {
      setIsLoading(false);
      history.push(`/p/${data.createPost.id}`);
    });
  };

  return (
    <Card>
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
        <ErrorMessage>{''}</ErrorMessage>
        <Button type="primary" htmlType="submit" disabled={isLoading}>
          Create
        </Button>
      </Form>
    </Card>
  );
}

Create.propTypes = {
  createPost: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default compose(
  withRouter,
  createPost
)(Create);
