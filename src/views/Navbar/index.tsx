import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { TiPlus as PlusIcon } from 'react-icons/ti';
import { TiUser as AccountIcon } from 'react-icons/ti';

import AuthModal from './AuthModal';
import { Button } from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import { MODAL_CLOSED, MODAL_SIGNUP } from './constants';
import { StyledNavbar, NavbarContent, LogoLink, ButtonWrap } from './style';
import LogoutButton from './LogoutButton';
import { currentUserQuery as QUERY } from '../../graphql/queries/user';
import { CurrentUser } from '../../graphql/queries/__generated__/CurrentUser';

class CurrentUserQuery extends Query<CurrentUser> {}

const Navbar: React.FunctionComponent = () => {
  let [activeModal, setActiveModal] = useState(MODAL_CLOSED);
  return (
    <CurrentUserQuery query={QUERY}>
      {({ data, loading, error }) => {
        if (loading) return 'loading';
        if (error) return 'error';
        if (!data) return 'no data';
        const { currentUser } = data;
        return (
          <StyledNavbar>
            <NavbarContent>
              <LogoLink to="/">microblog</LogoLink>
              <ButtonWrap>
                {currentUser && currentUser.username ? (
                  <React.Fragment>
                    <ButtonLink to="/create">
                      <PlusIcon size={20} />
                      Create
                    </ButtonLink>
                    <ButtonLink to={`/u/${currentUser.username}`}>
                      <AccountIcon size={20} />
                      {currentUser.username.slice(0, 16)}
                    </ButtonLink>
                    <LogoutButton />
                  </React.Fragment>
                ) : (
                  <Button onClick={() => setActiveModal(MODAL_SIGNUP)}>
                    Sign Up
                  </Button>
                )}
              </ButtonWrap>
            </NavbarContent>
            <AuthModal
              isOpen={activeModal !== MODAL_CLOSED}
              onRequestClose={() => setActiveModal(MODAL_CLOSED)}
              type={activeModal}
              onChangeType={type => setActiveModal(type)}
              onSuccess={() => setActiveModal(MODAL_CLOSED)}
            />
          </StyledNavbar>
        );
      }}
    </CurrentUserQuery>
  );
};

export default Navbar;
