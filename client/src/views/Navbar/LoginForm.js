import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input } from '../../components/globals'
import { Button } from '../../components/Button'
import { Form, ErrorMessage } from './style'
import { login } from '../../fetch/auth'

export default function LoginForm({ onSuccess }) {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [isFetching, setIsFetching] = useState(false)
  let [error, setError] = useState()

  let handleSubmit = (e) => {
    e.preventDefault()
    setIsFetching(true)
    login(username, password)
      .then((user) => {
        onSuccess(user)
      })
      .catch((err) => {
        setError(typeof err === 'string' ? err : 'An unknown error occured.')
        setIsFetching(false)
      })
  }

  let handleChange = (e) => {
    setError(null)
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else if (e.target.name === 'username') {
      setUsername(e.target.value)
    }
  }

  return (
    <Form onSubmit={handleSubmit} onChange={handleChange}>
      <Input
        type="text"
        placeholder="Username"
        spellCheck={false}
        name="username"
        disabled={isFetching}
        autoComplete="off"
      />
      <Input
        placeholder="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        disabled={isFetching}
      />
      <ErrorMessage>{error || ''}</ErrorMessage>
      <Button
        type="primary"
        htmlType="submit"
        disabled={isFetching || !username || !password}
      >
        Log In
      </Button>
    </Form>
  )
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}
