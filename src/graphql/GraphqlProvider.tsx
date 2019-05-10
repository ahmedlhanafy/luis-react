import React, { ReactNode } from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { persistCache } from 'apollo-cache-persist';

const cache = new InMemoryCache({
  dataIdFromObject: obj => obj.id || null,
  cacheRedirects: {
    Query: {
      application: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Application', id: args.id }),
    },
    Application: {
      intent: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Intent', id: args.id }),
    },
  },
});

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:8080/graphql',
    // uri: 'https://luis-graphql.herokuapp.com/graphql',
    headers: {
      'Ocp-Apim-Subscription-Key': 'c0f3cc704f2e4d348d52cfc7ccfee85b',
    },
  }),
  cache,
});

const GraphqlProvider = ({ children }: { children: ReactNode }) => <ApolloProvider client={client}>{children}</ApolloProvider>;

export default GraphqlProvider;
