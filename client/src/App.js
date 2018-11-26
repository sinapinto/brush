import React from 'react'
import Home from './Home'
import Header from './Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <Route exact path="/" component={Home} />
      </React.Fragment>
    </Router>
  )
}
