import React, { useState } from 'react'
import { TiPlus as PlusIcon } from 'react-icons/ti'
import { TiUser as AccountIcon } from 'react-icons/ti'
import Modal from '../../components/Modal'
import { Button } from '../../components/Button'
import ButtonLink from '../../components/ButtonLink'
import AuthForm from './AuthForm'
import { MODAL_CLOSED, MODAL_SIGNUP } from './constants'
import useSignedInUser from '../../hooks/useSignedInUser'
import { StyledNavbar, NavbarContent, LogoLink, ButtonWrap } from './style'

export default function Navbar() {
  let [activeModal, setActiveModal] = useState(MODAL_CLOSED)
  let [signedInUser, setSignedInUser] = useSignedInUser()

  let handleAuthSuccess = signedInUser => {
    setActiveModal(MODAL_CLOSED)
    setSignedInUser(signedInUser)
  }

  return (
    <StyledNavbar>
      <NavbarContent>
        <LogoLink to="/">brush</LogoLink>
        <ButtonWrap>
          {signedInUser ? (
            <React.Fragment>
              <ButtonLink invert to="/create">
                <PlusIcon size={20} />
                Create
              </ButtonLink>
              <ButtonLink invert to={`/u/${signedInUser.username}`}>
                <AccountIcon size={20} />
                {signedInUser.username.slice(0, 16)}
              </ButtonLink>
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
      <Modal
        isOpen={activeModal !== MODAL_CLOSED}
        onRequestClose={() => setActiveModal(MODAL_CLOSED)}
      >
        <AuthForm
          type={activeModal}
          onChangeType={type => setActiveModal(type)}
          onSuccess={handleAuthSuccess}
        />
      </Modal>
    </StyledNavbar>
  )
}
