import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { Input, ErrorMessage } from '../../components/globals'
import { Button } from '../../components/Button'
import { Form } from './style'
import { loginUserMutation } from '../../graphql/mutations/user'
import { meQuery } from '../../graphql/queries/user'

export default function LoginForm({ onSuccess }) {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  let handleSubmit = (e, login) => {
    e.preventDefault()
    login({ variables: { username, password } })
  }

  let handleChange = e => {
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else if (e.target.name === 'username') {
      setUsername(e.target.value)
    }
  }

  return (
    <Mutation
      mutation={loginUserMutation}
      refetchQueries={[{ query: meQuery }]}
    >
      {(login, { data, loading, error }) => (
        <Form onSubmit={e => handleSubmit(e, login)} onChange={handleChange}>
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
          <ErrorMessage>{error || ''}</ErrorMessage>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading || !username || !password}
          >
            Log In
          </Button>
        </Form>
      )}
    </Mutation>
  )
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}
