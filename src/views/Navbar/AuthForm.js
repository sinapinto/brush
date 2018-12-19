import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'

import { loginUser, registerUser } from '../../graphql/mutations/user'
import { Input, ErrorMessage } from '../../components/globals'
import { Button } from '../../components/Button'
import { MODAL_CLOSED, MODAL_LOGIN, MODAL_SIGNUP } from './constants'
import { Form } from './style'

function AuthForm({ type, onSuccess, loginUser, registerUser }) {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [isLoading, setIsLoading] = useState(false)
  let [error, setError] = useState('')

  let handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    let mutate = type === MODAL_LOGIN ? loginUser : registerUser
    mutate({ username, password })
      .then(data => {
        setIsLoading(false)
        setError('')
        onSuccess()
        // TODO: get rid of this
        window.location.reload()
      })
      .catch(e => {
        if (e.graphQLErrors) {
          setError(e.graphQLErrors[0].message)
        } else {
          setError('uknown error')
        }
        setIsLoading(false)
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
        disabled={isLoading}
        autoComplete="off"
      />
      <Input
        placeholder="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        disabled={isLoading}
      />
      <ErrorMessage>{error}</ErrorMessage>
      <Button
        type="primary"
        htmlType="submit"
        disabled={isLoading || !username || !password}
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
