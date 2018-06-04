import React from 'react';
import styled from 'styled-components';
import ApiReadyComponent from './ApiReadyComponent';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text || '',
    };
  }

  render() {
    return null;
  }
}

export default ApiReadyComponent(Editor);
