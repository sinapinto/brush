import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { theme } from '../../styles/theme';
import { placeholder } from '../../utils/css';


const headerStyles = css`
  color: ${theme.text.secondary};
  font-weight: 700;
  ${({ i }: { i: boolean }) => i && 'font-style: italic;'}
`;

export const H1 = styled(({ i, ...rest }) => <h1 {...rest} />)`
  font-size: 38px;
  line-height: 46px;
  ${headerStyles}
`;

export const H2 = styled(({ i, ...rest }) => <h2 {...rest} />)`
  font-size: 30px;
  line-height: 38px;
  ${headerStyles}
`;

export const H3 = styled(({ i, ...rest }) => <h3 {...rest} />)`
  font-size: 24px;
  line-height: 32px;
  ${headerStyles}
`;

export const H4 = styled(({ i, ...rest }) => <h4 {...rest} />)`
  font-size: 20px;
  line-height: 28px;
  ${headerStyles}
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
  ${placeholder()}
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
    border-color: ${theme.brand.alt} transparent ${theme.brand.alt} transparent;
    animation: ${spin} 2s linear infinite;
  }
`;

export const SpacedContent = styled(({ m = 1, ...rest }) => <div {...rest} />)`
  > * {
    margin-top: ${({ m }) => m * 8}px;
    margin-bottom: ${({ m }) => m * 8}px;

    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`;
