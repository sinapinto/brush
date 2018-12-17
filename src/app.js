import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import styled from 'styled-components'
import GlobalStyles from './styles/global.css.js'
import DevTools from './util/DevTools'
import Navbar from './views/Navbar'
import Home from './views/Home'
import User from './views/User'
import Post from './views/Post'
import Create from './views/Create'
import { fetchSignedInUser } from './fetch/auth'
import { AppState } from './util/context'
import useSignedInUser from './hooks/useSignedInUser'

let NotFound = () => <h1>not found</h1>

let Body = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 24px;
`

let client = new ApolloClient({ uri: 'http://localhost:4000/graphql' })

function AppContent() {
  let [, setSignedInUser] = useSignedInUser()

  useEffect(() => {
    fetchSignedInUser()
      .then(signedInUser => setSignedInUser(signedInUser))
      .catch(console.error)
  }, [])

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.Fragment>
          <Route component={Navbar} />
          <GlobalStyles />
          <Body>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/u/:username"
                render={({ match }) => <User username={match.params.username} />}
              />
              <Route
                path="/p/:postId"
                render={({ match }) => <Post id={match.params.postId} />}
              />
              <Route path="/create" component={Create} />
              <Route component={NotFound} />
            </Switch>
          </Body>
        </React.Fragment>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default function App() {
  let [appState, setAppState] = useState({})
  return (
    <AppState.Provider value={{ appState, setAppState }}>
      <DevTools />
      <AppContent />
    </AppState.Provider>
  )
}
