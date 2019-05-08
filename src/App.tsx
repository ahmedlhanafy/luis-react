import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import MyApps from './pages/MyApps';
import styled from 'styled-components';
import Intents from './pages/Intents';
import Entities from './pages/Entities';
import MicrosoftHeader from './components/MicrosoftHeader';
import AppShell from './components/AppShell';
import GraphqlProvider from './graphql/GraphqlProvider';
import MockProvider from './graphql/MockProvider';

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
              <AppShell applicationId={match.params.applicationId}>
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
