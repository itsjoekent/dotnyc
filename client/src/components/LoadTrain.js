import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadTrainContainer = styled.div`
  display: block;
  position: relative;
`;

const loadTrainAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadTrainAnimationContainer = styled.div`
  position: absolute;
  animation: ${loadTrainAnimation} 1s cubic-bezier(0.66, 0.11, 0.83, 1.48) infinite alternate;
`;

const TrainSegment = styled.span`
  display: inline;
  font-size: ${props => props.theme.fonts.sizes.normal};
`;

const LoadTrain = (props) => {
  return (
    <LoadTrainContainer>
      <LoadTrainAnimationContainer>
        <TrainSegment>🚂</TrainSegment>
        <TrainSegment>🚃</TrainSegment>
        <TrainSegment>🚃</TrainSegment>
        <TrainSegment>💥</TrainSegment>
      </LoadTrainAnimationContainer>
    </LoadTrainContainer>
  );
};

export default LoadTrain;
