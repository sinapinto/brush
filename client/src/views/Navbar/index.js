import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import ButtonLink from '../../components/ButtonLink'
import AuthForm from './AuthForm'
import { modalState } from './constant'
import { UserContext } from '../../context'
import styles from './index.module.css'

export default function Navbar() {
  let [modalType, setModalType] = useState(modalState.CLOSED)
  let { signedInUser, setSignedInUser } = useContext(UserContext)

  let handleAuthSuccess = (user) => {
    setModalType(modalState.CLOSED)
    setSignedInUser(user)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <Link to="/" className={styles.logo}>brush</Link>
        <div className={styles.buttonWrap}>
          {signedInUser ? (
            <ButtonLink
              invert
              to={`/u/${signedInUser.username}`}
            >
              {signedInUser.username.slice(0, 16)}
            </ButtonLink>
          ) : (
            <Button
              type="primary"
              invert
              onClick={() => setModalType(modalState.SIGNUP)}
            >
              Sign Up
            </Button>
          )}
        </div>
      </div>
      <Modal isOpen={modalType !== modalState.CLOSED} onRequestClose={() => setModalType(modalState.CLOSED)}>
        <AuthForm type={modalType} onChangeType={(type) => setModalType(type)} onSuccess={handleAuthSuccess} />
      </Modal>
    </nav>
  )
}
