import React from 'react';
import AsyncComponent from './AsyncComponent';

function AsyncHome(props) {
  return (
    <AsyncComponent
      componentName="Home"
      passthrough={{ ...props }}
    />
  );
}

export default AsyncHome;
