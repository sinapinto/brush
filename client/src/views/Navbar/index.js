import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PlusIcon from 'mdi-react/PlusIcon'
import AccountIcon from 'mdi-react/AccountIcon'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import ButtonLink from '../../components/ButtonLink'
import AuthForm from './AuthForm'
import { MODAL_CLOSED, MODAL_SIGNUP } from './constants'
import useSignedInUser from '../../hooks/useSignedInUser'

let StyledNavbar = styled.nav`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.brand.default};
  box-shadow: 0 2px 5px rgba(0,0,0,.1);
  margin-bottom: 16px;
`

let NavbarContent = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 28px;
`
let LogoLink = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
`
let ButtonWrap = styled.div`
  margin-left: 28px;
`

export default function Navbar() {
  let [activeModal, setActiveModal] = useState(MODAL_CLOSED)
  let [signedInUser, setSignedInUser] = useSignedInUser()

  let handleAuthSuccess = (signedInUser) => {
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
              <ButtonLink
                invert
                to={`/u/${signedInUser.username}`}
              >
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
      <Modal isOpen={activeModal !== MODAL_CLOSED} onRequestClose={() => setActiveModal(MODAL_CLOSED)}>
        <AuthForm type={activeModal} onChangeType={(type) => setActiveModal(type)} onSuccess={handleAuthSuccess} />
      </Modal>
    </StyledNavbar>
  )
}
