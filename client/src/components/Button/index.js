import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.css'

export default function Button({ type, disabled, className, invert, htmlType, children, ...rest }) {
  let classes = classNames(styles.btn, className, styles[type], {
    [styles.invert]: invert,
    [styles.disabled]: disabled,
  })
  return (
    <button
      {...rest}
      className={classes}
      disabled={disabled}
      type={htmlType}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'default', 'ghost']),
  invert: PropTypes.bool,
  htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
}

Button.defaultProps = {
  type: 'default',
  invert: false,
  htmlType: 'button',
  disabled: false,
  className: null,
}
