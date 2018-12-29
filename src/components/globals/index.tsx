import React from 'react';
import styled, { keyframes } from 'styled-components';
import theme from '../../styles/theme';

export const H1 = styled(({ i, ...rest }) => <h1 {...rest} />)`
  color: ${theme.text.secondary};
  font-weight: 700;
  font-size: 38px;
  line-height: 46px;
  ${({ i }) => i && 'font-style: italic;'}
`;

export const H2 = styled(({ i, ...rest }) => <h2 {...rest} />)`
  color: ${theme.text.secondary};
  font-weight: 700;
  font-size: 30px;
  line-height: 38px;
  ${({ i }) => i && 'font-style: italic;'}
`;

export const H3 = styled(({ i, ...rest }) => <h3 {...rest} />)`
  color: ${theme.text.secondary};
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  ${({ i }) => i && 'font-style: italic;'}
`;

export const H4 = styled(({ i, ...rest }) => <h4 {...rest} />)`
  color: ${theme.text.secondary};
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  ${({ i }) => i && 'font-style: italic;'}
`;

export const BlankSlate = styled(H4)`
  text-align: center;
  color: ${theme.text.placeholder};
  margin: 48px 0;
  font-style: italic;
`;

export const P = styled.p`
  color: ${theme.text.default};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

export const Card = styled.div<{ p?: number }>`
  background: #fff;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  padding: ${({ p = 3 }) => `${p * 8}px`};
  margin: 0;
`;

export const Input = styled.input`
  border: 0;
  border-bottom: 2px solid #c4c4c4;
  color: ${theme.text.default};
  font-size: 22px;
  line-height: 26px;
  padding: 8px 0;

  &[disabled] {
    opacity: 0.8;
    background: none;
    cursor: not-allowed;
    user-select: none;
  }

  :focus {
    outline: 0;
    border-bottom-color: ${theme.brand.default};
  }

  &::-webkit-input-placeholder {
    color: ${theme.text.placeholder};
  }
  &:-moz-placeholder {
    color: ${theme.text.placeholder};
  }
  &:-ms-input-placeholder {
    color: ${theme.text.placeholder};
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: ${theme.text.inactive};
`;

export const ErrorMessage = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.warn.default};
  text-align: center;
`;

type SpinnerProps = {
  size?: 'small' | 'large'; // "large" by default
};

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.span<SpinnerProps>`
  width: ${props => (props.size === 'small' ? '42px' : '64px')};
  height: ${props => (props.size === 'small' ? '42px' : '64px')};
  :after {
    content: ' ';
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: ${props => (props.size === 'small' ? '-21px' : '-42px')};
    margin-left: ${props => (props.size === 'small' ? '-21px' : '-42px')};
    width: ${props => (props.size === 'small' ? '24px' : '46px')};
    height: ${props => (props.size === 'small' ? '24px' : '46px')};
    border-radius: 50%;
    border-width: ${props => (props.size === 'small' ? '3px' : '6px')};
    border-style: solid;
    border-color: ${theme.brand.default} transparent ${theme.brand.default}
      transparent;
    animation: ${spin} 2s linear infinite;
  }
`;

export const SpacedContent = styled(({ f = 1, ...rest }) => <div {...rest} />)`
  > * {
    margin-top: ${({ f }) => f * 8}px;
    margin-bottom: ${({ f }) => f * 8}px;

    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
