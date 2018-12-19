import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Modal from '../../components/Modal'
import AuthForm from './AuthForm'
import { TextButton } from '../../components/Button'
import { P, H2 } from '../../components/globals'
import { MODAL_CLOSED, MODAL_LOGIN, MODAL_SIGNUP } from './constants'

let Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  ${P} {
    margin: 16px 0;
  }
`

export default function AuthModal({
  isOpen,
  onRequestClose,
  type,
  onChangeType,
  onSuccess,
}) {
  let title = type === MODAL_LOGIN ? 'Log In' : 'Sign Up'
  let subtitle =
    type === MODAL_LOGIN ? "Don't have an account?" : 'Already have an account?'
  let otherType = type === MODAL_LOGIN ? MODAL_SIGNUP : MODAL_LOGIN
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Container>
        <H2>{title}</H2>
        <P>
          {subtitle}
          <TextButton onClick={() => onChangeType(otherType)}>
            {title}
          </TextButton>
        </P>
        <AuthForm type={type} onSuccess={onSuccess} />
      </Container>
    </Modal>
  )
}

AuthModal.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  type: PropTypes.oneOf([MODAL_CLOSED, MODAL_SIGNUP, MODAL_LOGIN]).isRequired,
  onChangeType: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
}
