import React, { useState } from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import ApolloClient from 'apollo-boost';
import MyApps from './Pages/MyApps';
import styled from 'styled-components';
import { AppShell, MicrosoftHeader } from './Components';
import Intents from './Pages/Intents';
import Entities from './Pages/Entities';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  headers: {
    'Ocp-Apim-Subscription-Key': 'c0f3cc704f2e4d348d52cfc7ccfee85b',
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <AppContainer>
        <MicrosoftHeader username="Ahmed Elhanafy" />
        <Container>
          <Route exact path="/" component={MyApps} />
          <Route
            path="/application/:applicationId/version/:versionId"
            render={({ match }) => (
              <AppShell>
                <Switch>
                  <Route exact path={`${match.url}/entities`} render={() => <Entities applicationId={match.params.applicationId} />} />
                  <Route path={`${match.url}/intents`} render={() => <Intents applicationId={match.params.applicationId} />} />
                  <Redirect strict from={match.url} to={`${match.url}/intents`} />
                </Switch>
              </AppShell>
            )}
          />
        </Container>
      </AppContainer>
    </Router>
  </ApolloProvider>
);

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default App;
