import styled from 'styled-components';
import { shade } from 'polished';

import theme from '../../styles/theme';
import { media } from '../../utils/css';

export const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px 12px;
  font-weight: 900;
  font-size: 15px;
  font-style: normal;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 8px;
  white-space: nowrap;
  background: ${theme.brand.default};
  color: ${theme.text.reverse};

  &[disabled] {
    background-color: ${theme.bg.inactive};
    color: ${theme.text.inactive};
    cursor: not-allowed;
  }

  :hover:not([disabled]) {
    color: ${shade(0.1, theme.text.reverse)};
  }

  > svg {
    margin-right: 4px;
  }

  ${media.phone`
    padding: 8px;
  `}
`;

export const OutlineButton = styled(Button)`
  background: transparent;
  border: 2px solid ${theme.brand.default};
  color: ${theme.brand.default};
  :hover:not([disabled]) {
    color: ${theme.brand.default};
    background: transparent;
  }
`;

export const TextButton = styled(OutlineButton)`
  border: none;
  padding: 0px 12px;
`;

export const DangerousButton = styled(Button)`
  background: ${theme.warn.default};
  :hover:not([disabled]) {
    background: ${shade(0.05, theme.warn.default)};
    color: ${theme.text.reverse};
  }
`;

export const CTAButton = styled(Button)`
  background: ${theme.success.default};
  :hover:not([disabled]) {
    background: ${shade(0.05, theme.success.default)};
    color: ${theme.text.reverse};
  }
`;
