import React from 'react';
import AsyncComponent from './AsyncComponent';

function AsyncContentContainer(props) {
  return (
    <AsyncComponent
      componentName="ContentContainer"
      passthrough={{ ...props }}
    />
  );
}

export default AsyncContentContainer;
