import React, { useEffect, useState, useContext } from 'react'
import { AppState } from './context'
import styles from './DevTools.module.css'

export default function Debug() {
  let { appState } = useContext(AppState)
  let [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let handleKeyPress = (e) => {
      if (e.key === 'h') {
        setIsVisible((state) => !state)
      }
    }
    window.addEventListener('keypress', handleKeyPress)
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
    }
  })

  if (!isVisible) return null
  return (
    <div className={styles.debug}>
      <pre>{JSON.stringify(appState, null, 2)}</pre>
    </div>
  )
}
