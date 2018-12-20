import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { TiPlus as PlusIcon } from 'react-icons/ti';
import { TiUser as AccountIcon } from 'react-icons/ti';

import { logoutUser } from '../../graphql/mutations/user';
import withCurrentUser from '../../util/withCurrentUser';
import AuthModal from './AuthModal';
import { Button } from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import { MODAL_CLOSED, MODAL_SIGNUP } from './constants';
import { StyledNavbar, NavbarContent, LogoLink, ButtonWrap } from './style';

function Navbar({ logoutUser, currentUser }) {
  let [activeModal, setActiveModal] = useState(MODAL_CLOSED);
  return (
    <StyledNavbar>
      <NavbarContent>
        <LogoLink to="/">microblog</LogoLink>
        <ButtonWrap>
          {currentUser ? (
            <React.Fragment>
              <ButtonLink invert to="/create">
                <PlusIcon size={20} />
                Create
              </ButtonLink>
              <ButtonLink invert to={`/u/${currentUser.username}`}>
                <AccountIcon size={20} />
                {currentUser.username.slice(0, 16)}
              </ButtonLink>
              <Button
                type="primary"
                invert
                onClick={() => logoutUser().catch(() => {})}
              >
                Log Out
              </Button>
            </React.Fragment>
          ) : (
            <Button
              type="primary"
              invert
              onClick={() => setActiveModal(MODAL_SIGNUP)}
            >
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
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
};

export default compose(
  logoutUser,
  withCurrentUser
)(Navbar);
