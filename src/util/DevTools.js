import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { AppState } from './context'

let StyledDevTools = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #fff;
  border: 1px solid black;
  height: 500px;
  width: 500px;
  overflow: auto;
`

function DevTools() {
  let { appState } = useContext(AppState)
  let [isVisible, setIsVisible] = useState(false)

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
    <StyledDevTools>
      <pre>{JSON.stringify(appState, null, 2)}</pre>
    </StyledDevTools>
  )
}

export default process.env.NODE_ENV === 'development'
  ? DevTools
  : () => null
