import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'

export default function TextInput({ className, ...otherProps }) {
  return (
    <input
      className={[styles.input, className].join(' ')}
      {...otherProps}
    />
  );
}

TextInput.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  spellCheck: PropTypes.bool,
}

TextInput.defaultProps = {
  type: 'text',
  className: null,
  spellCheck: false,
}
