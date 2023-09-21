'use client';

import React, { PropsWithChildren } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import { observer } from 'mobx-react';

export const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:3001/graphql',
  }),
  cache: new InMemoryCache(),
  ssrMode: true,
});

export const Providers = observer(
  ({ children }: PropsWithChildren): JSX.Element => {
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
  },
);
