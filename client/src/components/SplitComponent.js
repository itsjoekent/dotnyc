import React from 'react';
import Block from './Block';
import LoadTrain from './LoadTrain';

const PageLoaderContainer = Block.extend`
  position: absolute;
  top: calc(50% - 2em);
  left: calc(50% - 2em);
`;

function SplitComponent(componentName, inlineLoader = true) {
  class Loader extends React.Component {
    state = {
      AsyncComponent: null,
    };

    componentDidMount() {
      import(`./${componentName}`)
        .then(module => this.setState({ AsyncComponent: module.default }));
    }

    render() {
      const { AsyncComponent } = this.state;

      if (! AsyncComponent) {
        return inlineLoader ? ( <LoadTrain /> ) : (
          <PageLoaderContainer>
            <LoadTrain />
          </PageLoaderContainer>
        );
      }

      return (
        <AsyncComponent {...this.props} />
      );
    }
  }

  return Loader;
}

export default SplitComponent;
