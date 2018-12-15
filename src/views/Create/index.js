import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, H2, Card, ErrorMessage } from '../../components/globals'
import { Button } from '../../components/Button'
import { createPost } from '../../fetch/post'

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
  let [isFetching, setIsFetching] = useState(false)
  let [error, setError] = useState()

  let handleSubmit = (e) => {
    e.preventDefault()
    createPost(title, body)
      .catch((err) => {
        setError(typeof err === 'string' ? err : 'An unknown error occured.')
        setIsFetching(false)
      })
  }

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <H2>Create</H2>
        <Input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input type="text" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
        <ErrorMessage>{error}</ErrorMessage>
        <Button type="primary" htmlType="submit" disabled={isFetching}>Create</Button>
      </Form>
    </Card>
  );
}
