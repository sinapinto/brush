import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ErrorBoundary } from './components/ErrorBoundary';
import { client } from './graphql';
import { Routes } from './routes';
import { AppGlobalStyles } from './styles/AppGlobalStyles';

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <AppGlobalStyles />
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
};
