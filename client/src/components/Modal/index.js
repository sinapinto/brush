import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import styles from './index.module.css'

export default function Modal({ children, ...otherProps }) {
  return (
    <ReactModal
      {...otherProps}
      appElement={document.getElementById('app-root')}
      className={styles.content}
    >
      {children}
    </ReactModal>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
}
