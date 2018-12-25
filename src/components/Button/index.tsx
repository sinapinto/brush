import styled from 'styled-components';
import theme from '../../styles/theme';

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
    filter: brightness(95%);
  }

  > svg {
    margin-right: 4px;
  }
`;

export const DangerousButton = styled(Button)`
  background: ${theme.warn.default};
`;

export const OutlineButton = styled(Button)`
  background: transparent;
  color: ${theme.brand.default};
  border: 2px solid ${theme.brand.default};
`;

export const TextButton = styled(OutlineButton)`
  border: none;
  padding: 0px 12px;
`;

export const CTAButton = styled(Button)`
  background: ${theme.success.default};
`;
