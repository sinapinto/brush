import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import styles from './LoginForm.module.css'

export default function LoginForm({ className }) {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [isFetching, setIsFetching] = useState(false)
  let [error, setError] = useState()

  let handleSubmit = (e) => {
    e.preventDefault()
  }
  let handleChange = (e) => {
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
        autoComplete="username"
      />
      <TextInput
        placeholder="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        disabled={isFetching}
      />
      <p className={styles.error}>{error || ''}</p>
      <Button type="primary" htmlType="submit">Log In</Button>
    </form>
  )
}

LoginForm.propTypes = {
  className: PropTypes.string,
}

LoginForm.defaultProps = {
  className: null,
}
