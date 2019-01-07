import React, { useState } from 'react';
import { FaBrush as BrushIcon } from 'react-icons/fa';
import {
  MdCreate as CreateIcon,
  MdPerson as AccountIcon,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/Button';
import { ButtonLink } from '../../components/ButtonLink';
import { theme } from '../../styles/theme';
import { media } from '../../utils/css';
import { useCurrentUser } from '../../utils/useCurrentUser';
import { AuthModal, ModalType } from './AuthModal';
import { SearchBar } from './SearchBar';

export const Navbar = () => {
  const { currentUser, refetch } = useCurrentUser({ suspend: false });
  const [activeModal, setActiveModal] = useState(ModalType.Closed);
  return (
    <Container>
      <NavbarContainer>
        <LogoLink to="/">
          <BrushIcon size="0.7em" />
          <span>Brush</span>
        </LogoLink>
        <SearchBar />
        {currentUser ? (
          <ButtonContainer>
            <NavLink to="/create">
              <CreateIcon size="1.4em" />
              <span>Create</span>
            </NavLink>
            <NavLink to={`/u/${currentUser.username}`}>
              <AccountIcon size="1.4em" />
              <span>{currentUser.username.slice(0, 16)}</span>
            </NavLink>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <Button
              type="button"
              onClick={() => setActiveModal(ModalType.Signup)}
            >
              Sign Up
            </Button>
          </ButtonContainer>
        )}
      </NavbarContainer>
      <AuthModal
        isOpen={activeModal !== ModalType.Closed}
        onRequestClose={() => setActiveModal(ModalType.Closed)}
        type={activeModal}
        onChangeType={type => setActiveModal(type)}
        onSuccess={() => {
          refetch();
          setActiveModal(ModalType.Closed);
        }}
      />
    </Container>
  );
};

const Container = styled.nav`
  height: 60px;
  width: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.brand.default};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: center;
  margin: 0 28px;
  ${media.tablet`
    margin: 0;
  `}
`;

const ButtonContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 28px;
  ${media.tablet`
    justify-content: space-evenly;
  `}
`;

const LogoLink = styled(Link)`
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  color: ${theme.text.reverse};
  white-space: nowrap;
  & > svg {
    margin-right: 8px;
  }
  ${media.phone`
    font-size: 32px;
    & > span {
      display: none;
    }
  `}
`;

const NavLink = styled(ButtonLink)`
  ${media.tablet`
    font-size: 18px;
    & > span {
      display: none;
    }
  `}
`;
