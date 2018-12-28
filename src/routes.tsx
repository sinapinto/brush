import React, { Suspense } from 'react';
import { RouteProps } from 'react-router';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { useCurrentUser } from './utils/useCurrentUser';
import ErrorBoundary from './components/ErrorBoundary';
import { Spinner, ErrorMessage } from './components/globals';
import Navbar from './views/Navbar';

const Home = React.lazy(() => import('./views/Home'));
const User = React.lazy(() => import('./views/User'));
const Post = React.lazy(() => import('./views/Post'));
const Create = React.lazy(() => import('./views/Create'));
const Settings = React.lazy(() => import('./views/Settings'));

const ErrorFallback = () => (
  <ErrorMessage>An unexpected error occured.</ErrorMessage>
);

const requireAuth = (Comp: React.ComponentType<any>) => {
  const C = () => {
    const { currentUser } = useCurrentUser();
    return currentUser ? <Comp /> : <Redirect to="/" />;
  };
  C.displayName = 'requireAuth';
  return C;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <>
        <Route component={Navbar} />
        <Main role="main">
          <ErrorBoundary fallback={ErrorFallback}>
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route path="/" exact render={() => <Home />} />
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
                <Route path="/create" component={requireAuth(Create)} />
                <Route path="/settings" component={requireAuth(Settings)} />
                <Route render={() => <h1>not found</h1>} />
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </Main>
      </>
    </BrowserRouter>
  );
};

const Main = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 24px;
`;

export default Routes;
