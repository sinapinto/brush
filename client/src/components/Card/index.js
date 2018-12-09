import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.css'

export default function Card({ className, children }) {
  let classes = classNames(styles.card, className)
  return (
    <div className={classes}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
