import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import styles from './index.module.css'

export default function Modal({ children, hasCloseButton, ...otherProps }) {
  return (
    <ReactModal
      {...otherProps}
      appElement={document.getElementById('app-root')}
      className={styles.content}
    >
      {hasCloseButton && (
        <div className={styles.top}>
          <button className={styles.closeButton} onClick={otherProps.onRequestClose}>
            ×
          </button>
        </div>
      )}
      {children}
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
