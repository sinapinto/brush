import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { Button } from '../../components/Button'
import { Input, ErrorMessage } from '../../components/globals'
import { Form } from './style'
import { registerUserMutation } from '../../graphql/mutations/user'
import { meQuery } from '../../graphql/queries/user'

export default function SignupForm({ onSuccess }) {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  let handleSubmit = (e, register) => {
    e.preventDefault()
    register({ variables: { username, password } })
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
      mutation={registerUserMutation}
      refetchQueries={[{ query: meQuery }]}
    >
      {(register, { data, loading, error }) => (
        <Form onSubmit={e => handleSubmit(e, register)} onChange={handleChange}>
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
            Sign Up
          </Button>
        </Form>
      )}
    </Mutation>
  )
}

SignupForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}
