import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import ErrorBoundary from './components/ErrorBoundary';
import { currentUserQuery } from './graphql/queries/user';
import { CurrentUser } from './graphql/queries/__generated__/CurrentUser';
import { CurrentUserContext } from './context';
import Navbar from './views/Navbar';
import Home from './views/Home';
import User from './views/User';
import Post from './views/Post';
import Create from './views/Create';
import Settings from './views/Settings';
import { Spinner, ErrorMessage } from './components/globals';

const ErrorFallback = () => {
  return <ErrorMessage>An unexpected error occured.</ErrorMessage>;
};

const Routes: React.FunctionComponent = () => {
  const { data, loading, refetch } = useQuery<CurrentUser>(currentUserQuery, {
    suspend: false,
    errorPolicy: 'ignore',
  });
  const currentUser = loading ? null : data.currentUser;

  const protect = (Comp: React.ComponentType) => {
    if (loading) return () => <Spinner />;
    if (!currentUser) return () => <Redirect to="/" />;
    return () => <Comp />;
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, loading, refetch }}>
      <BrowserRouter>
        <>
          <Route component={Navbar} />
          <Main>
            <ErrorBoundary fallback={ErrorFallback}>
              <Suspense fallback={<Spinner />}>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/settings" render={protect(Settings)} />
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
                  <Route path="/create" render={protect(Create)} />
                  <Route render={() => <h1>not found</h1>} />
                </Switch>
              </Suspense>
            </ErrorBoundary>
          </Main>
        </>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
};

const Main = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 24px;
`;

export default Routes;
