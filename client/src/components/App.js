import React from 'react';
import { Route } from 'react-router-dom';
import ParrotButtonLink from './ParrotButtonLink';
import AsyncGreetingPage from './AsyncGreetingPage';
import AsyncDirectoryPage from './AsyncDirectoryPage';
import AsyncContentPage from './AsyncContentPage';
import {
  HOME_PATH,
  DIRECTORY_PATH,
  CONTENT_PATH,
} from '../routes';

const App = (props) => {

  return (
    <React.Fragment>
      <ParrotButtonLink />
      <Route exact path={HOME_PATH} component={AsyncGreetingPage} />
      <Route path={DIRECTORY_PATH} component={AsyncDirectoryPage} />
      <Route path={CONTENT_PATH} component={AsyncContentPage} />
    </React.Fragment>
  );
};

export default App;
