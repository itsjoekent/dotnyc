import React from 'react';
import styled from 'styled-components';
import Hero from './Hero';
import FlexBlock from './FlexBlock';
import Texture from './Texture';
import ButtonHint from './ButtonHint';

const ParrotButtonHint = styled.div`
  position: absolute;
  top: calc(2em + 32px);
  left: 1.5em;
`;

const GreetingPage = (props) => {
  return (
    <Texture>
      <ParrotButtonHint>
        <ButtonHint />
      </ParrotButtonHint>
      <FlexBlock alignCenter justifyCenter fillHeight>
        <Hero>What The Fuck</Hero>
      </FlexBlock>
    </Texture>
  );
};

export default GreetingPage;
