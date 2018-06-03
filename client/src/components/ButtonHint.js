import React from 'react';
import styled, { keyframes } from 'styled-components';
import pointer from '../art/pointer.png';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
`;

const PointerComponent = styled.img`
  opacity: 1;
  transition: opacity 2s linear;
  animation: ${bounce} 1s linear infinite;
`;

class ButtonHint extends React.Component {
  state = {
    ready: false,
    timeoutId: null,
  }

  componentDidMount() {
    if (this.props.alwaysOn) {
      this.setState({ ready: true });
      return;
    }
    
    const onTimeout = () => this.setState({ ready: true });

    this.setState({
      timeoutId: setTimeout(onTimeout, 3000),
    });
  }

  componentWillUnmount() {
    const { timeoutId } = this.state;

    if (timeoutId) {
      clearInterval(timeoutId);
    }
  }

  render() {
    const { ready } = this.state;

    if (! ready) {
      return null;
    }

    return (
      <PointerComponent src={pointer} width="32px" height="32px" />
    );
  }
}

export default ButtonHint;
