import React from 'react';
import ContextualHeroTypography from './ContextualHeroTypography';
import Block from './Block';

const ContextualHeroTypeContainer = Block.extend`
  background-color: ${props => props.theme.context.complements[1]}
  padding: 0.5em 1em;
`;

const Hero = (props) => {
  const { children } = props;

  return (
    <ContextualHeroTypeContainer doubleMarginBottom>
      <ContextualHeroTypography land center>{children}</ContextualHeroTypography>
    </ContextualHeroTypeContainer>
  );
};

export default Hero;
