import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'

export default function Button({ style, children, type, ...rest }) {
  return (
    <button
      className={styles.btn}
      style={style}
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
}

Button.defaultProps = {
  style: null,
  type: 'button'
}
