import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../../components/Button'
import { Input, ErrorMessage } from '../../components/globals'
import { signup } from '../../fetch/auth'
import { Form } from './style'

export default function SignupForm({ onSuccess }) {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [isFetching, setIsFetching] = useState(false)
  let [error, setError] = useState()

  let handleSubmit = e => {
    e.preventDefault()
    setIsFetching(true)
    signup(username, password)
      .then(user => {
        onSuccess(user)
      })
      .catch(err => {
        setError(typeof err === 'string' ? err : 'An unknown error occured.')
        setIsFetching(false)
      })
  }

  let handleChange = e => {
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
        Sign Up
      </Button>
    </Form>
  )
}

SignupForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}
