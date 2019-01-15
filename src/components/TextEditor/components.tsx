import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { H1 as h1, H2 as h2 } from '../globals';

export const Button = styled.span<{ active: boolean }>`
  cursor: pointer;
  color: ${props => (props.active ? 'black' : '#ccc')};
`;

export const Menu = styled.div`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`;

export const Toolbar = styled(Menu)`
  position: relative;
  padding: 1px 18px 17px;
  margin: 0 -20px;
  border-bottom: 1px solid ${theme.bg.border};
  margin-bottom: 20px;
`;

export const Code = styled.code`
  background-color: ${theme.bg.shade};
  padding: 4px;
  border-radius: 3px;
`;

export const Ul = styled.ul`
  padding-left: 64px;
`;

export const Ol = styled.ol`
  padding-left: 64px;
`;

export const H1 = styled(h1)`
  border-bottom: 1px solid ${theme.bg.border};
`;

export const H2 = styled(h2)`
  border-bottom: 1px solid ${theme.bg.border};
`;

export const Blockquote = styled.blockquote`
  border-left: 4px solid ${theme.bg.border};
  color: ${theme.text.placeholder};
  margin-left: 0;
  margin-top: 0;
  margin-right: 0;
  padding-left: 16px;
`;

export const A = styled.a`
  color: ${theme.accent.default};
  text-decoration: underline;
`;
