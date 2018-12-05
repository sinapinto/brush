import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'

export default function H({ level, children }) {
  return (
    <h2 className={styles[`h${level}`]}>
      {children}
    </h2>
  );
}

H.propTypes = {
  level: PropTypes.oneOf([1, 2, 3]),
  children: PropTypes.node.isRequired,
}

H.defaultProps = {
  level: 1,
}
