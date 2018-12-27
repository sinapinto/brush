import React, { Suspense } from 'react';
import { RouteProps } from 'react-router';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import ErrorBoundary from './components/ErrorBoundary';
import { currentUserQuery } from './graphql/queries/user';
import {
  CurrentUser,
  CurrentUser_currentUser,
} from './graphql/queries/__generated__/CurrentUser';
import { CurrentUserContext } from './context';
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

const requireAuth = (Component: React.ComponentType<any>) => {
  const C = ({ ...props }) => {
    const {
      data: { currentUser },
      refetch,
    } = useQuery<CurrentUser>(currentUserQuery, {
      errorPolicy: 'ignore',
    });
    if (!currentUser) return <Redirect to="/" />;
    return (
      <CurrentUserContext.Provider value={{ currentUser, refetch }}>
        <Component {...props} />
      </CurrentUserContext.Provider>
    );
  };
  C.displayName = 'RequireAuthHOC';
  return C;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <>
        <Route component={Navbar} />
        <Main>
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
