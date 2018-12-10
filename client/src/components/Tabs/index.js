import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.css'

export default function Tabs({ activeKey, onChange, className, children }) {
  return (
    <React.Fragment>
      <div className={classNames(styles.tabs, className)}>
        {React.Children.map(children, (pane) => (
          <button
            key={pane.key}
            className={classNames(styles.tab, { [styles.selected]: pane.key === activeKey })}
            onClick={() => onChange(pane.key)}
          >
            {pane.props.label}
          </button>
        ))}
      </div>
      <div className={styles.pane}>
        {React.Children.map(children, (pane) =>
          pane.key === activeKey ? pane : null
        )}
      </div>
    </React.Fragment>
  )
}

Tabs.propTypes = {
  activeKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
}

export function TabPane({ className, children }) {
  return <div className={className}>{children}</div>
}

TabPane.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
}
