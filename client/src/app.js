import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './views/Navbar'
import Home from './views/Home'
import User from './views/User'
import { fetchSignedInUser } from './fetch/auth'
import { UserContext } from './context'
import styles from './app.module.css'

let NotFound = () => <h1>not found</h1>

export default function App() {
  let [signedInUser, setSignedInUser] = useState(null)

  useEffect(() => {
    fetchSignedInUser()
      .then(user => setSignedInUser(user))
      .catch(console.error)
  }, [])

  return (
    <UserContext.Provider value={{ signedInUser, setSignedInUser }}>
      <BrowserRouter>
        <React.Fragment>
          <Route component={Navbar} />
          <div className={styles.content}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/u/:username" component={User} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
