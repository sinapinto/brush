import React from 'react';
import styled from 'styled-components';
import { TextButton } from '../../components/Button';
import { H2, P } from '../../components/globals';
import { Modal } from '../../components/Modal';
import { theme } from '../../styles/theme';
import { AuthForm } from './AuthForm';

interface AuthModalProps {
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

export const AuthModal = ({
  isOpen,
  onRequestClose,
  type,
  onChangeType,
  onSuccess,
}: AuthModalProps & ReactModal.Props) => {
  const title = type === ModalType.Login ? 'Log In' : 'Sign Up';
  const subtitle =
    type === ModalType.Login
      ? "Don't have an account?"
      : 'Already have an account?';
  const otherType =
    type === ModalType.Login ? ModalType.Signup : ModalType.Login;
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Container>
        <H2 i>{title}</H2>
        <P>
          {subtitle}
          <TextButton onClick={() => onChangeType(otherType)}>
            {type === ModalType.Login ? 'Sign Up' : 'Log In'}
          </TextButton>
        </P>
        <AuthForm key={type} type={type} onSuccess={onSuccess} />
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  ${P} {
    margin: 16px 0;
    font-style: italic;
    color: ${theme.text.alt};
  }
`;
