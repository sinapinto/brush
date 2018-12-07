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
  let handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit', username, password);
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
      <TextInput placeholder="Username" name="username" />
      <TextInput
        placeholder="Password"
        name="password"
        type="password"
        autoComplete=""
      />
      <Button type="primary" htmlType="submit">Submit</Button>
    </form>
  )
}
