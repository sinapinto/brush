import React, { useState } from 'react'
import Card from '../../components/Card'
import { H2 } from '../../components/Text'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import { createPost } from '../../fetch/post'
import styles from './index.module.css'

export default function Create() {
  let [title, setTitle] = useState('')
  let [body, setBody] = useState('')
  let [isFetching, setIsFetching] = useState(false)
  let [error, setError] = useState()

  let handleSubmit = (e) => {
    e.preventDefault()
    createPost(title, body)
      .then(() => {
      })
      .catch((err) => {
        setError(typeof err === 'string' ? err : 'An unknown error occured.')
        setIsFetching(false)
      })
  }

  return (
    <Card>
      <form className={styles.form} onSubmit={handleSubmit}>
        <H2>Create</H2>
        <TextInput placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextInput placeholder="Bodyy" value={body} onChange={(e) => setBody(e.target.value)} />
        <p className={styles.error}>{error}</p>
        <Button type="primary" htmlType="submit" disabled={isFetching}>Create</Button>
      </form>
    </Card>
  );
}

Create.propTypes = {
}
