import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ErrorMessage, Spinner } from './components/globals';
import { useCurrentUser } from './utils/useCurrentUser';
import { Home } from './views/Home';
import { Navbar } from './views/Navbar';
import { Search } from './views/Search';
import { Settings } from './views/Settings';
import { TagSearch } from './views/TagSearch';
import { User } from './views/User';

const Post = React.lazy(() => import('./views/Post'));
const Create = React.lazy(() => import('./views/Create'));

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

export const Routes = () => {
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
                <Route
                  path="/tag/:tag"
                  render={({ match }) => <TagSearch tag={match.params.tag} />}
                />
                <Route path="/create" component={requireAuth(Create)} />
                <Route path="/settings" component={requireAuth(Settings)} />
                <Route
                  path="/search"
                  render={({ ...props }) => <Search {...props} />}
                />
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
