import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.css'

export default function TextInput({ className, disabled, ...otherProps }) {
  let classes = classNames(styles.input, className, {
    [styles.disabled]: disabled,
  })
  return (
    <input
      className={classes}
      disabled={disabled}
      {...otherProps}
    />
  )
}

TextInput.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  spellCheck: PropTypes.bool,
  disabled: PropTypes.bool,
}

TextInput.defaultProps = {
  type: 'text',
  className: null,
  spellCheck: false,
  disabled: false,
}
