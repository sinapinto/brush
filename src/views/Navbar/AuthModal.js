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
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Container>
        <H2>{type === MODAL_LOGIN ? 'Log In' : 'Sign Up'}</H2>
        <P>
          {type === MODAL_LOGIN
            ? "Don't have an account?"
            : 'Already have an account?'}
          <TextButton
            onClick={() =>
              onChangeType(type === MODAL_LOGIN ? MODAL_SIGNUP : MODAL_LOGIN)
            }
          >
            {type === MODAL_LOGIN ? 'Sign Up' : 'Log In'}
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
