import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;

  > *:not(:last-child) {
    margin-bottom: 24px;
    width: 300px;
  }
`;

export const StyledNavbar = styled.nav`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.brand.default};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

export const NavbarContent = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 28px;
`;

export const LogoLink = styled(Link)`
  font-size: 24px;
  font-weight: 900;
  color: #fff;
  text-decoration: none;
`;

export const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  margin-left: 28px;
`;
