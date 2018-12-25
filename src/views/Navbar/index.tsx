import React, { useState, useContext } from 'react';
import { Query } from 'react-apollo';
import { MdCreate as CreateIcon } from 'react-icons/md';
import { MdPerson as AccountIcon } from 'react-icons/md';

import { CurrentUserContext } from '../../context';
import AuthModal, { ModalType } from './AuthModal';
import { Button } from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import { StyledNavbar, NavbarContent, LogoLink, ButtonWrap } from './style';
import LogoutButton from './LogoutButton';

const Navbar: React.FunctionComponent = () => {
  const { currentUser, loading } = useContext(CurrentUserContext);
  const [activeModal, setActiveModal] = useState(ModalType.Closed);
  return (
    <StyledNavbar>
      <NavbarContent>
        <LogoLink to="/">microblog</LogoLink>
        <ButtonWrap>
          {loading ? null : currentUser && currentUser.username ? (
            <React.Fragment>
              <ButtonLink to="/create">
                <CreateIcon size={20} />
                Create
              </ButtonLink>
              <ButtonLink to={`/u/${currentUser.username}`}>
                <AccountIcon size={20} />
                {currentUser.username.slice(0, 16)}
              </ButtonLink>
              <LogoutButton />
            </React.Fragment>
          ) : (
            <Button
              type="button"
              onClick={() => setActiveModal(ModalType.Signup)}
            >
              Sign Up
            </Button>
          )}
        </ButtonWrap>
      </NavbarContent>
      <AuthModal
        isOpen={activeModal !== ModalType.Closed}
        onRequestClose={() => setActiveModal(ModalType.Closed)}
        type={activeModal}
        onChangeType={type => setActiveModal(type)}
        onSuccess={() => setActiveModal(ModalType.Closed)}
      />
    </StyledNavbar>
  );
};

export default Navbar;
