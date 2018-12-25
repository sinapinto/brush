import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import Routes from './routes';
import { client } from './graphql';
import GlobalStyles from './styles/globalStyles';

const App: React.FunctionComponent = () => {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <GlobalStyles />
        <Routes />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};

export default App;
