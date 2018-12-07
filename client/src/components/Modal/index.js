import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import styles from './index.module.css'

export default function Modal({ children, hasCloseButton, ...otherProps }) {
  return (
    <ReactModal
      {...otherProps}
      appElement={document.getElementById('app-root')}
      className={styles.modal}
    >
      <div className={styles.toolbar}>
        {hasCloseButton && (
          <button className={styles.closeButton} onClick={otherProps.onRequestClose}>
            ×
          </button>
        )}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </ReactModal>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  hasCloseButton: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
}

Modal.defaultProps = {
  hasCloseButton: true,
}
