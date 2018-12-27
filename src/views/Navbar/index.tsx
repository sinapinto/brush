import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { MdCreate as CreateIcon } from 'react-icons/md';
import { MdPerson as AccountIcon } from 'react-icons/md';

import AuthModal, { ModalType } from './AuthModal';
import { Button } from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import { StyledNavbar, NavbarContent, LogoLink, ButtonWrap } from './style';
import LogoutButton from './LogoutButton';
import { currentUserQuery } from '../../graphql/queries/user';
import { CurrentUser } from '../../graphql/queries/__generated__/CurrentUser';

const Navbar: React.FunctionComponent = () => {
  const {
    data: { currentUser },
    loading,
    refetch,
  } = useQuery<CurrentUser>(currentUserQuery, {
    suspend: false,
    errorPolicy: 'ignore',
  });
  const [activeModal, setActiveModal] = useState(ModalType.Closed);
  return (
    <StyledNavbar>
      <NavbarContent>
        <LogoLink to="/">microblog</LogoLink>
        <ButtonWrap>
          {loading ? null : currentUser ? (
            <>
              <ButtonLink to="/create">
                <CreateIcon size={20} />
                Create
              </ButtonLink>
              <ButtonLink to={`/u/${currentUser.username}`}>
                <AccountIcon size={20} />
                {currentUser.username.slice(0, 16)}
              </ButtonLink>
              <LogoutButton />
            </>
          ) : (
            <>
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
            </>
          )}
        </ButtonWrap>
      </NavbarContent>
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
    </StyledNavbar>
  );
};

export default Navbar;
