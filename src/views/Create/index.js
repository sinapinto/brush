import React, { useState } from 'react'
import { Mutation } from 'apollo-react'
import styled from 'styled-components'
import { Input, H2, Card, ErrorMessage } from '../../components/globals'
import { Button } from '../../components/Button'
import { createPostMutation } from '../../graphql/mutations/post'

let Form = styled.form`
  padding: 24px;
  display: flex;
  flex-flow: column nowrap;

  > * {
    margin-bottom: 32px;
  }
`

export default function Create() {
  let [title, setTitle] = useState('')
  let [body, setBody] = useState('')

  let handleSubmit = (e, createPost) => {
    e.preventDefault()
    createPost({ variables: { title, body } })
  }

  return (
    <Mutation mutation={createPostMutation}>
      {(createPost, { error, loading }) => (
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
            <ErrorMessage>{error}</ErrorMessage>
            <Button type="primary" htmlType="submit" disabled={loading}>
              Create
            </Button>
          </Form>
        </Card>
      )}
    </Mutation>
  )
}
