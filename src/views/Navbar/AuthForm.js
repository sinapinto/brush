import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { TextButton } from '../../components/Button'
import { P, H2 } from '../../components/globals'
import { MODAL_CLOSED, MODAL_LOGIN, MODAL_SIGNUP } from './constants'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

let Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  ${P} {
    margin: 16px 0;
  }
`

export default function AuthForm({ type, onChangeType, onSuccess }) {
  return type === MODAL_LOGIN ? (
    <Container>
      <H2>Log In</H2>
      <P>
        Don't have an account?
        <TextButton onClick={() => onChangeType(MODAL_SIGNUP)}>Sign Up</TextButton>
      </P>
      <LoginForm onSuccess={onSuccess} />
    </Container>
  ) : (
    <Container>
      <H2>Sign Up</H2>
      <P>
        Already have an account?
        <TextButton onClick={() => onChangeType(MODAL_LOGIN)}>Log In</TextButton>
      </P>
      <SignupForm onSuccess={onSuccess} />
    </Container>
  )
}

AuthForm.propTypes = {
  type: PropTypes.oneOf([MODAL_CLOSED, MODAL_SIGNUP, MODAL_LOGIN]).isRequired,
  onChangeType: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
}
