import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './views/Navbar'
import Home from './views/Home'
import { UserContext } from './context'

let NotFound = () => <h1>not found</h1>

async function fetchSignedInUser() {
  return fetch('/api/user', {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then(res => res.json())
    .then(res => res.user)
}

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
          <Switch>
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
