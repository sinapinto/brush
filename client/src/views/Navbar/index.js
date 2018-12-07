import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import AuthForm from './AuthForm'
import { modalState } from './constant'
import styles from './index.module.css'

export default function Navbar() {
  let [activeModal, setActiveModal] = useState(modalState.CLOSED)
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
      <Link to="/" className={styles.logo}>brush</Link>
      <div className={styles.buttonWrap}>
        <Button invert onClick={() => setActiveModal(modalState.LOGIN)}>Log In</Button>
        <Button type="primary" invert onClick={() => setActiveModal(modalState.SIGNUP)}>Sign Up</Button>
      </div>
      <Modal isOpen={activeModal !== modalState.CLOSED} onRequestClose={() => setActiveModal(modalState.CLOSED)}>
        <AuthForm type={activeModal} onChangeType={(type) => setActiveModal(type)} />
      </Modal>
    </div>
    </nav>
  )
}
