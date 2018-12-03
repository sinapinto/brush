import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import styles from './index.module.css'

export default function Navbar() {
  let [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  let [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>brush</Link>
      <div>
        <Button onClick={() => setIsLoginModalOpen(true)}>Log In</Button>
        <Button onClick={() => setIsRegisterModalOpen(true)}>Sign Up</Button>
      </div>
      <Modal isOpen={isLoginModalOpen} onRequestClose={() => setIsLoginModalOpen(false)}>
        <LoginForm />
      </Modal>
      <Modal isOpen={isRegisterModalOpen} onRequestClose={() => setIsRegisterModalOpen(false)}>
        <RegisterForm />
      </Modal>
    </nav>
  )
}
