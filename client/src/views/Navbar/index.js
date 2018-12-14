import React, { useState } from 'react'
import PlusIcon from 'mdi-react/PlusIcon'
import AccountIcon from 'mdi-react/AccountIcon'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import ButtonLink from '../../components/ButtonLink'
import AuthForm from './AuthForm'
import { MODAL_CLOSED, MODAL_SIGNUP } from './constants'
import useSignedInUser from '../../hooks/useSignedInUser'
import styles from './index.module.css'

export default function Navbar() {
  let [activeModal, setActiveModal] = useState(MODAL_CLOSED)
  let [signedInUser, setSignedInUser] = useSignedInUser()

  let handleAuthSuccess = (signedInUser) => {
    setActiveModal(MODAL_CLOSED)
    setSignedInUser(signedInUser)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <Link to="/" className={styles.logo}>brush</Link>
        <div className={styles.buttonWrap}>
          {signedInUser ? (
            <React.Fragment>
              <ButtonLink invert to="/create">
                <PlusIcon size={20} className={styles.btnIcon} />
                Create
              </ButtonLink>
              <ButtonLink
                invert
                to={`/u/${signedInUser.username}`}
              >
                <AccountIcon size={20} className={styles.btnIcon} />
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
        </div>
      </div>
      <Modal isOpen={activeModal !== MODAL_CLOSED} onRequestClose={() => setActiveModal(MODAL_CLOSED)}>
        <AuthForm type={activeModal} onChangeType={(type) => setActiveModal(type)} onSuccess={handleAuthSuccess} />
      </Modal>
    </nav>
  )
}
