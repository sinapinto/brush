import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import { TiPlus as PlusIcon } from 'react-icons/ti'
import { TiUser as AccountIcon } from 'react-icons/ti'
import { TiChevronRight as LogoutIcon } from 'react-icons/ti'
import { meQuery } from '../../graphql/queries/user/me'
import { logoutUserMutation } from '../../graphql/mutations/auth'
import Modal from '../../components/Modal'
import { Button } from '../../components/Button'
import ButtonLink from '../../components/ButtonLink'
import AuthForm from './AuthForm'
import { MODAL_CLOSED, MODAL_SIGNUP } from './constants'
import { StyledNavbar, NavbarContent, LogoLink, ButtonWrap } from './style'

export default function Navbar() {
  let [activeModal, setActiveModal] = useState(MODAL_CLOSED)

  return (
    <Query query={meQuery}>
      {({ loading, error, data, refetch }) => (
        <StyledNavbar>
          <NavbarContent>
            <LogoLink to="/">brush</LogoLink>
            <ButtonWrap>
              {data && data.me && data.me.user ? (
                <React.Fragment>
                  <ButtonLink invert to="/create">
                    <PlusIcon size={20} />
                    Create
                  </ButtonLink>
                  <ButtonLink invert to={`/u/${data.me.user.username}`}>
                    <AccountIcon size={20} />
                    {data.me.user.username.slice(0, 16)}
                  </ButtonLink>
                  <Mutation
                    mutation={logoutUserMutation}
                    refetchQueries={[{ query: meQuery }]}
                  >
                    {logout => (
                      <Button type="primary" invert onClick={() => logout()}>
                        <LogoutIcon size={20} />
                        Log Out
                      </Button>
                    )}
                  </Mutation>
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
              onSuccess={() => {
                setActiveModal(MODAL_CLOSED)
                refetch()
              }}
            />
          </Modal>
        </StyledNavbar>
      )}
    </Query>
  )
}
