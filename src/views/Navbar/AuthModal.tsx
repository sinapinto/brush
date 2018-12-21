import React from 'react';
import styled from 'styled-components';

import Modal from '../../components/Modal';
import AuthForm from './AuthForm';
import { TextButton } from '../../components/Button';
import { P, H2 } from '../../components/globals';
import { MODAL_LOGIN, MODAL_SIGNUP } from './constants';

interface Props {
  type: string;
  onChangeType: (t: string) => void;
  onRequestClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({
  isOpen,
  onRequestClose,
  type,
  onChangeType,
  onSuccess,
}: Props & ReactModal.Props) {
  let title = type === MODAL_LOGIN ? 'Log In' : 'Sign Up';
  let subtitle =
    type === MODAL_LOGIN
      ? "Don't have an account?"
      : 'Already have an account?';
  let otherType = type === MODAL_LOGIN ? MODAL_SIGNUP : MODAL_LOGIN;
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Container>
        <H2>{title}</H2>
        <P>
          {subtitle}
          <TextButton onClick={() => onChangeType(otherType)}>
            {type === MODAL_LOGIN ? 'Sign Up' : 'Log In'}
          </TextButton>
        </P>
        <AuthForm type={type} onSuccess={onSuccess} />
      </Container>
    </Modal>
  );
}

let Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  ${P} {
    margin: 16px 0;
  }
`;
