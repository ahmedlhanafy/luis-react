import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import MyApps from './pages/MyApps';
import styled from 'styled-components';
import Intents from './pages/Intents';
import Entities from './pages/Entities';
import MicrosoftHeader from './components/MicrosoftHeader';
import AppShell from './components/AppShell';
import GraphqlProvider from './graphql/GraphqlProvider';
import MockProvider from './graphql/MockProvider';
import AppDataContext from './contexts/AppDataContext';
import UtterancePage from './pages/Utterance';

const App = () => {
  const [mockSchemaEnabled, toggleMockedSchema] = React.useState(false);

  const children = (
    <Router>
      <AppContainer>
        <MicrosoftHeader username="Ahmed Elhanafy" />
        <Container>
          <Route
            exact
            path="/"
            render={() => <MyApps mockSchemaEnabled={mockSchemaEnabled} toggleMockSchema={() => toggleMockedSchema(state => !state)} />}
          />
          <Route
            path="/application/:applicationId/version/:versionId"
            render={({ match }) => (
              <AppDataContext.Provider value={{ applicationId: match.params.applicationId, versionId: match.params.versionId }}>
                <AppShell>
                  <Switch>
                    <Route exact path={`${match.url}/entities`} component={Entities} />
                    <Route exact path={`${match.url}/intents`} component={Intents} />
                    <Route
                      exact
                      path={`${match.url}/intents/:intentId`}
                      render={({ match }) => <UtterancePage intentId={match.params.intentId} />}
                    />
                    <Redirect strict from={match.url} to={`${match.url}/intents`} />
                  </Switch>
                </AppShell>
              </AppDataContext.Provider>
            )}
          />
        </Container>
      </AppContainer>
    </Router>
  );

  return mockSchemaEnabled ? <MockProvider>{children}</MockProvider> : <GraphqlProvider>{children}</GraphqlProvider>;
};

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
