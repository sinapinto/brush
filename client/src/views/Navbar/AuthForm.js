import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../components/Button'
import H from '../../components/H'
import { modalState } from './constant'
import styles from './AuthForm.module.css'

export default function AuthForm({ type, onChangeType }) {
  return type === modalState.LOGIN ? (
    <section className={styles.form}>
      <H level={2}>Log In</H>
      <p>Already have an account?<Button onClick={() => onChangeType(modalState.REGISTER)}>Sign Up</Button></p>
    </section>
  ) : (
    <section className={styles.form}>
      <H level={2}>Sign Up</H>
      <p>Don&apos;t have an account?<Button onClick={() => onChangeType(modalState.LOGIN)}>Log In</Button></p>
    </section>
  )
}

AuthForm.propTypes = {
  type: PropTypes.oneOf(Object.values(modalState)).isRequired,
  onChangeType: PropTypes.func.isRequired,
}
