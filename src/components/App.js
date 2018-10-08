import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import NotFound from './NotFound';
import { Column } from './Flex';
import { entries } from '../contentIndex';

const App = (props) => {
  return (
    <Column as="main" fillHeight>
      <Header />
      <Switch>
        {entries.map(({ directory, route }) => (
          <Route
            {...route}
            key={route.path}
            render={routeProps => <Content directory={directory} {...routeProps} />}
          />
        ))}
        <Route component={NotFound} />
      </Switch>
    </Column>
  );
};

export default App;
