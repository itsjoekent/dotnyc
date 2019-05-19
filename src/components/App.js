import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AsyncHome from './AsyncHome';
import AsyncContentContainer from './AsyncContentContainer';
import Page from './Page';
import NotFound from './NotFound';
import GlobalStyle from '../styles/GlobalStyleComponent';
import theme from '../theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        <BrowserRouter>
          <Page>
            <Switch>
              <Route path="/" exact component={AsyncHome} />
              <Route path="/about" component={AsyncContentContainer} />
              <Route path="/blog/*" component={AsyncContentContainer} />
              <Route path="/blog" component={AsyncContentContainer} />
              <Route component={NotFound}/>
            </Switch>
          </Page>
        </BrowserRouter>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
