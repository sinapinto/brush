import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'

import { loginUser, registerUser } from '../../graphql/mutations/user'
import { Input, ErrorMessage } from '../../components/globals'
import { Button } from '../../components/Button'
import { MODAL_CLOSED, MODAL_LOGIN, MODAL_SIGNUP } from './constants'
import { Form } from './style'

function AuthForm({ type, loading, onSuccess, loginUser, registerUser }) {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  let handleSubmit = e => {
    e.preventDefault()
    let mutate = type === MODAL_LOGIN ? loginUser : registerUser
    mutate({ username, password }).then(() => {
      onSuccess()
      // TODO: get rid of this
      window.location.reload()
    })
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
        {type === MODAL_LOGIN ? 'Log In' : 'Sign Up'}
      </Button>
    </Form>
  )
}

AuthForm.propTypes = {
  type: PropTypes.oneOf([MODAL_CLOSED, MODAL_SIGNUP, MODAL_LOGIN]).isRequired,
  onSuccess: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
}

export default compose(
  loginUser,
  registerUser
)(AuthForm)
