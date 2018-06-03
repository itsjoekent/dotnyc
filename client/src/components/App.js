import React from 'react';
import { Route } from 'react-router-dom';
import ParrotButtonLink from './ParrotButtonLink';
import GreetingPage from './GreetingPage';
import DirectoryPage from './DirectoryPage';
import {
  HOME_PATH,
  DIRECTORY_PATH,
  CONTENT_PATH,
} from '../routes';

const App = (props) => {

  return (
    <React.Fragment>
      <ParrotButtonLink />
      <Route exact path={HOME_PATH} component={GreetingPage} />
      <Route path={DIRECTORY_PATH} component={DirectoryPage} />
      <Route path={CONTENT_PATH} component={props => JSON.stringify(props)} />
    </React.Fragment>
  );
};

export default App;
