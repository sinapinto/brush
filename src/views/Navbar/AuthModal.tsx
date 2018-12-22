import React from 'react';
import styled from 'styled-components';

import Modal from '../../components/Modal';
import AuthForm from './AuthForm';
import { TextButton } from '../../components/Button';
import { P, H2 } from '../../components/globals';

interface Props {
  type: ModalType;
  onChangeType: (t: ModalType) => void;
  onRequestClose: () => void;
  onSuccess: () => void;
}

export enum ModalType {
  Closed,
  Login,
  Signup,
}

export default function AuthModal({
  isOpen,
  onRequestClose,
  type,
  onChangeType,
  onSuccess,
}: Props & ReactModal.Props) {
  let title = type === ModalType.Login ? 'Log In' : 'Sign Up';
  let subtitle =
    type === ModalType.Login
      ? "Don't have an account?"
      : 'Already have an account?';
  let otherType = type === ModalType.Login ? ModalType.Signup : ModalType.Login;
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Container>
        <H2>{title}</H2>
        <P>
          {subtitle}
          <TextButton onClick={() => onChangeType(otherType)}>
            {type === ModalType.Login ? 'Sign Up' : 'Log In'}
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
