import React from 'react';
import styled, { keyframes } from 'styled-components';
import theme from '../theme';

const bounceFrames = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-5px);
  }
`;

const LogoContainer = styled.div`
  display: block;
  cursor: pointer;
  height: ${props => props.height};

  &:hover {
    animation: ${bounceFrames} 1s;
  }
`;

const Logo = (props) => {
  const {
    length = 48,
    fill = theme.colors.lightBlue,
  } = props;

  const pixelLength = `${length}px`;

  return (
    <LogoContainer height={pixelLength}>
      <svg width={pixelLength} height={pixelLength} viewBox="0 0 80 80">
        <g id="logo" fill={fill}>
          <path id="logo-border" fillRule="nonzero" d="M0,0 L80,0 L80,80 L0,80 L0,0 Z M4.05063291,4.05063291 L4.05063291,75.9493671 L75.9493671,75.9493671 L75.9493671,4.05063291 L4.05063291,4.05063291 Z"></path>
          <polygon id="logo-k" points="57.5585938 65.9417318 53.1640625 65.9921875 33.4414062 38.8515625 26.5859375 44.8984375 26.5859375 65.9921875 23 65.9921875 23 15 26.5859375 15 26.5859375 41.3125 32.28125 35.6171875 52.4257813 15 56.9960938 15 35.9375 36.3203125"></polygon>
        </g>
      </svg>
    </LogoContainer>
  );
};

export default Logo;
