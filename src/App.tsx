import React, { useState } from 'react';
import { DefaultButton, Nav } from 'office-ui-fabric-react';
import MyApps from './Pages/MyApps';
import styled from 'styled-components';
import { AppShell, MicrosoftHeader } from './Components';
import Intents from './Pages/Intents';
import Entities from './Pages/Entities';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

const App = () => (
  <Router>
    <AppContainer>
      <MicrosoftHeader username="Ahmed Elhanafy" />
      <Container>
        <Route exact path="/" component={MyApps} />
        <Route
          path="/application"
          render={({ match }) => (
            <AppShell>
              <Switch>
                <Route
                  exact
                  path={`${match.url}/entities`}
                  component={Entities}
                />
                <Route path={`${match.url}/intents`} component={Intents} />
                <Redirect strict from={match.url} to={`${match.url}/intents`} />
              </Switch>
            </AppShell>
          )}
        />
      </Container>
    </AppContainer>
  </Router>
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
