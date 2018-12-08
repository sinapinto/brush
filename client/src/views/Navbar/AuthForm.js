import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button'
import H from '../../components/H'
import { modalState } from './constant'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import styles from './AuthForm.module.css'

export default function AuthForm({ type, onChangeType, onSuccess }) {
  return type === modalState.LOGIN ? (
    <section className={styles.container}>
      <H level={2}>Log In</H>
      <p className={styles.p}>
        Don&apos;t have an account?
        <Button
          className={styles.btn}
          onClick={() => onChangeType(modalState.SIGNUP)}
        >
          Sign Up
        </Button>
      </p>
      <LoginForm className={styles.form} />
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
      <SignupForm className={styles.form} onSuccess={onSuccess} />
    </section>
  )
}

AuthForm.propTypes = {
  type: PropTypes.oneOf(Object.values(modalState)).isRequired,
  onChangeType: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
}

