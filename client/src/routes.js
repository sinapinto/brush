import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './views/Navbar'
import Home from './views/Home'

let NotFound = () => <h1>not found</h1>

export default function Routes() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Route component={Navbar} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
}
