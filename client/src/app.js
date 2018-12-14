import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Debug from './Debug'
import Navbar from './views/Navbar'
import Home from './views/Home'
import User from './views/User'
import Post from './views/Post'
import Create from './views/Create'
import { fetchSignedInUser } from './fetch/auth'
import { AppState } from './context'
import useSignedInUser from './hooks/useSignedInUser'
import styles from './app.module.css'

let NotFound = () => <h1>not found</h1>

function AppContent() {
  let [, setSignedInUser] = useSignedInUser()

  useEffect(() => {
    fetchSignedInUser()
      .then(signedInUser => setSignedInUser(signedInUser))
      .catch(console.error)
  }, [])

  return (
    <BrowserRouter>
      <React.Fragment>
        <Route component={Navbar} />
        <div className={styles.content}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/u/:username" render={({ match }) => <User username={match.params.username} />} />
            <Route path="/p/:postId" render={({ match }) => <Post id={match.params.postId} />} />
            <Route path="/create" component={Create} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    </BrowserRouter>
  )
}

export default function App() {
  let [appState, setAppState] = useState({})
  return (
    <AppState.Provider value={{ appState, setAppState }}>
      <Debug />
      <AppContent />
    </AppState.Provider>
  )
}
