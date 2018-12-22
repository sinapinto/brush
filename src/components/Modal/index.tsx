import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import theme from '../../styles/theme';

type ModalProps = {
  children: React.ReactNode;
  hasCloseButton?: boolean;
  onRequestClose: () => void;
  isOpen: boolean;
};

const Modal: React.FunctionComponent<ModalProps> = ({
  children,
  hasCloseButton = true,
  ...otherProps
}) => {
  return (
    <ReactModal
      {...otherProps}
      appElement={document.getElementById('app-root') as HTMLElement}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          overflowX: 'none',
          overflowY: 'auto',
          boxShadow: '0 2px 5px rgba(0,0,0,0.06)',
          border: '0',
          borderRadius: '16px',
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

let CloseButton = styled.button`
  background: none;
  cursor: pointer;
  font-size: 32px;
  line-height: 15px;
  font-weight: 500;
  color: ${theme.text.secondary};

  :hover {
    filter: brightness(95%);
  }
`;

let Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 30px;
  padding: 15px 15px 0 15px;
`;

let ModalContent = styled.div`
  padding: 16px;
`;

export default Modal;
