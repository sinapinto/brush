import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.css'

let createText = (ElType) => {
  let Text = ({ children, className }) => (
    <ElType className={classNames(styles[ElType], className)}>
      {children}
    </ElType>
  )

  Text.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  return Text
}

export let H1 = createText('h1')
export let H2 = createText('h2')
export let H3 = createText('h3')
export let H4 = createText('h4')
export let P = createText('p')
