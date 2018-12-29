import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { shade } from 'polished';
import { MdCreate as CreateIcon } from 'react-icons/md';
import { MdPerson as AccountIcon } from 'react-icons/md';

import SearchBar from './SearchBar';
import { useCurrentUser } from '../../utils/useCurrentUser';
import AuthModal, { ModalType } from './AuthModal';
import { Button } from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import LogoutButton from './LogoutButton';
import { currentUserQuery } from '../../graphql/queries/user';
import { CurrentUser } from '../../graphql/queries/__generated__/CurrentUser';
import theme from '../../styles/theme';

const Navbar: React.FunctionComponent = () => {
  const { currentUser, refetch } = useCurrentUser({ suspend: false });
  const [activeModal, setActiveModal] = useState(ModalType.Closed);
  return (
    <Container>
      <NavbarContainer>
        <LogoLink to="/">microblog</LogoLink>
        <SearchBar />
        {currentUser ? (
          <ButtonContainer>
            <ButtonLink to="/create">
              <CreateIcon size={20} />
              Create
            </ButtonLink>
            <ButtonLink to={`/u/${currentUser.username}`}>
              <AccountIcon size={20} />
              {currentUser.username.slice(0, 16)}
            </ButtonLink>
            <LogoutButton />
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <Button
              type="button"
              onClick={() => setActiveModal(ModalType.Login)}
            >
              Log In
            </Button>
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
`;

const ButtonContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 28px;
`;

const LogoLink = styled(Link)`
  font-size: 24px;
  font-weight: 900;
  color: ${theme.text.reverse};
  text-decoration: underline;
  :hover {
    color: ${shade(0.1, theme.text.reverse)}
`;

export default Navbar;
