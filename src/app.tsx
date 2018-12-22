import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import styled from 'styled-components';

import { client } from './graphql';
import GlobalStyles from './styles/globalStyles';
import Navbar from './views/Navbar';
import Home from './views/Home';
import User from './views/User';
import Post from './views/Post';
import Create from './views/Create';

const Body = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 24px;
`;

export default function App() {
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
  );
}
