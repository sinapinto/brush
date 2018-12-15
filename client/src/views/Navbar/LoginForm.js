import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { login } from '../../fetch/auth'

export let ErrorMessage = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.warn.default};
  text-align: center;
`

export default function LoginForm({ className, onSuccess }) {
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
    <form className={className} onSubmit={handleSubmit} onChange={handleChange} >
      <TextInput
        placeholder="Username"
        name="username"
        disabled={isFetching}
        autoComplete="off"
      />
      <TextInput
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
    </form>
  )
}

LoginForm.propTypes = {
  className: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
}

LoginForm.defaultProps = {
  className: null,
}
