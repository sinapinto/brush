import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import styles from './LoginForm.module.css'

export default function SignupForm({ className }) {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [error, setError] = useState()
  let [isFetching, setIsFetching] = useState(false)

  let handleSubmit = (e) => {
    e.preventDefault()
    setIsFetching(true)

    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        }
      }),
    })
      .then((res) => {
        return res.json()
          .then((json) => {
            if (!res.ok) {
              let errors = Object.values(json.errors)[0]
              return Promise.reject(Array.isArray(errors) ? errors[0] : '')
            }
            return json
          })
      })
      .then((res) => {
        setIsFetching(false)
      })
      .catch((err) => {
        setError(typeof err === 'string' ? err : 'An unknown error occured.')
        setIsFetching(false)
      })
  }

  let handleChange = (e) => {
    // clear any errors
    setError(null)
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    } else if (e.target.name === 'username') {
      setUsername(e.target.value)
    }
  }

  return (
    <form className={className} onSubmit={handleSubmit} onChange={handleChange}>
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
      <p className={styles.error}>{error || ''}</p>
      <Button
        type="primary"
        htmlType="submit"
        disabled={isFetching || !username || !password}
      >
        Sign Up
      </Button>
    </form>
  )
}

SignupForm.propTypes = {
  className: PropTypes.string,
}

SignupForm.defaultProps = {
  className: null,
}
