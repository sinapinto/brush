import styled from 'styled-components';

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
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
`;
