import { shade } from 'polished';
import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

type ModalProps = {
  hasCloseButton?: boolean;
  onRequestClose: () => void;
  isOpen: boolean;
};

const appRoot = document.getElementById('app-root') as HTMLElement;

export const Modal: React.FunctionComponent<ModalProps> = ({
  children,
  hasCloseButton = true,
  ...otherProps
}) => {
  return (
    <ReactModal
      {...otherProps}
      appElement={appRoot}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.4)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          overflowX: 'none',
          overflowY: 'auto',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          border: '0',
          borderRadius: '16px',
          padding: '16px',
        },
      }}
    >
      <Toolbar>
        {hasCloseButton && (
          <CloseButton onClick={otherProps.onRequestClose}>{'×'}</CloseButton>
        )}
      </Toolbar>
      <ModalContent>{children}</ModalContent>
    </ReactModal>
  );
};

const CloseButton = styled.button`
  background: none;
  cursor: pointer;
  font-size: 32px;
  line-height: 15px;
  font-weight: 500;
  color: ${theme.text.alt};
  user-select: none;
  :hover {
    color: ${shade(0.05, theme.text.alt)};
  }
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 30px;
`;

const ModalContent = styled.div`
  padding: 0 16px 16px;
`;
