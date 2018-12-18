import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'

import { registerUser } from '../../graphql/mutations/user'
import { getCurrentUser } from '../../graphql/queries/user'
import { Button } from '../../components/Button'
import { Input, ErrorMessage } from '../../components/globals'
import { Form } from './style'

function SignupForm({ loading, onSuccess, currentUser, registerUser }) {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  let handleSubmit = e => {
    e.preventDefault()
    registerUser({ username, password })
  }

  let handleChange = e => {
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
        disabled={loading}
        autoComplete="off"
      />
      <Input
        placeholder="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        disabled={loading}
      />
      <ErrorMessage>{''}</ErrorMessage>
      <Button
        type="primary"
        htmlType="submit"
        disabled={loading || !username || !password}
      >
        Sign Up
      </Button>
    </Form>
  )
}

SignupForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
}

export default compose(
  registerUser,
  getCurrentUser
)(SignupForm)
