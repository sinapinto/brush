import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.css'

export default function Button({ type, className, invert, htmlType, children, ...rest }) {
  let classes = classNames(styles.btn, className, styles[type], {
    [styles.invert]: invert,
  })
  return (
    <button
      {...rest}
      className={classes}
      type={htmlType}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'default', 'ghost']),
  invert: PropTypes.bool,
  htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
  children: PropTypes.node,
}

Button.defaultProps = {
  className: null,
  type: 'default',
  invert: false,
  htmlType: 'button'
}
