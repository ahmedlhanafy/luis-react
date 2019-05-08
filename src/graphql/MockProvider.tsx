import React, { ReactNode } from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { buildClientSchema } from 'graphql';
import introspectionResult from '../graphql-schema.json';
import { addMockFunctionsToSchema } from 'graphql-tools';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import SchemaLink from 'apollo-link-schema';

export const schema = buildClientSchema(introspectionResult as any);

addMockFunctionsToSchema({ schema });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema }),
});

const MockProvider = ({ children }: { children: ReactNode }) => <ApolloProvider client={client}>{children}</ApolloProvider>;

export default MockProvider;
