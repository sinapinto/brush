import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import { currentUserQuery } from './graphql/queries/user';
import { CurrentUser } from './graphql/queries/__generated__/CurrentUser';
import { CurrentUserContext } from './context';
import Navbar from './views/Navbar';
import Home from './views/Home';
import User from './views/User';
import Post from './views/Post';
import Create from './views/Create';
import Settings from './views/Settings';

const Routes: React.FunctionComponent = () => {
  const { data, loading } = useQuery<CurrentUser>(currentUserQuery, {
    suspend: false,
    errorPolicy: 'ignore',
  });
  const currentUser = loading ? null : data.currentUser;
  return (
    <CurrentUserContext.Provider value={{ currentUser, loading }}>
      <BrowserRouter>
        <>
          <Route component={Navbar} />
          <Main>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/settings" component={Settings} />
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
