import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'

import { loginUser } from '../../graphql/mutations/user'
import { getCurrentUser } from '../../graphql/queries/user'
import { Input, ErrorMessage } from '../../components/globals'
import { Button } from '../../components/Button'
import { Form } from './style'

function LoginForm({ loading, onSuccess, currentUser, loginUser }) {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  let handleSubmit = e => {
    e.preventDefault()
    loginUser({ username, password })
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
        Log In
      </Button>
    </Form>
  )
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
}

export default compose(
  loginUser,
  getCurrentUser
)(LoginForm)
