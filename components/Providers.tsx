'use client';

import React, { PropsWithChildren } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import { observer } from 'mobx-react';

const OverrideCache = new Proxy(new InMemoryCache(), {
  get(target, name, receiver) {
    return Reflect.get(target, name, receiver);
  },
});

export const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: process.env.GRAPHQL_API_URL,
  }),
  cache: OverrideCache,
  ssrMode: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
  },
});

export const Providers = observer(
  ({ children }: PropsWithChildren): JSX.Element => {
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
  },
);
