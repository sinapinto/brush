import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import styled from 'styled-components'
import GlobalStyles from './styles/global.css.js'
import Navbar from './views/Navbar'
import Home from './views/Home'
import User from './views/User'
import Post from './views/Post'
import Create from './views/Create'
import { AppState } from './util/context'

let Body = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 24px;
`

let client = new ApolloClient({ uri: 'http://localhost:3000/graphql' })

function AppContent() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.Fragment>
          <GlobalStyles />
          <Route component={Navbar} />
          <Body>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/u/:username"
                render={({ match }) => (
                  <User username={match.params.username} />
                )}
              />
              <Route
                path="/p/:postId"
                render={({ match }) => <Post id={match.params.postId} />}
              />
              <Route path="/create" component={Create} />
              <Route render={() => <h1>not found</h1>} />
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
      <AppContent />
    </AppState.Provider>
  )
}
