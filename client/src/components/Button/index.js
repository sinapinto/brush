import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.css'

export default function Button({ type, invert, htmlType, children, ...rest }) {
  let classes = classNames(styles.btn, styles[type], {
    [styles.invert]: invert,
  })
  return (
    <button
      className={classes}
      type={htmlType}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'default', 'ghost']),
  invert: PropTypes.bool,
  htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
  children: PropTypes.node,
}

Button.defaultProps = {
  type: 'default',
  invert: false,
  htmlType: 'button'
}
