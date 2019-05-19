import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';
import AsyncHome from './AsyncHome';
import Page from './Page';
import GlobalStyle from '../styles/GlobalStyleComponent';
import theme from '../theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        <BrowserRouter>
          <Page>
            <Route path="/" exact component={AsyncHome} />
          </Page>
        </BrowserRouter>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
