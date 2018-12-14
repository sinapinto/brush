import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button'
import { H2 } from '../../components/Text'
import { MODAL_CLOSED, MODAL_LOGIN, MODAL_SIGNUP } from './constants'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import styles from './AuthForm.module.css'

export default function AuthForm({ type, onChangeType, onSuccess }) {
  return type === MODAL_LOGIN ? (
    <div className={styles.container}>
      <H2>Log In</H2>
      <p className={styles.p}>
        Don't have an account?
        <Button
          className={styles.btn}
          onClick={() => onChangeType(MODAL_SIGNUP)}
        >
          Sign Up
        </Button>
      </p>
      <LoginForm className={styles.form} onSuccess={onSuccess} />
    </div>
  ) : (
    <div className={styles.container}>
      <H2>Sign Up</H2>
      <p className={styles.p}>
        Already have an account?
        <Button
          className={styles.btn}
          onClick={() => onChangeType(MODAL_LOGIN)}
        >
          Log In
        </Button>
      </p>
      <SignupForm className={styles.form} onSuccess={onSuccess} />
    </div>
  )
}

AuthForm.propTypes = {
  type: PropTypes.oneOf([MODAL_CLOSED, MODAL_SIGNUP, MODAL_LOGIN]).isRequired,
  onChangeType: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
}
