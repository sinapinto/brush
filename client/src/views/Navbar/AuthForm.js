import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button'
import H from '../../components/H'
import TextInput from '../../components/TextInput'
import { modalState } from './constant'
import styles from './AuthForm.module.css'

export default function AuthForm({ type, onChangeType }) {
  return type === modalState.LOGIN ? (
    <section className={styles.container}>
      <H level={2}>Log In</H>
      <p className={styles.p}>
        Don&apos;t have an account?
        <Button
          className={styles.btn}
          onClick={() => onChangeType(modalState.REGISTER)}
        >
          Sign Up
        </Button>
      </p>
      <LoginForm />
    </section>
  ) : (
    <section className={styles.container}>
      <H level={2}>Sign Up</H>
      <p className={styles.p}>
        Already have an account?
        <Button
          className={styles.btn}
          onClick={() => onChangeType(modalState.LOGIN)}
        >
          Log In
        </Button>
      </p>
      <RegisterForm />
    </section>
  )
}

AuthForm.propTypes = {
  type: PropTypes.oneOf(Object.values(modalState)).isRequired,
  onChangeType: PropTypes.func.isRequired,
}

function LoginForm() {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [isFetching, setIsFetching] = useState(false)
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
    <form className={styles.form} onSubmit={handleSubmit} onChange={handleChange} >
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
      <Button type="primary" htmlType="submit">Log In</Button>
    </form>
  )
}

function RegisterForm() {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [error, setError] = useState()
  let [isFetching, setIsFetching] = useState(false)

  let handleSubmit = (e) => {
    e.preventDefault()
    setIsFetching(true)

    fetch('/api/users', {
      method: 'POST',
      body: {
        username,
        password,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.errors.name)
        }
        setIsFetching(false)
      })
      .catch((err) => {
        setError(err.message || 'An unknown error occured.')
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
    <form className={styles.form} onSubmit={handleSubmit} onChange={handleChange} >
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
